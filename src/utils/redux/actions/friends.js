import socket from '../../socket';

export const selectFriend = (id) => ({
    type: "SELECT_FRIEND",
    friendId: id
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

export const toggleModal = () => ({
    type: "TOGGLE_MODAL"
});