import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function({
    callApi,
    ChildComponent, 
    isLoggedin,
    registeredSuccessfully
}) {

	const [redirectToLogin, setRedirectToLogin] = useState(false);
	if(registeredSuccessfully) {
		alert("Registered successfully!\nA verification email has been send to your registered mail address, please check");
		setRedirectToLogin(true);
	}
    const callAuthApi = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        callApi(email, password, name);
    }
    if(isLoggedin)
        return <Redirect to="/" />;
    else if(redirectToLogin) {
        return <Redirect push to="/login" />;
    } else {
        return <ChildComponent callApi={callAuthApi} />;
    }
}
