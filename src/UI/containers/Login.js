import {connect} from 'react-redux';
import Login from '../components/Login';
import {login} from '../../utils/redux/actions/auth';

const mapStateToProps = (state) => ({
    isLoggedin: state.auth.isLoggedin
});

export default connect(
    mapStateToProps, { login }
)(Login);