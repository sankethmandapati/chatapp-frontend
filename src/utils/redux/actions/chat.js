import socket from "../../socket";

export const scrollToLatestMessage = () => {
    const conversationWindow = document.getElementsByClassName("main__chatwindow--conversation")[0];
    conversationWindow.scrollTo(0, conversationWindow.scrollHeight);
    return {type: ""};
}

export const getChatHistory = (myId, friendId) => async (dispatch) => {
    console.log("dispatching");
    try {
        dispatch({
            type: "CHAT_HISTORY_REQUEST",
        });
        console.log("Here...: ", myId);
        console.log("There...: ", friendId);
        const response = await socket.emit('get-chat-history', {
            myId,
            friendId
        });
        dispatch({
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

export const newMessage = (message, sendMessage) => {
    if(sendMessage) {
        socket.sendMessage(message);
    }
    return {
        type: "NEW_MESSAGE",
        message
    };
};