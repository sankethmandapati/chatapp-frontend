import React from 'react';
import { Link } from "react-router-dom";
import LoginRegister from './LoginRegister';
import '../../styles/Login.scss';

const Login = ({callApi}) => {
	return (
		<LoginRegister>
			<form onSubmit={callApi} autoComplete="on">
				<div className="login__register--leftconversation">
					<input type="email" name="email" placeholder="Login id"/>
					<input type="password" name="password" placeholder="Password"/>
				</div>
				<button type="submit">LOGIN</button>
				<span className="login__register--leftconversation">Not registered? <Link to="/register">Create an account</Link></span>
			</form>
		</LoginRegister>
	);
}

export default Login;