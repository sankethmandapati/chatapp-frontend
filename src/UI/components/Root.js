import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from '../containers/Login';
import '../../styles/App.scss';
import Register from '../containers/Register';
import Home from '../containers/Home';
import {Provider} from 'react-redux';

const PrivateRoute = ({ component: Component, getState, ...rest }) => (
  <Route {...rest} render={(props) => (
    getState().auth.isLoggedin
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

const Root = ({store}) => {
    return (
        <Provider store={store}>
            <div className="App">
                <Router>
                    <div>
                        <PrivateRoute exact path="/" getState={store.getState} component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </div>
                </Router>
            </div>
        </Provider>
    );
}

export default Root;
