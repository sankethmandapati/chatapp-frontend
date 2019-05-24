import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class AuthContainer extends Component {
    constructor(props) {
        super(props);
        this.callApi = this.callApi.bind(this);
    }
    callApi(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        this.props.callApi(email, password, name);
    }
    render() {
        const { ChildComponent, isLoggedIn } = this.props;
        if(isLoggedIn) {
            return (
                <Redirect to="/" /> 
            );
        } else {
            return (
                <ChildComponent callApi={this.callApi} />
            );
        }
    }
}

export default AuthContainer;