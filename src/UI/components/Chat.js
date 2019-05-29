import React from 'react';
import "../../styles/Chat.scss";
import Conversation from '../containers/Conversation';
import MessageInput from '../containers/MessageInput';

const Chat = () => (
    <div className="main__chatwindow">
        <section className="main__chatwindow--conversation">
            <Conversation />
        </section>
        <MessageInput />
    </div>
);

export default Chat;