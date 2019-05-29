const messagesReducer = (state = [], action) => {
    switch(action.type) {
        case "NEW_MESSAGE":
            return [
                ...state,
                action.message
            ];
        case "CHAT_HISTORY_SUCCESS":
            return [
                ...action.response
            ];
        default:
            return state;
    }
}

export default (state = {}, action) => {
    switch(action.type) {
        case "NEW_MESSAGE":
            return {
                ...state,
                messages: messagesReducer(state.messages, action)
            };
        case "CHAT_HISTORY_REQUEST":
            return {
                ...state,
                isLoading: true
            };
        case "CHAT_HISTORY_SUCCESS":
            return {
                ...state,
                isLoading: false,
                messages: messagesReducer(state.messages, action)
            };
        case "CHAT_HISTORY_FILURE":
            return {
                ...state,
                isLoading: false,
                errorMessage: action.errorMessage
            };
        default:
            return state;
    }
}