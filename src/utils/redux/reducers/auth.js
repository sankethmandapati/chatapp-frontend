export default (state = {}, action) => {
    switch(action.type) {
        case "LOGIN_REGISTER_REQUEST":
            return {
                ...state,
                isLoading: true,
                isLoggedin: false
            };
        case "LOGIN_REGISTER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isLoggedin: true,
                userDetials: action.response
            };
        case "LOGIN_REGISTER_FAILURE":
            return {
                ...state,
                isLoading: false,
                errorMessage: action.errorMessage
            };
        case "LOGOUT":
            return {
                ...state,
                isLoggedin: false,
                userDetials: {}
            };
        default:
            return state;
    }
}