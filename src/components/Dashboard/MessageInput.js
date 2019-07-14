import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sendMessage, getSentimentScore} from '../../actions/DashboardActions';

class MessageInput extends Component{

    constructor(props){
        super(props);
        this.state = {
            message:''
        }
        this.sendMessage = this.sendMessage.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.sendIfEnter = this.sendIfEnter.bind(this);
    }

    setMessage(e){
        e.preventDefault();
        const message = e.target.value;
        if(message.length > 0){
            this.props.getSentimentScore(message);
        }
        this.setState({message});
    }

    sendIfEnter(e){
        let self = this;
        if(e.which === 13 && e.target.value !== ""){
            self.sendMessage(e);
        }
    }

    sendMessage(e){
        e.preventDefault();
        const message = this.state.message;
        if(message.length > 0){
            this.props.sendMessage(message,this.props.userDetails);
        }
        document.getElementById("message").value = "";
    }

    render(){
        return (
            <div className="type_msg">
                <div className="input_msg_write">
                    <input type="text" onChange={this.setMessage} onKeyUp={this.sendIfEnter} id="message" className="write_msg" placeholder="Type a message" />
                    <button className="msg_send_btn" type="button" onClick={this.sendMessage}><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userDetails: state.loginDetails.userDetails
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (message, userDetails) =>  dispatch(sendMessage(message, userDetails)),
        getSentimentScore: (message) => dispatch(getSentimentScore(message))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);