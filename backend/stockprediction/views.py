from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime as dt
from datetime import timedelta as td
from sklearn.preprocessing import MinMaxScaler
import numpy as np
import pandas_datareader as web
from keras.models import Sequential
from keras.layers import Dense, LSTM
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError

# Send the model's response
class SendTextInputView(APIView):
    def post(self, request, format="json"): 
        try:
            #Get the data
            stock_input = ' '.join(map(str, dict(request.data)['stock_ticker']))
            daysInTheFuture = ' '.join(map(str,dict(request.data)['date']))
            train_start_date = dt.now() - td(days = 730)
            train_end_date = dt.now() - td(days = 183)
            train_data = web.DataReader(stock_input, 'yahoo', train_start_date, train_end_date)

            #Prepare the data
            scaler=MinMaxScaler(feature_range=(0,1))
            scaled_train_data=scaler.fit_transform(train_data['Close'].values.reshape(-1,1))
            X_train=[]
            y_train=[]
            for x in range(50, len(scaled_train_data)):
                X_train.append(scaled_train_data[x-50:x, 0])
                y_train.append(scaled_train_data[x, 0])
            X_train, y_train = np.expand_dims(np.array(X_train), axis=-1), np.array(y_train)

            #Build the model
            model = Sequential()
            model.add(LSTM(units=25, return_sequences=True, input_shape=(X_train.shape[1], 1)))
            model.add(LSTM(units=25, return_sequences=True))
            model.add(LSTM(units=25))
            model.add(Dense(units=1)) 

            #Train the model
            model.compile(optimizer='adam', loss='mean_squared_error')
            model.fit(X_train, y_train, epochs=10, batch_size=64)
            
            #Test the model
            test_start_date = dt.now() - td(days = 183)
            test_end_date = dt.now()
            test_data = web.DataReader(stock_input, 'yahoo', test_start_date, test_end_date)
            X_test = scaler.transform(test_data['Close'].values.reshape(-1,1))
            outputs = []
            for _ in range(abs(dt.strptime(daysInTheFuture, "%Y-%m-%d") - test_end_date).days):
                dataLast50Days = np.expand_dims(X_test[len(X_test)-50:] , axis=0)
                prediction = model.predict(dataLast50Days)
                X_test = np.delete(dataLast50Days, 0)
                X_test = np.append(X_test, prediction).reshape(50, 1)
                outputs.append(prediction)
            predicted_price = round(scaler.inverse_transform(outputs[-1])[0][0])
            return Response(predicted_price)
        except: 
            return Response("Failed")
        
#Enable the user to create an account
class SignUpView(APIView):
    def post(self, request, format="json"):
        request_data = dict(request.data)
        username_li = request_data["username"]
        username = ' '.join(map(str, username_li))
        password_li = request_data["password"]
        password = ' '.join(map(str, password_li))
        try:
            user = User.objects.create_user(username, password=password)
            if user is not None:
                return Response("Success")
            else:
                return Response("Failed")
        except IntegrityError:
            return Response("Duplicate")
        
#Enable the user to log in
class LoginView(APIView):
    def post(self, request, format="json"):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            return Response("Success")
        else:
            return Response("Failed")
