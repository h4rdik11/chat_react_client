import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import baseReducer  from '../reducer/baseReducer';

const createMainStore = () => {
	const store = createStore(baseReducer, applyMiddleware(thunk));
	return store;
}

export default createMainStore;