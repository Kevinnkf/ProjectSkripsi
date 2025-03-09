import psycopg2

conn = psycopg2.connect(
host= 'localhost',
dbname= 'postgres',
user= 'postgres',
password= 'donadoni'
)

cursor = conn.cursor()

cursor.execute("SELECT * FROM baseknowledge")
records = cursor.fetchall()