import socket from '../../socket';

export const selectFriend = (selectedFriend) => ({
    type: "SELECT_FRIEND",
    selectedFriend
});

export const getFriendsList = (selfId) => async (dispatch) => {
    try {
        dispatch({
            type: "FRIENDS_UPDATE_REQUEST"
        });
        const response = await socket.emit('get-friends', {querry: {}, selfId});
        dispatch({
            type: "FRIENDS_UPDATE_SUCCESS",
            response
        });
    } catch(err) {
        console.log("Erorr in getting the friends list: ", err);
        dispatch({
            type: "FRIENDS_UPDATE_FAILURE",
            errorMessage: "Error in getting friends list"
        });
    }
}

export const searchFriend = (searchText) => async (dispatch) => {
    try {
        dispatch({
            type: 'SEARCH_FRIEND_REQUEST'
        });
        let response = [];
        if(searchText) {
            response = await socket.emit('search-friend', {querryString: searchText});
        }
        dispatch({
            type: 'SEARCH_FRIEND_SUCCESS',
            response
        });
    } catch(err) {
        console.log("Error in searching friend: ", err);
        dispatch({
            type: 'SEARCH_FRIEND_ERROR',
            errorMessage: "Internal error."
        });
    }
}

export const toggleModal = () => ({
    type: "TOGGLE_MODAL"
});