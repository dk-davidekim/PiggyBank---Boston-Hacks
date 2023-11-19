from flask import Flask, request, jsonify
import os
from google.cloud.sql.connector import Connector
import sqlalchemy
from dotenv import load_dotenv

app = Flask(__name__)

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
            sqlalchemy.text('SELECT amount FROM Allowance ORDER BY id DESC LIMIT 1')
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
