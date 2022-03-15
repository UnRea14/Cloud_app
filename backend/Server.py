from flask_mysqldb import MySQL
from flask import Flask, jsonify, request

app = Flask(__name__)
 
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Shaniliam1404'
app.config['MYSQL_DB'] = 'app_database'
 
mysql = MySQL(app)
with app.app_context():
    db_cursor = mysql.connection.cursor()

def insert_user(user_name, user_email, user_password, db_cursor, mysql):
    db_cursor.execute("SELECT * FROM users")
    users_info = db_cursor.db_cursor.fetchall()
    for user in users_info:
        if user_email in user:
            message = "Email already exists in system"
            print(message)
            break
    sql_command = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
    values = (user_name, user_email, user_password)
    db_cursor.db_cursor.execute(sql_command, values)
    mysql.connection.commit()

@app.route('/register', methods = ['POST'])
def register():
    user_name = request.json["user_name"]
    user_email = request.json["user_email"]
    user_password = request.json["user_password"]# later need to encrypt the password
    print(user_name)
    insert_user(user_name, user_email, user_password, db_cursor, mysql)
    return jsonify({"User":"inserted"})

if __name__ == "__main__":
    app.run(host="192.168.56.1", port=3000)