import {connect} from 'react-redux';
import Login from '../components/Login';
import * as authActions from '../../utils/redux/actions/auth';
import AuthContainer from './AuthContainer';

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        ChildComponent: Login
    };
};

const AuthLoginContainer = connect(mapStateToProps, authActions)(AuthContainer);

export default AuthLoginContainer;