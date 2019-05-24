import auth from './reducers/auth';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

export default () => {
    const reducer = combineReducers({
        auth
    });
    const middlewares = [thunk];
    middlewares.push(createLogger);
    const store = createStore(reducer, undefined, applyMiddleware(...middlewares));
    return store;
};