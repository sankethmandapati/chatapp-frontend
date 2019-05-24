import auth from './reducers/auth';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import Auth from '../auth';

export default () => {
    const reducer = combineReducers({
        auth
    });
    const middlewares = [thunk];
    middlewares.push(createLogger);
    const isLoggedin = Auth.authenticate();
    const initialState = {
        auth: {
            isLoggedin,
            userDetails: {}
        }
    };
    const store = createStore(reducer, initialState, applyMiddleware(...middlewares));
    return store;
};