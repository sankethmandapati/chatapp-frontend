import socket from '../../utils/socket';
import Home from '../components/Home';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import * as chatActions from '../../utils/redux/actions/chat';
import * as friendsActions from '../../utils/redux/actions/friends';

const mapStateToProps = (state) => ({
    selfId: state.auth.userDetails.userId,
    friendId: state.friends.selectedFriend._id
});

const mapActionsToProps = {
    ...chatActions,
    ...friendsActions
};

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.updateFriendsList = this.updateFriendsList.bind(this);
    }
    componentWillMount() {
        socket.messageListener((msg) => {
            if(msg.from === this.props.friendId)
                this.props.newMessage(msg);
        });
        socket.friendsChangeListener(this.updateFriendsList);
        this.updateFriendsList();
    }
    updateFriendsList() {
        console.log("this.props: ", this.props);
        this.props.getFriendsList(this.props.selfId);
    }
    render() {
        return (
            <Home {...this.props} />
        );
    }
}

HomeContainer = connect(mapStateToProps, mapActionsToProps)(HomeContainer);

export default HomeContainer;