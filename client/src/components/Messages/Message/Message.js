import React from 'react';
import './Message.css';


const Message = ({message: { user, text }, name}) => {
    let isSentByUser = false;
    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName) {
        isSentByUser = true;
    }

    return (
        isSentByUser 
        ? (
            <div className="messageContainer justifyEnd" >
                <p className="sentText pr-10">{trimmedName}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{text}</p>
                </div>
            </div>
        )
        : (
            <div className="messageContainer">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{text}</p>
                </div>
                <p className="sentText pl-10">{user}</p>
            </div>
        )
    )
}

export default Message;