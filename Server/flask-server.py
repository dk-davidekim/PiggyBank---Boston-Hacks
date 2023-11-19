# Standard library imports
import os
import json
import threading

# Third-party imports
from flask import Flask, request, jsonify
import sqlalchemy
from google.cloud import pubsub_v1
from google.cloud.sql.connector import Connector
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Database Configuration
DB_CONNECTION_STRING = os.getenv('DB_CONNECTION_STRING')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_NAME = os.getenv('DB_NAME')

# Pub/Sub Configuration
PROJECT_ID = os.getenv('PROJECT_ID')
TOPIC_NAME = os.getenv('TOPIC_NAME')
SUBSCRIPTION_NAME = os.getenv('SUBSCRIPTION_NAME')


class PubSubManager:
    def __init__(self, project_id, topic_name, subscription_name):
        self.project_id = project_id
        self.topic_name = topic_name
        self.subscription_name = subscription_name
        self.publisher = pubsub_v1.PublisherClient()
        self.subscriber = pubsub_v1.SubscriberClient()

    def publish(self, chore_name):
        topic_path = self.publisher.topic_path(self.project_id, self.topic_name)
        message_json = json.dumps({'message': f'{chore_name} has been completed'})
        message_bytes = message_json.encode('utf-8')

        try:
            publish_future = self.publisher.publish(topic_path, data=message_bytes)
            publish_future.result()  # Verify the publish succeeded
            return 'Message published.'
        except Exception as e:
            return f'An error occurred: {e}'

    def subscribe(self, callback):
        subscription_path = self.subscriber.subscription_path(self.project_id, self.subscription_name)
        streaming_pull_future = self.subscriber.subscribe(subscription_path, callback=callback)
        print(f"Listening for messages on {subscription_path}...\n")

        try:
            streaming_pull_future.result()
        except KeyboardInterrupt:
            streaming_pull_future.cancel()


class DatabaseManager:
    def __init__(self, connection_string, db_user, db_password, db_name):
        self.connection_string = connection_string
        self.db_user = db_user
        self.db_password = db_password
        self.db_name = db_name
        self.connector = Connector()

    def get_engine(self):
        def getconn():
            return self.connector.connect(
                self.connection_string,
                "pymysql",
                user=self.db_user,
                password=self.db_password,
                db=self.db_name
            )
        return sqlalchemy.create_engine("mysql+pymysql://", creator=getconn)

def callback(message):
    print(f"Received message: {message.data.decode('utf-8')}")
    message.ack()

# Initialize PubSubManager and DatabaseManager
pubsub_manager = PubSubManager(PROJECT_ID, TOPIC_NAME, SUBSCRIPTION_NAME)
db_manager = DatabaseManager(DB_CONNECTION_STRING, DB_USER, DB_PASSWORD, DB_NAME)
pool = db_manager.get_engine()

# Flask Routes

@app.route('/start-parent-session', methods=['GET'])
def start_parent_session():
    def run_subscription():
        pubsub_manager.subscribe(callback)

    # Starting the subscription in a background thread
    thread = threading.Thread(target=run_subscription)
    thread.daemon = True  # This ensures the thread closes when the main process ends
    thread.start()
    return jsonify({'message': 'Parent session started and listening for messages'})

@app.route('/insert-item', methods=['POST'])
def insert_item():
    data = request.json
    with pool.connect() as conn:
        conn.execute(
            sqlalchemy.text('INSERT INTO SavingsGoal (item, price) VALUES (:item, :price)'), 
            {'item': data['item'], 'price': data['price']}
        )
    return jsonify({'message': 'Item added successfully'})

@app.route('/get-item', methods=['GET'])
def get_item():
    with pool.connect() as conn:
        result = conn.execute(
            sqlalchemy.text('SELECT item, price FROM SavingsGoal ORDER BY id DESC LIMIT 1')
        ).fetchone()
    return jsonify(dict(result))

@app.route('/insert-allowance', methods=['POST'])
def insert_allowance():
    data = request.json
    with pool.connect() as conn:
        conn.execute(
            sqlalchemy.text('INSERT INTO Allowance (amount) VALUES (:amount)'), 
            {'amount': data['amount']}
        )
    return jsonify({'message': 'Allowance added successfully'})

@app.route('/get-allowance', methods=['GET'])
def get_allowance():
    with pool.connect() as conn:
        result = conn.execute(
            sqlalchemy.text('SELECT amount FROM Allowance')
        ).fetchone()
    return jsonify({'allowance': result['amount'] if result else 0})

@app.route('/insert-chore', methods=['POST'])
def insert_chore():
    data = request.json
    with pool.connect() as conn:
        conn.execute(
            sqlalchemy.text('INSERT INTO Chore (name, compensation) VALUES (:name, :compensation)'), 
            {'name': data['name'], 'compensation': data['compensation']}
        )
    return jsonify({'message': 'Chore added successfully'})

@app.route('/get-chores', methods=['GET'])
def get_chores():
    with pool.connect() as conn:
        chores = conn.execute(
            sqlalchemy.text('SELECT name, compensation FROM Chore')
        ).fetchall()
    return jsonify([dict(row) for row in chores])

@app.route('/get-total-balance', methods=['GET'])
def get_total_balance():
    with pool.connect() as conn:
        total_compensation = conn.execute(
            sqlalchemy.text('SELECT SUM(compensation) FROM Chore WHERE status = TRUE')
        ).scalar() or 0
        allowance = conn.execute(
            sqlalchemy.text('SELECT amount FROM Allowance ORDER BY id DESC LIMIT 1')
        ).scalar() or 0
        total_balance = total_compensation + allowance
    return jsonify({'total_balance': total_balance})

if __name__ == '__main__':
    app.run(debug=True)
