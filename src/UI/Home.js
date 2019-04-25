import React, {Component} from 'react';
import Chat from './Chat';
import Friends from './Friends';
import "../styles/Chat.scss";
import TopNav from './TopNav';

export default class ChatRooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFriend: {},
            showFriendsListModal: false
        }
        this.chatRef = React.createRef();
        this.selectFriend = this.selectFriend.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    componentWillMount() {}
    selectFriend(friend) {
        this.setState({selectedFriend: {...friend}, showFriendsListModal: !this.state.showFriendsListModal});
    }
    toggleModal() {
        console.log("toggleModal called: ", this.state.showFriendsListModal);
        this.setState({showFriendsListModal: !this.state.showFriendsListModal});
    }

    render() {
        return (
            <div className="home">
                <TopNav toggleModal={this.toggleModal} selectedFriend={this.state.selectedFriend}></TopNav>
                <div className="main">
                    <Friends toggleModal={this.toggleModal} showFriendsListModal={this.state.showFriendsListModal} selectedFriend={this.state.selectedFriend} selectFriend={this.selectFriend}></Friends>
                    <Chat selectedFriend={this.state.selectedFriend}></Chat>
                </div>
            </div>
        );
    }
}