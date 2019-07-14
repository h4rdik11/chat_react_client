export const initialState ={
    usersOnline: [],
    messages:[]
};

export default function(state = initialState, action){
    switch(action.type){
        case "GET_USERS_ONLINE":
            return {
                ...state,
                ...action.payload
            };
        case "GET_ALL_MESSAGES":
            return {
                ...state,
                ...action.payload
            };
        case "SEND_MESSAGE":
            const newState = Object.assign([], state.messages);
            newState.push(action.payload);
            return {...state, messages: newState};
        default:
            return state;
    }
}