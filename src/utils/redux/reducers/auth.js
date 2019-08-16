export default (state = {}, action) => {
    switch(action.type) {
        case "LOGIN_REGISTER_REQUEST":
            return {
                ...state,
                isLoading: true,
                isLoggedin: false
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isLoggedin: true,
                userDetails: action.response
            };
        case "REGISTER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                registeredSuccessfully: true
            };
        case "LOGIN_REGISTER_FAILURE":
            return {
                ...state,
                isLoading: false,
                isLoggedin: false,
                errorMessage: action.errorMessage
            };
        case "LOGOUT":
            return {
                ...state,
                isLoggedin: false,
                userDetails: {}
            };
        default:
            return state;
    }
}