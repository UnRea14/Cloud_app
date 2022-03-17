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

@app.route('/register', methods = ['POST'])
def register():
    user_name = request.json["user_name"]
    user_email = request.json["user_email"]
    user_password = request.json["user_password"]# later need to encrypt the password
    db_cursor = mysql.connection.cursor()
    check = db_cursor.execute("SELECT * FROM users WHERE email = %s", [user_email])
    if check:
        return "User email already exists in system"
    sql_command = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
    values = (user_name, user_email, user_password)
    db_cursor.execute(sql_command, values)
    mysql.connection.commit()
    return "User inserted"

if __name__ == "__main__":
    app.run(host="localhost", port=8080)