import Friends from '../components/Friends';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as friendsActions from '../../utils/redux/actions/friends';
import * as chatActions from '../../utils/redux/actions/chat';

const mapStateToProps = (state) => ({
    myId: state.auth.userId,
    friendId: state.friends.friendId,
    friendsList: state.friends.friends
});

const mapActionsToProps = {
    ...friendsActions,
    ...chatActions
};

class FriendsContainer extends Component {
    consttructor(props) {
        super(props);
        this.selectFriend = this.selectFriend.bind(this);
    }
    selectFriend(id) {
        const {selectFriend, getChatHistory, myId} = this.props;
        selectFriend(id);
        getChatHistory(id, myId);
    }
    render() {
        const {friendId, friendsList} = this.props;
        return (
            <Friends selectFriend={selectFriend} friendId={friendId} friendsList={friendsList} />
        );
    }
}

FriendsContainer = connect(mapStateToProps, mapActionsToProps)(FriendsContainer);