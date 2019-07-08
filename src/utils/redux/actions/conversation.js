import socket from '../../socket';

export const getConversations = () => async (dispatch) => {
    try {
        const conversations = await socket.emit('get-conversations');
        console.log("conversations: ", conversations);
        dispatch({
            type: 'CONVERSATION_RESPONSE',
            conversations
        });
    } catch(err) {
        console.log("Error in getting conversations: ", err);
        dispatch({
            type: 'CONVERSATION_ERROR',
            errorMessage: 'Internal Error'
        });
    }
}

export const startNewConversation = (friendId) => async (dispatch) => {
    try {
        const newConversation = await socket.emit('new-conversation');
        console.log("newConversation: ", newConversation);
        dispatch({
            type: 'NEW_CONVERSATION_RESPONSE',
            newConversation
        });
    } catch(err) {
        console.log("Error: ", err);
        dispatch({
            type: 'NEW_CONVERSATION_ERROR',
            errorMessage: 'Internal Error'
        });
    }
}