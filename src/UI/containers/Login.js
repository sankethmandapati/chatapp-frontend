import {connect} from 'react-redux';
import Login from '../components/Login';
import {login} from '../../utils/redux/actions/auth';
import AuthContainer from '../components/AuthContainer';

const mapStateToProps = (state) => {
    return {
        isLoggedin: state.auth.isLoggedin,
        ChildComponent: Login
    };
};

const AuthLoginContainer = connect(
    mapStateToProps, 
    {
        callApi: login
    }
)(AuthContainer);

export default AuthLoginContainer;