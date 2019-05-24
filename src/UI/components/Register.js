import React from 'react';
import { Link } from "react-router-dom";
import LoginRegister from './LoginRegister';
import '../../styles/Login.scss';

const Register = ({callApi}) => {
	return (
		<LoginRegister>
			<form onSubmit={callApi} autoComplete="on" >
				<div className="login__register--leftconversation">
					<input type="text" name="name" placeholder="Full Name" />
					<input type="email" email="email" placeholder="Login ID" />
					<input type="password" password="password" placeholder="Password" />
				</div>
				<button type="submit" >REGISTER</button>
				<span className="login__register--leftconversation">Already registered? <Link to="login">Login</Link></span>
			</form>
		</LoginRegister>
	);
}

export default Register;