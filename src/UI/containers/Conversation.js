import {connect} from 'react-redux';
import Conversation from '../components/Conversation';
import * as chatActions from '../../utils/redux/actions/chat';

const mapStateToProps = (state) => ({
    conversation: state.chat.messages
});

const ConversationContainer = connect(mapStateToProps)(Conversation);

export default ConversationContainer;