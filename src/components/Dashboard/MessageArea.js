import React, {Component} from 'react';
import {connect} from 'react-redux';
import MessageInput from './MessageInput';
import MessageContainer from './MessageContainer';

class MessageArea extends Component{

    render(){
        return(
            <div className="mesgs">
                <MessageContainer/>
                <MessageInput/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {};
}
const mapDIspatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps,mapDIspatchToProps)(MessageArea);