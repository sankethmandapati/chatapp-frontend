import React, {Component} from 'react';
import socket from '../utils/socket';
import "../styles/Chat.scss";

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: ''
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
            await this.setState({messages: [...chatHistory]});
            const conversationWindow = document.getElementsByClassName("main__chatwindow--conversation")[0];
            conversationWindow.scrollTo(0,conversationWindow.scrollHeight);
        } catch(err) {
            console.log("error: ", err);
            alert("There was some problem in fetching chat history");
        }
    }
    sendMessage(e) {
        e.preventDefault();
        const messageObj = {
            to: this.props.selectedFriend._id,
            msg: this.state.message,
            from: socket.userDetails.userId
        };
        socket.sendMessage(messageObj);
        this.newMessageListener(messageObj);
        this.setState({message: ""});
    }
    newMessageListener(msgObj) {
        const messages = [...this.state.messages];
        messages.push(msgObj);
        this.setState({messages});
    }
    render() {
        const chatArray = [...this.state.messages];
        return (
            <div className="main__chatwindow">
                <section className="main__chatwindow--conversation">
                    {
                        (this.props.selectedFriend && this.props.selectedFriend._id)  ? (
                            <ul>
                                {
                                    chatArray.reverse().map((message, n) => {
                                        return (
                                            <li key={'message_' + n} className={(socket.userDetails.userId === message.from) ? "my-message" : "friend-message"}>
                                                {
                                                    message.msg
                                                }
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        ) : (
                            <div style={{height: '100%', width: '100%'}}>
                                <p>
                                    Select a friend to chat
                                </p>
                            </div>
                        )
                    }
                </section>
                <form className="main__chatwindow--chatform" onSubmit={this.sendMessage}>
                    <input type="text" placeholder="Type a message" onChange={(e) => this.setState({message: e.target.value})} value={this.state.message} />
                    <button type="submit">
                        <i className="fa fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        );
    }
}