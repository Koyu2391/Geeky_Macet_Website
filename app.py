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
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    roll = db.Column(db.String(20))
    branch = db.Column(db.String(50))
    year = db.Column(db.String(10))
    verified = db.Column(db.Boolean, default=False)
    

admin_credentials = {
    'admin_username': 'admin',
    'admin_password': 'admin'
}
    


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/admin.html')
def admin():
    return render_template('admin.html') 

@app.route('/admin_login', methods = ['GET', 'POST'])
def login_activity(): 
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # Check if the entered credentials match the stored credentials
        if username == admin_credentials['admin_username'] and password == admin_credentials['admin_password']:
            session['admin'] = True
            flash('Login successful!', 'success')
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Invalid username or password', 'danger')
            return redirect(url_for('admin_login'))
    
    return render_template('admin_login.html')


@app.route('/admin_dash')
def admin_dashboard():
    if 'admin' in session:
        return render_template('admin_dash.html')
    else:
        flash('Please log in to access the admin dashboard.', 'warning')
        return redirect(url_for('admin.html'))

@app.route('/admin_logout')
def admin_logout():
    session.pop('admin', None)
    flash('You have been logged out.', 'success')
    return redirect(url_for('admin'))


@app.route('/index.html')
def home1() :
    return render_template("/index.html")

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

@app.route('/verify_user', methods=['POST'])
def verify_user(): 
    # Get the form data
    user_roll = request.form.get('user_roll')
    
    # Check if user exists in the database using roll
    user = User.query.filter_by(roll=user_roll).first()
    
    if user:
        # If user exists
        return f"User with Roll '{user_roll}' exists in the database."
    else:
        # If user does not exist
        return f"User with Roll '{user_roll}' does not exist in the database."


if __name__ == '__main__':
    app.run(debug=True)
