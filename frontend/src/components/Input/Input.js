import "./Input.css";
import React, {Component} from 'react';



class Input extends Component{
    constructor(props){
        super(props);
        this.state={
            pop_up: true
        }
    }
    onClickButton = () => {
        this.setState({pop_up: false})
    }
    render(){
    return(
        <div> 
            <div className="br3 ba b--black-10 mt0 w-100 w-50-m w-50-l mw6 shadow-5 center pa4" style={{backgroundColor: "whitesmoke"}}>
                {this.state.pop_up === true &&
                <div className="flex items-center br3 ba b--black-10 mt0 w-100 w-50-m mw6 shadow-5 center pa2" style={{backgroundColor: "#FFEF4A"}}>
                    <ion-icon name="warning"></ion-icon>
                    <p><b>Disclaimer: </b>This is not financial advice and should be proceeded with caution</p>
                    <ion-icon name="close-circle"  size="small" onClick={this.onClickButton}></ion-icon>
                </div>}
                
                <fieldset className='center ba b--transparent ph1'>
                    <div className = 'mt3'> 
                        <label className="db fw6 lh-copy f6 w-100 tl" >Stock Ticker</label>
                        <input className='textInput f5 pa2 w-100 center' placeholder= 'Type in the stock ticker (Ex. TSLA)' type='text' onChange={this.props.onChangeStockTicker} />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6 w-100 tl">Date</label>
                        <input className='dateInput f5 pa2 w-100 center' type='date' onChange={this.props.onChangeDate} />
                    </div>
                    </fieldset>
                <div className="">
                <input className="submitButton b ph3 pv2 input-reset ba grow pointer f6 dib w-100 br-pill" type="submit" value="Submit" onClick={this.props.predictStockPrice}/>
            </div>
            </div>
        </div>
    );
}
}
export default Input;

