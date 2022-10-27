# 📈 Stock Price Prediction App
This is a machine-learning based web application built using Django, React, and TensorFlow. To use the app, the user first starts with signing up for an account by creating a username and a password. The user will then be logged into the main interface where they will need to input a stock ticker and a date in the future. A text box will then appear that will display a predicted price for that date. 

## Demonstration
https://user-images.githubusercontent.com/87782709/198345046-59d4e0e8-c350-4180-b7e5-ca788ab365bc.mp4

## Login Page
![image](https://user-images.githubusercontent.com/87782709/198062961-8ffb60a1-339e-41fa-b96b-f4232b5e9fec.png)

## Main Interface Page
![image](https://user-images.githubusercontent.com/87782709/198063395-13a1a928-a274-457a-99df-b429d90f908b.png)

## Setup
### Backend
1. `pip install -r requirements.txt`
2. `python manage.py makemigrations`
3. `python manage.py migrate`
4. `python manage.py runserver`
### Frontend
1. `npm update`
2. `npm start` or `npm run dev`
