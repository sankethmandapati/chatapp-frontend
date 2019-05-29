import Friends from '../components/Friends';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as friendsActions from '../../utils/redux/actions/friends';
import * as chatActions from '../../utils/redux/actions/chat';

const mapStateToProps = (state) => ({
    myId: state.auth.userDetails.userId,
    friendId: state.friends.selectedFriend._id,
    friendsList: state.friends.friendsList,
    showFriendsListModal: state.friends.showFriendsListModal
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
        this.searchFriend = this.searchFriend.bind(this);
    }
    selectFriend(selectedFriend) {
        const {selectFriend, getChatHistory, myId} = this.props;
        selectFriend(selectedFriend);
        console.log("calling");
        getChatHistory(selectedFriend._id, myId);
    }

    searchFriend(e) {
        e.preventDefault();
        if(e.target.value) {
            this.setState({friendSearch: e.target.value.toLowerCase()});
        }
    }

    render() {
        let {friendId, friendsList} = this.props;
        if(this.state.friendSearch) {
            friendsList = friendsList.filter((friend) => {
                return friend.name.toLowerCase().includes(this.state.friendSearch);
            });
        }

        return (
            <Friends 
                selectThsiFriend={this.selectFriend} 
                friendId={friendId} 
                friendsList={friendsList}
                searchFriend={this.searchFriend}
                {...this.props} />
        );
    }
}

FriendsContainer = connect(mapStateToProps, mapActionsToProps)(FriendsContainer);

export default FriendsContainer;