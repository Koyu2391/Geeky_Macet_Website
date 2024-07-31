from flask import Flask, request, jsonify
from flask_cors import CORS
import qrcode
import os
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///geekymacet.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    roll = db.Column(db.String(20))
    branch = db.Column(db.String(50))
    year = db.Column(db.String(10))
    verified = db.Column(db.Boolean, default=False)
    


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/verify.html')
def verify():
    return render_template('verify.html')

@app.route('/contact.html')
def contact():
    return render_template('contact.html')

@app.route('/register.html')
def register_html():
    return render_template("/register.html")
    
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':

        print("Form data:", request.form)
        # Extract form data
        name = request.form.get('user_name')
        email = request.form.get('user_mail')
        phone = request.form.get('user_number', '')
        roll = request.form.get('user_roll', '')
        branch = request.form.get('user_branch', '')
        year = request.form.get('user_year', '')

        # Validate the data (simple example)
        if not name or not email:
            return "Name and email are required", 400
        
        # Create a new User instance
        new_user = User(
            name=name,
            email=email,
            phone=phone,
            roll=roll,
            branch=branch,
            year=year,
        )

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Error occurred: {e}")
        return "An error occurred while registering the user", 500
    
    print(f"Creating user with: Name={name}, Email={email}, Phone={phone}, Roll={roll}, Branch={branch}, Year={year}")


    return render_template('form_submission=True.html')


if __name__ == '__main__':
    app.run(debug=True)
