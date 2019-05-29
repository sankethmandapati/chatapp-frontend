import React, {Component} from 'react';
import {connect} from 'react-redux';
import Conversation from '../components/Conversation';
import {scrollToLatestMessage} from '../../utils/redux/actions/chat';

const mapStateToProps = (state) => ({
    conversation: state.chat.messages,
    friendId: state.friends.selectedFriend._id
});

class ConversationContainer extends Component {
    componentDidUpdate() {
        this.props.scrollToLatestMessage();
    }
    render() {
        return (
            <Conversation {...this.props} />
        );
    }
}

ConversationContainer = connect(mapStateToProps, {scrollToLatestMessage})(ConversationContainer);

export default ConversationContainer;