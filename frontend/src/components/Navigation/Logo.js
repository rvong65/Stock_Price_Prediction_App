import React from 'react';
import logo from './logo.png'

const Logo = () => {
    return(
        <div className="mt0 tl z-1">
            <div className="pa3">
                <img src={logo} alt= "" width="100" height="100"/>
            </div>
        </div>
    );
}

export default Logo