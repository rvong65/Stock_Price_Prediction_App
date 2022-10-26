import React from 'react';
import Logo from './Logo';
const Navigation = ({onChangeRoute, isSignedIn}) => {
    return(
        <div>
            <nav style={{display: 'inline'}}>
                <Logo style={{position: "absolute", left: 0, top: 0}}/>
                <h1 style={{position: "absolute", left: 105, top: 25, fontWeight:"bold", color:"white"}}>Stock Price Prediction</h1>
                {isSignedIn === true &&
                <p style = {{position: "absolute", right: 10, top: 10, fontWeight:"bold"}} className = 'f4 link black pa3 pointer white no-underline underline-hover' onClick={ () => onChangeRoute("signOut")}>Sign Out</p>}
            </nav>
        </div>
    );
}

export default Navigation;