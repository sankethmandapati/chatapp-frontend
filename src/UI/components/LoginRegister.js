import React from 'react';
const LoginRegister = ({ children }) => <section className="login__register">
    <div className="backgorund-animation">
        <img alt="chat_cartoon" className="login__register--leftanime" src={require("../../assets/left_conversation.png")} />
    </div>
    {
        children
    }
    <div className="backgorund-animation">
        <img alt="chat_cartoon" className="login__register--rightanime" src={require("../../assets/right_conversation.png")} />
    </div>
</section>;
export default LoginRegister;