import Friends from '../components/Friends';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as friendsActions from '../../utils/redux/actions/friends';
import * as chatActions from '../../utils/redux/actions/chat';

const mapStateToProps = (state) => ({
    myId: state.auth.userDetails.userId,
    friendId: state.friends.selectedFriend._id,
    friendsList: state.friends.friendsList,
    hideFriendsListModal: state.friends.hideFriendsListModal
});

const mapActionsToProps = {
    ...friendsActions,
    ...chatActions
};

class FriendsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendSearch: ""
        };
        this.selectFriend = this.selectFriend.bind(this);
    }
    selectFriend(selectedFriend) {
        const {selectFriend, getChatHistory, myId} = this.props;
        selectFriend(selectedFriend);
        getChatHistory(selectedFriend._id, myId);
    }

    render() {
        let {friendsList, toggleModal, hideFriendsListModal} = this.props;
        return (
            <Friends 
                hideFriendsListModal={hideFriendsListModal}
                friendsList={friendsList}
                selectThisFriend={this.selectFriend}
                toggleModal={toggleModal}
            />
        );
    }
}

FriendsContainer = connect(mapStateToProps, mapActionsToProps)(FriendsContainer);

export default FriendsContainer;