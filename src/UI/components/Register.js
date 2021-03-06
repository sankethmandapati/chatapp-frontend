import React from 'react';
import { Link } from "react-router-dom";
import LoginRegister from './LoginRegister';
import '../../styles/Login.scss';

const Register = ({ register }) => {
	return (
		<LoginRegister>
			<form onSubmit={register} autoComplete="on" >
				<div className="login__register--leftconversation">
					<input type="text" name="name" placeholder="Full Name" />
					<input type="email" name="email" placeholder="Login ID" />
					<input type="password" name="password" placeholder="Password" />
				</div>
				<button type="submit" >REGISTER</button>
				<span className="login__register--leftconversation">Already registered? <Link to="login">Login</Link></span>
			</form>
		</LoginRegister>
	);
}

export default Register;