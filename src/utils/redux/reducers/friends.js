export default (state = {}, action) => {
    switch(action.type) {
        case "FRIENDS_UPDATE_REQUEST":
            return {
                ...state,
                isLoading: true
            };
        case "FRIENDS_UPDATE_SUCCESS":
            return {
                ...state,
                friendsList: action.response,
                isLoading: false
            };
        case "FRIENDS_UPDATE_FAILURE":
            return {
                ...state,
                isLoading: false,
                errorMessage: action.errorMessage
            };
        case "SELECT_FRIEND":
            return {
                ...state,
                selectedFriend: action.selectedFriend
            };
        case "TOGGLE_MODAL":
            return {
                ...state,
                showFriendsListModal: !state.showFriendsListModal
            };
        case "SEARCH_FRIEND_REQUEST":
            return {
                ...state,
                isLoading: false
            };
        case "SEARCH_FRIEND_ERROR":
            return {
                ...state,
                isLoading: false,
                errorMessage: action.errorMessage
            };
        case "SEARCH_FRIEND_SUCCESS":
            return {
                ...state,
                isLoading: false,
                friendsList: action.response
            };
        default:
            return state;
    }
}