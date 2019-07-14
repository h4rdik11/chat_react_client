import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllMessages} from '../../actions/DashboardActions';
import {Message} from './Message';
import socketIOClient from 'socket.io-client';
import {SERVER_URL} from '../../helpers/constants';
const socket = socketIOClient(SERVER_URL);

class MessageContainer extends Component{

    constructor(props){
        super(props);
        this.getDateTime = this.getDateTime.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    componentDidMount(){
        this.props.getAllMessages();
        this.scrollToBottom();
        socket.on("receive_message", (data) => {
            this.props.getAllMessages();
            this.scrollToBottom();
        });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.messages.length !== this.props.messages.length){
            this.scrollToBottom();
        }
    }

    getDateTime(message, parsedDate){
        return (
            <React.Fragment>
                <p>{message}</p>
                <span className="time_date">{parsedDate.getHours()+":"+parsedDate.getMinutes()} | {parsedDate.getUTCDate()+"/"+(parsedDate.getUTCMonth()+1)+"/"+parsedDate.getUTCFullYear()}</span>
            </React.Fragment>
        );
    }

    scrollToBottom(){
        let msgContainer = document.querySelector("#msg_history");
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    render(){
        return (
            <div className="msg_history" id="msg_history">
                {
                    this.props.messages.map((message, i) => {
                        const parsedDate = new Date(message.timestamp);
                        return (
                            <Message key={"message"+i} {...{
                                    message:message,
                                    userDetails:this.props.userDetails, 
                                    parsedDate:parsedDate, 
                                    getDateTime:this.getDateTime
                                }} />
                        )
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.dashboardData.messages,
        userDetails: state.loginDetails.userDetails
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMessages: () => dispatch(getAllMessages())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);