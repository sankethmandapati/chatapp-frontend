import React, {Component} from 'react';
import socket from '../utils/socket';
import auth from '../utils/auth';
import {Redirect} from 'react-router-dom';
import "../styles/TopNav.scss";

export default class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true
        };
        this.logout = this.logout.bind(this);
    }
    async logout(e) {
        try {
            e.preventDefault();
            await auth.logout();
            this.setState({isLoggedIn: false});
        } catch(err) {
            console.log("error: ", err);
            alert("There was some problem while trying to logout");
        }
    }
    render() {
        if(this.state.isLoggedIn) {
            return (
                <div className="home__topnav">
                    <section className="home__topnav--left">
                        <span>
                            {
                                socket.userDetails.userName
                            }
                        </span>
                        <a href="/login" onClick={this.logout}>Logout</a>
                    </section>
                    <section className="home__topnav--right">
                        <i className="fa fa-bars"></i>
                        <span>
                            {
                                this.props.selectedFriend.name
                            }
                        </span>
                        <i className="fa fa-users" onClick={this.props.toggleModal}></i>
                    </section>
                </div>
            );
        } else {
            return <Redirect to='/login' />;
        }
    }
}