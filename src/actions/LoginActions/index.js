import axios from 'axios';
import {SERVER_URL} from '../../helpers/constants';
import socketIOClient from 'socket.io-client';
const socket = socketIOClient(SERVER_URL);

export const doLogin = function(data) {
	return dispatch => {
		const loginData = checkLogin(data);
		loginData.then(response => {
			if(response.data){
				const data = {
					isLoggedIn: true,
					userDetails: response.data
				};				
				emitConnection(response.data);
				localStorage.setItem("loginDetails", JSON.stringify(data));
				dispatch({
					type: "LOGIN",
					payload:{...data}
				});
			}
		});
	}
}

export const onTextChange = function(data){
	return {type:"ON_CHANGE", payload:data};
}

export const getLoginDetails = function(){
	return dispatch => {
		const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
		if(loginDetails){
			emitConnection(loginDetails.userDetails);
			dispatch({
				type: "SET_LOGIN_DETAILS",
				payload: loginDetails
			});
		}
	};
}

const emitConnection = data =>{
	const emitData = {
		sender_id:data._id,
		name: data.name,
		email: data.email
	};
	socket.emit("user_connected", emitData);
} 

const checkLogin = async (data) => {
	return await axios.post(SERVER_URL+"user/login", data);
}