import socket from '../../utils/socket';
import Home from '../components/Home';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import * as chatActions from '../../utils/redux/actions/chat';

class HomeContainer extends Component {
    componentWillMount() {
        socket.messageListener(this.props.newMessage);
    }
    render() {
        return (
            <Home {...this.props} />
        );
    }
}

HomeContainer = connect(nul, chatActions)(HomeContainer);

export default HomeContainer;