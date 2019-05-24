import {connect} from 'react-redux';
import Register from '../components/Register';
import * as authActions from '../../utils/redux/actions/auth';
import AuthContainer from './AuthContainer';

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    ChildComponent: Register
});

const AuthRegisterContainer = connect(mapStateToProps, authActions)(AuthContainer);

export default AuthRegisterContainer;