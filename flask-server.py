from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import logging
from google.cloud.sql.connector import Connector
import sqlalchemy
from dotenv import load_dotenv
from sqlalchemy.exc import SQLAlchemyError

app = Flask(__name__)
CORS(app)

# Configure logging to write to a file
logging.basicConfig(level=logging.INFO, filename='app.log', filemode='a',
                    format='%(name)s - %(levelname)s - %(message)s')

load_dotenv()

# Retrieve environment variables
DB_CONNECTION_STRING = os.getenv('DB_CONNECTION_STRING')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_NAME = os.getenv('DB_NAME')

connector = Connector()

def getconn():
    conn = connector.connect(
        DB_CONNECTION_STRING,
        "pymysql",
        user=DB_USER,
        password=DB_PASSWORD,
        db=DB_NAME
    )
    return conn

pool = sqlalchemy.create_engine(
    "mysql+pymysql://",
    creator=getconn,
)

def execute_query(query, parameters=None):
    try:
        with pool.connect() as conn:
            return conn.execute(sqlalchemy.text(query), parameters or {})
    except SQLAlchemyError as e:
        logging.error(f"SQLAlchemy Error: {e}")
        return None, e

@app.route('/api/insert-item', methods=['POST'])
def insert_item():
    data = request.json
    logging.info(f"Inserting item: {data}")
    result, error = execute_query(
        'INSERT INTO SavingsGoal (item, price) VALUES (:item, :price)', 
        {'item': data['item'], 'price': data['price']}
    )
    if error:
        return jsonify({'error': str(error)}), 500
    return jsonify({'message': 'Item added successfully'}), 201

@app.route('/api/get-item', methods=['GET'])
def get_item():
    result, error = execute_query(
        'SELECT item, price FROM SavingsGoal ORDER BY id DESC LIMIT 1'
    )
    if error:
        return jsonify({'error': str(error)}), 500
    if result:
        logging.info("Item retrieved successfully")
        return jsonify(dict(result.fetchone())), 200
    logging.info("No item found")
    return jsonify({'error': 'No item found'}), 404

@app.route('/api/insert-allowance', methods=['POST'])
def insert_allowance():
    data = request.json
    logging.info(f"Inserting allowance: {data}")
    result, error = execute_query(
        'INSERT INTO Allowance (amount) VALUES (:amount)', 
        {'amount': data['amount']}
    )
    if error:
        return jsonify({'error': str(error)}), 500
    return jsonify({'message': 'Allowance added successfully'}), 201

@app.route('/api/get-allowance', methods=['GET'])
def get_allowance():
    result, error = execute_query(
        'SELECT amount FROM Allowance ORDER BY id DESC LIMIT 1'
    )
    if error:
        return jsonify({'error': str(error)}), 500
    if result:
        result = result.fetchone()
        logging.info("Allowance retrieved successfully")
        return jsonify({'allowance': result[0] if result else 0}), 200
    logging.info("No allowance found")
    return jsonify({'error': 'No allowance found'}), 404

@app.route('/api/insert-chore', methods=['POST'])
def insert_chore():
    data = request.json
    logging.info(f"Inserting chore: {data}")
    result, error = execute_query(
        'INSERT INTO Chore (name, compensation) VALUES (:name, :compensation)', 
        {'name': data['name'], 'compensation': data['compensation']}
    )
    if error:
        return jsonify({'error': str(error)}), 500
    return jsonify({'message': 'Chore added successfully'}), 201

@app.route('/api/get-chores', methods=['GET'])
def get_chores():
    result, error = execute_query(
        'SELECT name, compensation, status FROM Chore'
    )
    if error:
        return jsonify({'error': str(error)}), 500
    chores = [{'name': row[0], 'compensation': row[1], 'status': row[2]} for row in result]
    logging.info("Chores retrieved successfully")
    return jsonify(chores), 200

@app.route('/api/get-total-balance', methods=['GET'])
def get_total_balance():
    total_compensation_result, compensation_error = execute_query(
        'SELECT SUM(compensation) FROM Chore WHERE status = TRUE'
    )
    allowance_result, allowance_error = execute_query(
        'SELECT amount FROM Allowance ORDER BY id ASC LIMIT 1'
    )
    if compensation_error or allowance_error:
        return jsonify({'error': str(compensation_error or allowance_error)}), 500
    total_balance = (total_compensation_result.scalar() or 0) + (allowance_result.scalar() or 0)
    logging.info("Total balance calculated successfully")
    return jsonify({'total_balance': total_balance}), 200

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
