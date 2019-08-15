import React from 'react';
import moment from 'moment';
import socket from '../../utils/socket';

export default ({conversation, friendId}) => {
    console.log("friendId ", friendId);
    console.log("conversation ", conversation);
    if(!friendId) {
        return (
            <div style={{height: '100%', width: '100%'}}>
                <p>
                    Select a friend to chat
                </p>
            </div>
        );
    }
    let previousDay = "";
    return (
        <ul>
            {
                conversation.reduce((messages, message, n) => {
                    const dateStamp = moment(message.sentAt).format("D MMMM YYYY");
                    if(dateStamp !== previousDay) {
                        messages.push(<p key={dateStamp}>
                            <span>{dateStamp}</span></p>);
                        previousDay = dateStamp;
                    }
                    messages.push(
                        <li key={'message_' + n} className={(friendId === message.to) ? "my-message" : "friend-message"}>
                            <span>{
                                message.msg
                            }</span>
                            <span className="time-stamp">{
                                moment(message.sentAt).format("h:mm a")
                            }</span>
                        </li>
                    );
                    return messages;
                }, [])
            }
        </ul>
    )
};