import React from 'react';
import moment from 'moment';
import socket from '../../utils/socket';

export default ({chatArray}) => {
    let previousDay = "";
    return (
        <ul>
            {
                chatArray.reduce((messages, message, n) => {
                    // console.log("msg:: ", message);
                    const dateStamp = moment(message.sentAt).format("D MMMM YYYY");
                    if(dateStamp !== previousDay) {
                        messages.push(<p key={dateStamp}>
                            <span>{dateStamp}</span></p>);
                        previousDay = dateStamp;
                    }
                    messages.push(
                        <li key={'message_' + n} className={(socket.userDetails.userId === message.from) ? "my-message" : "friend-message"}>
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