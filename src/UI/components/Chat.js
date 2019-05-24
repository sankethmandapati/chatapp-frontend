import React, {Component} from 'react';
import socket from '../../utils/socket';
import "../../styles/Chat.scss";
import Conversation from './Conversation';
import MessageInput from './MessageInput';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: '',
            placeHolderInvisible: false
        };
        this.socket = null;
        this.newMessageListener = this.newMessageListener.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }
    componentWillMount() {
        this.socket = socket.getInstance();
        socket.listenForNewMessages(this.newMessageListener);
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.selectedFriend._id !== nextProps.selectedFriend._id) {
            this.setState({messages: [], message: ''});
            this.getChatHistory(nextProps.selectedFriend._id);
        }
    }
    async getChatHistory(friendId) {
        try {
            const chatHistory = await socket.emit('get-chat-history', {
                myId: socket.userDetails.userId,
                friendId
            });
            await this.setState({messages: [...chatHistory]}, this.scrollToLatestMessage);
        } catch(err) {
            console.log("error: ", err);
            alert("There was some problem in fetching chat history");
        }
    }
    scrollToLatestMessage() {
        const conversationWindow = document.getElementsByClassName("main__chatwindow--conversation")[0];
        conversationWindow.scrollTo(0, conversationWindow.scrollHeight);
    }
    sendMessage(msg) {
        const messageObj = {
            to: this.props.selectedFriend._id,
            msg: msg,
            from: socket.userDetails.userId
        };
        socket.sendMessage(messageObj);
        this.newMessageListener(messageObj);
        this.setState({message: ""});
    }
    newMessageListener(msgObj) {
        const messages = [...this.state.messages];
        messages.push(msgObj);
        this.setState({messages}, this.scrollToLatestMessage);
    }
    render() {
        return (
            <div className="main__chatwindow">
                <section className="main__chatwindow--conversation">
                    {
                        (this.props.selectedFriend && this.props.selectedFriend._id)  ? (
                            <Conversation chatArray={this.state.messages} />
                        ) : (
                            <div style={{height: '100%', width: '100%'}}>
                                <p>
                                    Select a friend to chat
                                </p>
                            </div>
                        )
                    }
                </section>
                {
                    this.props.selectedFriend._id ? (
                        <MessageInput sendMessage={this.sendMessage} />
                    ) : null
                }
            </div>
        );
    }
}