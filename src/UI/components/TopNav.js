import React from 'react';
import {Redirect} from 'react-router-dom';
import "../../styles/TopNav.scss";

const TopNav = ({userName, friendName, toggleModal, logout, isLoggedin}) => {
    if(!isLoggedin)
        return (<Redirect to="/login" />);
    return (
        <div className="home__topnav">
            <section className="home__topnav--left">
                <span>
                    {
                        userName
                    }
                </span>
                <a href="/login" onClick={(e) => {
                    e.preventDefault();
                    logout();
                }}>Logout</a>
            </section>
            <section className="home__topnav--right">
                <span>
                    {
                        friendName
                    }
                </span>
                <i className="fa fa-comments-o" onClick={toggleModal}></i>
                <i className="fa fa-sign-out" onClick={(e) => {
                    e.preventDefault();
                    logout();
                }}></i>
            </section>
        </div>
    );
}

export default TopNav;