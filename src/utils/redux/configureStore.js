import auth from './reducers/auth';
import chat from './reducers/chat';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import Auth from '../auth';

export default () => {
    const reducer = combineReducers({
        auth,
        chat
    });
    const middlewares = [thunk];
    middlewares.push(createLogger);
    const isLoggedin = Auth.authenticate();
    const initialState = {
        auth: {
            isLoggedin,
            userDetails: {}
        },
        chat: {
            messages: [],
            isLoading: false,
            erorrMessage: null
        }
    };
    const store = createStore(reducer, initialState, applyMiddleware(...middlewares));
    return store;
};