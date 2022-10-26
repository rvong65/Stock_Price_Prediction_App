import React from 'react';

const SignInError = () => {
    return(
        <div>
            <article className="br3 ba b--black-10 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{backgroundColor: "red"}}>
                <p style={{color: "white", fontWeight: "bold"}}>Please try again. The email or password you entered is incorrect</p>
            </article>
        </div>
    );
}

export default SignInError