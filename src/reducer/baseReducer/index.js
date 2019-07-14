import loginReducer, { initialState as loginState } from '../LoginReducer';
import dashboardReducer, {initialState as dashboardState} from '../DashboardReducer';

export const initialState = {
	loginDetails: loginState,
	dashboardData: dashboardState
};

export default function(state = initialState, action){
	return {
		loginDetails: loginReducer(state.loginDetails, action),
		dashboardData: dashboardReducer(state.dashboardData, action)
	};
}