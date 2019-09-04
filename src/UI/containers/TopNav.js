import TopNav from '../components/TopNav';
import {logout} from '../../utils/redux/actions/auth';
import {toggleModal} from '../../utils/redux/actions/friends';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    friendName: state.friends.selectedFriend.name,
    userName: state.auth.userDetails.userName,
    isLoggedin: state.auth.isLoggedin
});

const mapActionsToProps = {
    toggleModal,
    logout
};

const TopNavContainer = connect(mapStateToProps, mapActionsToProps)(TopNav);

export default TopNavContainer;