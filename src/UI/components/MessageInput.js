import React from 'react';
import userAgent from '../../utils/userAgent';

let isMobileDevice = userAgent();

export default ({sendMessage}) => {

    const inputRef = React.createRef();
    const sendMsg = () => {
        const text = inputRef.current.innerText.trim();
        if(text) {
            sendMessage(text);
            inputRef.current.innerText = "";
        }
    }

    return (
        <div className="main__chatwindow--chatform">
            <div className="messageinput" 
                contentEditable="true" 
                role="textbox" 
                spellCheck="true"
                onKeyDown={(e) => {
                    const code = e.keyCode, shift = e.shiftKey;
                    if((code === 13) && !shift && !isMobileDevice) {
                        e.preventDefault();
                        sendMsg();
                    }
                }}
                data-placeholder="Type a message"
                ref={inputRef}>
            </div>
            <button onClick={sendMsg}>
                <i className="fa fa-paper-plane"></i>
            </button>
        </div>
    );
};