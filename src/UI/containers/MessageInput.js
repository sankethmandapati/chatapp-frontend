import MessageInput from '../components/MessageInput';
import {connect} from 'react-redux';
import * as chatActions from '../../utils/redux/actions/chat';

const mapStateToProps = (state) => ({
    myId: state.auth.userDetails.userId,
    friendId: state.friends.selectedFriend._id
});

const MessageInputContainer = connect(mapStateToProps, chatActions)(MessageInput);

export default MessageInputContainer;