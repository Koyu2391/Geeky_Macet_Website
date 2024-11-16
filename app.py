from flask import Flask, request, jsonify
from flask_cors import CORS
import qrcode
import os
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request, redirect, url_for, flash, session
import secrets


app = Flask(__name__)
CORS(app) 

app.secret_key = secrets.token_hex(16)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///geekymacet.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    roll = db.Column(db.String(20), nullable=False)
    year = db.Column(db.String(4), nullable=False)
    branch = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    verified = db.Column(db.Boolean, default=False)

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/admin.html')
def admin():
    return render_template('admin.html') 

@app.route('/index.html')
def home1() :
    return render_template("/index.html")

@app.route('/verify.html')
def verify():
    return render_template('verify.html')

@app.route('/contact.html')
def contact():
    return render_template('contact.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    data = request.json
    try:
        # Create a new user
        new_user = User(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            roll=data['roll'],
            year=data['year'],
            branch=data['branch'],
            password=data['password']  # Hash this password in production
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/verify_user', methods=['POST'])
def verify_user(): 
    user_roll = request.form.get('user_roll')
    user = User.query.filter_by(roll=user_roll).first()
    
    if user:
        return f"User with Roll '{user_roll}' exists in the database."
    else:
        return f"User with Roll '{user_roll}' does not exist in the database."

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    # Find the user by email
    user = User.query.filter_by(email=email).first()
    
    if user:
        # Check if the password matches (plain text comparison)
        if user.password == password:
            return jsonify({"success": True, "message": "Login successful!"})
        else:
            return jsonify({"success": False, "message": "Invalid password!"})
    else:
        return jsonify({"success": False, "message": "User not found!"})



@app.route('/dashboard')
def dashboard():
    return render_template('admin_dash.html')

if __name__ == '__main__':
    app.run(debug=True)
