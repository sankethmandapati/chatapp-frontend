import socket from '../../utils/socket';
import Home from '../components/Home';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import * as chatActions from '../../utils/redux/actions/chat';
import * as friendsActions from '../../utils/redux/actions/friends';

const mapStateToProps = (state) => ({
    selfId: state.auth.userId,
    friendId: state.friends.selectedFriend
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
        socket.messageListener(this.props.newMessage);
        socket.friendsChangeListener(this.updateFriendsList);
        this.updateFriendsList();
    }
    updateFriendsList() {
        this.props.getFriendsList(this.props.selfId);
    }
    render() {
        return (
            <Home {...this.props} />
        );
    }
}

HomeContainer = connect(null, mapActionsToProps)(HomeContainer);

export default HomeContainer;