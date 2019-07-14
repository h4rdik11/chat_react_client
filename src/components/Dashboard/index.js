import React, { Component } from 'react';
import  { connect } from 'react-redux';
import '../../styles/dashboard_styles.css';
import SideNav from './SideNav';
import MessageArea from './MessageArea';

class Dashboard extends Component{

    render(){
        return(
            <React.Fragment>
                <div>
                    <div className="messaging">
                    <div className="inbox_msg">
                        <SideNav />
                        <MessageArea />
                    </div>                    
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        userMessages: state.dashboardData.messages
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);