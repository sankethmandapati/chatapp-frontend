import MessageInput from '../components/MessageInput';
import {connect} from 'react-redux';
import * as chatActions from '../../utils/redux/actions/chat';

const MessageInputContainer = connect(null, chatActions)(MessageInput);

export default MessageInputContainer;