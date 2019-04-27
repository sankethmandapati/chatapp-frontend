import React, {Component} from 'react';
import socket from '../utils/socket';
import "../styles/Chat.scss";

export default class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends : [],
            friendSearch: ''
        };
        this.friends = [];
        this.friendsChangeListener = this.friendsChangeListener.bind(this);
        this.searchFriend = this.searchFriend.bind(this);
        // this.toggleModal = this.toggleModal.bind(this);
        this.friendsListRef = React.createRef();
        // this.selectFriend = this.selectFriend.bind(this);
    }
    async componentWillMount() {
        socket.friendsChangeListener(this.friendsChangeListener);
        this.friendsChangeListener();
    }
    async friendsChangeListener() {
        const friends = await socket.emit('get-friends', {querry: {}, selfId: socket.userDetails.userId});
        if(!this.props.selectedFriend._id && (friends.length > 0))
        // this.props.selectFriend(friends[0]);
        this.friends = friends;
        this.setState({friends});
    }
    searchFriend(e) {
        e.preventDefault();
        this.setState({friendSearch: e.target.value});
        const pattern = e.target.value.toLowerCase();
        const friends = this.friends.filter((friend) => {
            return friend.name.toLowerCase().includes(pattern);
        });
        this.setState({friends});
    }
    // toggleModal() {
    //     const visibilityStatus = this.friendsListRef.current.getAttribute("aria-hidden");
    //     this.friendsListRef.current.setAttribute("aria-hidden", !eval(visibilityStatus));
    // }
    render() {
        return (
            <div className="friends__mobile" aria-hidden={this.props.showFriendsListModal.toString()} ref={this.friendsListRef}>
                {/* <section className="friends__mobile"> */}
                    <i onClick={this.props.toggleModal} className="fa fa-times"></i>
                    <div className="friends__mobile--friendslist">
                        <div className="searchbar">
                            <input type="text" value={this.state.friendSearch} onChange={this.searchFriend} placeholder="Search or start new chat" />
                        </div>
                        {
                            this.state.friends.map((friend, n) => {
                                return (
                                    <a href="/" key={'friend_' + n} className={friend.isOnline ? 'online' : ''}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.props.selectFriend(friend)}
                                        }>
                                        <p>
                                            {
                                                friend.name
                                            }
                                        </p>
                                    </a>
                                );
                            })
                        }
                    </div>
                {/* </section> */}
            </div>
        );
    }
}