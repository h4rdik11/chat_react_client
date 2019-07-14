export const initialState = {
	userDetails:{
		email:'',
		password:''
	},
	isLoggedIn: false
};

export default function(state = initialState, action){
	switch(action.type){
		case "LOGIN":
			return {
				...state,
				...action.payload
			};
		case "ON_CHANGE":
			const newState = Object.assign({}, state);
			newState.userDetails[action.payload.field] = action.payload.value;
			return {
				...state,
				...newState
			};
		case "SET_LOGIN_DETAILS":
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
}