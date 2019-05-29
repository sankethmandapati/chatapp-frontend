import auth from './reducers/auth';
import chat from './reducers/chat';
import friends from './reducers/friends';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import Auth from '../auth';

export default () => {
    const reducer = combineReducers({
        auth,
        chat,
        friends
    });
    const middlewares = [thunk];
    middlewares.push(createLogger);
    const {isLoggedin, userDetails} = Auth.authenticate();
    console.log("userDetails: ", userDetails);
    const initialState = {
        auth: {
            isLoggedin,
            userDetails
        },
        chat: {
            messages: [],
            isLoading: false,
            erorrMessage: null
        },
        friends: {
            friendsList: [],
            selectedFriend: {},
            showFriendsListModal: true
        }
    };
    const store = createStore(reducer, initialState, applyMiddleware(...middlewares));
    return store;
};