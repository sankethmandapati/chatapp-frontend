import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Auth from '../utils/auth';
import Login from './containers/Login';
import '../styles/App.scss';
import Register from './containers/Register';
import Home from './Home';
import {Provider} from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.authenticate() === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

class Root extends Component {
    render() {
        const {store} = this.props;
        return (
            <Provider store={store}>
                <div className="App">
                    <Router>
                        <div>
                            <PrivateRoute exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                        </div>
                    </Router>
                </div>
            </Provider>
        );
    }
}

export default Root;
