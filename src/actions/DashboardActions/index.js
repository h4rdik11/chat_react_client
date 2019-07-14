import axios from 'axios';
import socketIOClient from 'socket.io-client';
import {SERVER_URL} from '../../helpers/constants'; 

const socket = socketIOClient(SERVER_URL);

export const getUsersOnline = () => {
    let usersOnline = [];
    return dispatch => {
        const promise = getAllUsersFromAPI();
        promise.then((res) => {
            usersOnline = res.data;
            dispatch(getUsers(usersOnline));
        }).catch(err => {
            console.log(err);
        });
    }
}

const getUsers = data => {
    return {
        type: "GET_USERS_ONLINE",
        payload:{
            usersOnline: data
        }
    };
}

export const getAllMessages = () => {
    return dispatch => {
        const promise = getMessageFromAPI();
        promise.then((res) => {
            dispatch({
                type: "GET_ALL_MESSAGES",
                payload:{
                    messages: res.data
                }
            });
        });
    }
}

export const sendMessage = (message, userDetails) => {
    return dispatch => {
        const data = {
            sender_id: userDetails._id,
            sender: userDetails.name,
            timestamp: Date.now(),
            message: message
        };
        socket.emit("send_message", data);
        const promise = sendMessageToAPI(data);
        promise.then((res) => {
            dispatch({
                type: "SEND_MESSAGE",
                payload: data    
            });
        });
    };
}

export const goOffline = (id) => {
     console.log("ACTION : ", id);
}

const getMessageFromAPI = async () => {
    return await axios.get(SERVER_URL+"message/");
}

const sendMessageToAPI = async (data) => {
    return await axios.post(SERVER_URL+"message/send",data);
}

const getAllUsersFromAPI = async () => {
    return await axios.get(SERVER_URL+'online_user');
}