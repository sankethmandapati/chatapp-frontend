import auth from "../../auth";

export const callApi = (email, password, name) => async (dispatch) => {
    try {
        dispatch({
            type: "LOGIN_REGISTER_REQUEST"
        });
        const requestType = name ? "register" : "login";
        const response = await auth[requestType]({email, password, name});
        // console.log("response: ", response);
        return dispatch({
            type: "LOGIN_REGISTER_SUCCESS",
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