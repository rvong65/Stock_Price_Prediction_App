import React from 'react';

const Output = ({outputPrice, stockTicker, date}) => {
    return(
        <div className=" outputBox center bg-white ma3 pa4 br3 w-50 f4 shadow-3">
            <p>The predicted price of {stockTicker} on {date} is ${outputPrice}</p>
        </div>
    );
}

export default Output;