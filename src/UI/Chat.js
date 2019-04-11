import React, {Component} from 'react';
import socket from '../utils/socket';

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
        console.log("this.props.selectedFriend: ", this.props.selectedFriend);
        this.socket = socket.getInstance();
        socket.listenForNewMessages(this.newMessageListener);
    }
    componentWillUpdate() {
        console.log("this.props: ", this.props);
    }
    getAllMessages() {}
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
        return (
            <div className="chat__window">
                <section className="statusBar">
                    <p>
                        {
                            this.props.selectedFriend.name
                        }
                    </p>
                </section>
                <section className="chat__window--conversation">
                    <ul>
                        {
                            this.state.messages.map((message, n) => {
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
                </section>
                <form className="chatform" onSubmit={this.sendMessage}>
                    <input type="text" onChange={(e) => this.setState({message: e.target.value})} value={this.state.message} />
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}