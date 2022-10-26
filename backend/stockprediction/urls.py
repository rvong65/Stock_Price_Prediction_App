from django.urls import path
from .views import SendTextInputView, SignUpView, LoginView

urlpatterns = [
    path('submit/', SendTextInputView.as_view()), 
    path('signUp/', SignUpView.as_view()), 
    path('signIn/', LoginView.as_view())

]