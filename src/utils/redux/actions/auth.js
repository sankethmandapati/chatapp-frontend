import auth from "../../auth";

export const callApi = (email, password, name) => async (dispatch) => {
    try {
        dispatch({
            type: "LOGIN_REGISTER_REQUEST"
        });
        const requestType = name ? "register" : "login";
        console.log("email: ", email);
        console.log("password: ", password);
        console.log("name: ", name);
        const response = await auth[requestType]({email, password, name});
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