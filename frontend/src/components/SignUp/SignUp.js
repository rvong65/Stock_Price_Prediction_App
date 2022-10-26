import React, {Component} from 'react';
import SignUpError from './SignUpError';
import axios from 'axios';
import "../SignIn/SignIn.css"

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            SignUpError: false
        }
    }
    onUsernameChange = (event) => {
        this.setState({username: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSignInSubmit = async(event) => {
        this.setState({SignUPError: false});
        let formData = new FormData();
        console.log(this.state.username);
        formData.append('username', "");
        formData.append('password', "");
        formData.set('username', this.state.username);
        formData.set('password', this.state.password);
        document.getElementsByClassName("inputField")[0].value="";
        document.getElementsByClassName("inputField")[1].value="";
        await axios.post("/api/signUp/", formData)
            .then(response => {
                console.log(response)
              if(response['data'] === "Success"){
                this.props.onChangeRoute("home");
              }
              else{
                this.setState({SignUpError: true});
              }
          }).catch(error => console.log(error))
      }
    render() {
    return(
        <div>
            <article className="br3 ba b--black-10 mt5 mb1 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{backgroundColor: "whitesmoke"}}>
            <main className="pa4 black-80">
            <div className="measure center">
                <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Sign Up</legend>
                <div className="mt3">
                    <div className="inputBox" >
                        <ion-icon size="large" name="person"></ion-icon>
                        <input placeholder="Username" className="inputField b pa2 input-reset bg-transparent w-100" type="text" name="username"  id="username" onChange={this.onUsernameChange}/>
                    </div>
                </div>
                <div class="mv3">
                    <div className="inputBox" >
                        <ion-icon size="large" name="lock-closed"></ion-icon>
                        <input placeholder= "Password" className="inputField b pa2 input-reset bg-transparent w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
                    </div>
                </div>
                </fieldset>
                <div class="">
                <input class="loginButton b ph3 pv2 input-reset ba grow pointer f6 dib w-100 br-pill" type="submit" value="CREATE AN ACCOUNT" onClick={this.onSignInSubmit}/>
                <div class="lh-copy mt3">
                <span className='f6' style={{color: "gray"}}>
                    Already have an account?
                </span>
                <a href="#0" class="f6 link black db grow center w-20" onClick={() => this.props.onChangeRoute("signIn")}>LOGIN</a>
                </div>
                </div>
                </div>
                </main>
                </article>
            {this.state.SignUpError === true &&
                <SignUpError/>
            }

        </div>
    );
}}

export default SignUp;