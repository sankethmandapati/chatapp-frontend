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
                selectedFriend: action.selectedFriend,
                hideFriendsListModal: true
            };
        case "TOGGLE_MODAL":
            return {
                ...state,
                hideFriendsListModal: !state.hideFriendsListModal
            };
        default:
            return state;
    }
}