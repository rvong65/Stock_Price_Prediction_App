import React, { Component} from 'react';
import ParticlesBg from 'particles-bg'
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Input from './components/Input/Input';
import LoadingInput from './components/Input/LoadingInput';
import Output from './components/Output/Output';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import axios from 'axios';


class App extends Component{
  constructor(){
    super(); 
    this.state = {
      dataSubmitted: false,
      stock_ticker: "",
      date: "",
      parsed_date: "",
      priceOutput: "", 
      saved_stock_ticker: "", 
      route: "signIn",
      isSignedIn: false,
      user: {
        username: ""
      }, 
      loadingInput: false
    }
    this.predictStockPrice = this.predictStockPrice.bind(this);
  }; 

  // Get stock ticker input
  onChangeStockTicker = (event) => {
    this.setState({stock_ticker: event.target.value})
  }

  //Get date input
  onChangeDate = (event) => {
    this.setState({date: event.target.value})
  }

  //Change route
  onChangeRoute = (route) =>{
    if(route === "signOut"){
      this.setState({isSignedIn: false, route: "signIn", priceOutput: ""});
    }else if(route === "home"){
      this.setState({isSignedIn: true , route: "home"});
    }else{
    this.setState({route: route})}
  }

  //Send inputs to model 
  predictStockPrice = async() =>{
    this.setState({parsed_date: "", 
    priceOutput: "", loadingInput: true
  })
    document.getElementsByClassName("textInput")[0].value="";
    document.getElementsByClassName("dateInput")[0].value="";
    let formData = new FormData();
    formData.append('stock_ticker', this.state.stock_ticker)
    formData.append('date', this.state.date)

    await axios.post("api/submit/", formData).then(response =>{
      console.log(response)
      let data = JSON.parse(response['data'])
      let parsed_date = new Date(this.state.date)
      parsed_date.setDate(parsed_date.getDate() +1);
      parsed_date = parsed_date.toLocaleString('en-US', {
        day: 'numeric', 
        year: 'numeric',
        month: 'long', 
    });
      console.log(parsed_date);
      this.setState({
        priceOutput: data,
        parsed_date: parsed_date,
        saved_stock_ticker: this.state.stock_ticker, 
        loadingInput: false
      })
    }).catch(error => console.log(error));
  }

  render(){
    return (
      <div className="App">
        <ParticlesBg color="#0a5c83" num={12} type="circle" bg={true} />
        <Navigation onChangeRoute = {this.onChangeRoute} isSignedIn={this.state.isSignedIn}/>
        {this.state.route === "home" ?<div>
        <Input predictStockPrice={this.predictStockPrice} onChangeStockTicker={this.onChangeStockTicker} onChangeDate={this.onChangeDate}/>
        {this.state.loadingInput === true &&
            <LoadingInput />
          }
          {this.state.priceOutput !== "" && 
          this.state.parsed_date !== "" &&
            <Output outputPrice={this.state.priceOutput} stockTicker={this.state.saved_stock_ticker} date={this.state.parsed_date}/>
          }
      </div>:(this.state.route === "signIn"? <SignIn getUser = {this.getUser} onChangeRoute = {this.onChangeRoute} /> : <SignUp getUser = {this.getUser} onChangeRoute = {this.onChangeRoute} />)}
      </div>
    );
}}

export default App;
