import auth from "../../auth";

export const register = (e) => async (dispatch) => {
    try {
        e.preventDefault();
        dispatch({
            type: "LOGIN_REGISTER_REQUEST"
        });
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const response = await auth.register({email, password, name});
        alert("Registered successfully!\nA verification email has been send to your registered mail address, please check");
        return dispatch({
            type: "REGISTER_SUCCESS",
            response
        });
    } catch(err) {
        console.log("Erorr: ", err);
        return dispatch({
            type: "LOGIN_REGISTER_FAILURE",
            errorMessage: "Error in calling api"
        });
    }
}

export const login = (e) => async (dispatch) => {
    try {
        e.preventDefault();
        dispatch({
            type: "LOGIN_REGISTER_REQUEST"
        });
        const email = e.target.email.value;
        const password = e.target.password.value;
        const response = await auth.login({email, password});
        return dispatch({
            type: "LOGIN_SUCCESS",
            response
        });
    } catch(err) {
        console.log("Erorr: ", err);
        return dispatch({
            type: "LOGIN_REGISTER_FAILURE",
            errorMessage: "Error in calling api"
        });
    }
}

export const logout = () => async (dispatch) => {
    try {
        await auth.logout();
        dispatch({
            type: "LOGOUT"
        });
    } catch(err) {
        console.log("error in logging out");
    }
}