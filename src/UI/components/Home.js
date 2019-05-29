import React, {Component} from 'react';
import Chat from './Chat';
import Friends from '../containers/Friends';
import "../../styles/Chat.scss";
import TopNav from '../containers/TopNav';

const Home = () => (
    <div className="home">
        <TopNav />
        <div className="main">
            <Friends />
            <Chat />
        </div>
    </div>
);

export default Home;