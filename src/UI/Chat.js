import React, {Component} from 'react';
import socket from '../utils/socket';
import userAgent from '../utils/userAgent';
import moment from 'moment';
import "../styles/Chat.scss";

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: '',
            placeHolderInvisible: false
        };
        this.socket = null;
        this.isMobileDevice = false;
        this.newMessageListener = this.newMessageListener.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.messageRef = React.createRef();
        this.focusOnMessageBox = this.focusOnMessageBox.bind(this);
    }
    componentWillMount() {
        this.socket = socket.getInstance();
        this.isMobileDevice = userAgent();
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
    sendMessage(e) {
        const msg = this.messageRef.current.innerText.trim();
        if(msg) {
            const messageObj = {
                to: this.props.selectedFriend._id,
                msg: msg,
                from: socket.userDetails.userId
            };
            socket.sendMessage(messageObj);
            this.newMessageListener(messageObj);
        }
        this.setState({message: ""});
        this.messageRef.current.innerText = "";
    }
    newMessageListener(msgObj) {
        const messages = [...this.state.messages];
        messages.push(msgObj);
        this.setState({messages}, this.scrollToLatestMessage);
    }
    focusOnMessageBox() {
        this.messageRef.current.focus();
    }
    render() {
        const chatArray = [...this.state.messages];
        let previousDay = "";
        return (
            <div className="main__chatwindow">
                <section className="main__chatwindow--conversation">
                    {
                        (this.props.selectedFriend && this.props.selectedFriend._id)  ? (
                            <ul>
                                {
                                    chatArray.reduce((messages, message, n) => {
                                        const dateStamp = moment(message.sentAt).format("D MMMM YYYY");
                                        if(dateStamp !== previousDay) {
                                            messages.push(<p key={dateStamp}>
                                                <span>{dateStamp}</span></p>);
                                            previousDay = dateStamp;
                                        }
                                        messages.push(
                                            <li key={'message_' + n} className={(socket.userDetails.userId === message.from) ? "my-message" : "friend-message"}>
                                                <span>{
                                                    message.msg
                                                }</span>
                                                <span className="time-stamp">{
                                                    moment(message.sentAt).format("H:mm a")
                                                }</span>
                                            </li>
                                        );
                                        return messages;
                                    }, [])
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
                <div className="main__chatwindow--chatform">
                    {/* <div className="placeholder" invisible={this.state.placeHolderInvisible.toString()}>Type a message</div> */}
                    <div className="messageinput" 
                        contentEditable="true" 
                        role="textbox" 
                        spellCheck="true"
                        onKeyDown={(e) => {
                            const code = e.keyCode, shift = e.shiftKey;
                            if((code === 13) && !shift && !this.isMobileDevice) {
                                e.preventDefault();
                                this.sendMessage();
                            }
                        }}
                        data-placeholder="Type a message"
                        ref={this.messageRef}>
                    </div>
                    {/* <input type="text" placeholder="Type a message" onChange={(e) => this.setState({message: e.target.value})} value={this.state.message} /> */}
                    <button onClick={this.sendMessage}>
                        <i className="fa fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        );
    }
}