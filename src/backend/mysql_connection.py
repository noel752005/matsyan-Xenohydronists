import mysql.connector
from mysql.connector import Error

def create_connection():
    """Create and return a MySQL database connection."""
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='34019318',
            database='OceanWatch'
        )
        if connection.is_connected():
            print("Connected to MySQL database OceanWatch")
            return connection
    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
        return None
