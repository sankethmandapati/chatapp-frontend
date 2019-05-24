import socket from "../../socket";

export const getChatHistory = (myId, friendId) => async (dispatch) => {
    try {
        dispatch({
            type: "CHAT_HISTORY_REQUEST",
        });
        const response = await socket.emit('get-chat-history', {
            myId,
            friendId
        });
        return dispatch({
            type: "CHAT_HISTORY_SUCCESS",
            response
        });
    } catch(err) {
        console.log("error: ", err);
        return dispatch({
            type: "CHAT_HISTORY_FILURE",
            errorMessage: "error in getting chat history"
        });
    }
}