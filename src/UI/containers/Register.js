import {connect} from 'react-redux';
import Register from '../components/Register';
import { register } from '../../utils/redux/actions/auth';
import AuthContainer from '../components/AuthContainer';

const mapStateToProps = (state) => ({
    registeredSuccessfully: state.auth.registeredSuccessfully,
    ChildComponent: Register
});

const AuthRegisterContainer = connect(
    mapStateToProps, 
    {
        callApi: register
    }
)(AuthContainer);

export default AuthRegisterContainer;