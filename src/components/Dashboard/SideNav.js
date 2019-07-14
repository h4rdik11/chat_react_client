import React, {Component} from 'react';
import { connect } from 'react-redux';
import {User} from './User';
import {getUsersOnline} from '../../actions/DashboardActions';
import socketIOClient from 'socket.io-client';
import {SERVER_URL, EMOJI} from '../../helpers/constants';
import {Icon} from 'react-icons-kit';

const socket = socketIOClient(SERVER_URL);

class SideNav extends Component{

    componentDidMount() {
        this.props.getUsersOnline();
        socket.on("update_online_users", () => {
            this.props.getUsersOnline();
        });
    }

    render(){
        return(
            <div className="inbox_people">
                <div className="headind_srch">
                    <div className="recent_heading">
                        <h6>Welcome, {this.props.userDetails.name} !</h6>
                        <h6>Mood : <span style={{color: EMOJI[this.props.sentiments].color}}><Icon size={32} icon={EMOJI[this.props.sentiments].icon} /></span></h6>
                        <h4>Users Online</h4>
                    </div>
                </div>
                <div className="inbox_chat">
                    {
                        this.props.usersOnline.map((user,i) => {
                            return (
                                <User {...user} key={"user"+i} />
                            );
                        })
                    }
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        usersOnline: state.dashboardData.usersOnline,
        userDetails: state.loginDetails.userDetails,
        sentiments: state.dashboardData.sentiments
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUsersOnline: () => dispatch(getUsersOnline())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);