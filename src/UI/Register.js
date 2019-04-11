import React, {Component} from 'react';
import { Redirect, Link } from "react-router-dom";
import Auth from '../utils/auth';
// import './css/login.scss';

export default class Register extends Component {
	constructor(props) {
		super(props);
		const loggedIn = Auth.authenticate();
		this.state = {
			name: "",
			email: "",
			password: "",
			reEnterPassword: "",
			rememberMe: false,
			loggedIn
		};
		this.register = this.register.bind(this);
	}

	async register(e) {
		e.preventDefault();
		try {
			const reqData = {
				name: this.state.name,
				password: this.state.password,
				email: this.state.email
			};
			await Auth.register(reqData);
			this.setState({loggedIn: true});
		} catch(err) {
			console.log("Error in logging in: ", err);
			alert(err.message);
		}
	}

	render() {
		if(this.state.loggedIn) {
			return <Redirect to='/' />
		} else {
			return (
                <div className="login-register">
					<form onSubmit={this.register} autocomplete="on" >
						<input type="text" onChange={(e) => this.setState({name: e.target.value})} placeholder="Full Name" name="name" />
						<input type="email" onChange={(e) => this.setState({email: e.target.value})} placeholder="Login ID" name="email" />
						{/* <input type="password" onChange={(e) => this.setState({password: e.target.value})} placeholder="password"/> */}
						<input type="password" onChange={(e) => this.setState({password: e.target.value})} placeholder="Password" name="password" />
						<button type="submit">REGISTER</button>
						<span>Already registered? <Link to="login">Login</Link></span>
					</form>
				</div>
			);
		}
	}
}