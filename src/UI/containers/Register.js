import {connect} from 'react-redux';
import Register from '../components/Register';
import { register } from '../../utils/redux/actions/auth';

export default connect(null, { register })(Register);