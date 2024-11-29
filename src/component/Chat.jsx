import React, { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatContainer from './ChatContainer';
import ScrollableFeed from 'react-scrollable-feed';

const formatTime = (timestamp) => {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    return new Date(timestamp).toLocaleTimeString([], options);
};

const Chat = ({ user, message, sendMessage, messages, setMessage }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <ChatContainer>
            <ChatHeader user={user} />
            <div className="chat-height position-relative overflow-auto">
                <ScrollableFeed>
                    <div className="d-flex flex-column p-4">
                        {messages.map((msg, index) => {
                            return msg.type === 'userStatus' ? (
                                <div key={index} className="text-center">
                                    <span className="badge bg-info">
                                        {msg.userId === user.userId
                                            ? ""
                                            : `${msg.username} has Joined!`}
                                    </span>
                                </div>
                            ) : (
                                <div
                                    key={index}
                                    className={msg.userId === user.userId ? 'chat-message-right pb-4' : 'chat-message-left pb-4'}
                                >
                                    <div>
                                        <img
                                            src="https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-curly-hair-brown-hat_1142-42780.jpg"
                                            alt={msg.username}
                                            title={msg.username}
                                            width="40"
                                            height="40"
                                            className="rounded-circle mr-1"
                                        />
                                        <div className="text-muted small text-nowrap mt-2">
                                            {formatTime(msg.timestamp)} 
                                        </div>
                                    </div>
                                    <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                        <div style={{color:'pink',fontWeight:'700'}} className=" mb-1">
                                            {msg.userId === user.userId ? 'You' : msg.username}
                                        </div>
                                        {msg.message}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div ref={messagesEndRef} />
                </ScrollableFeed>
            </div>
            <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </ChatContainer>
    );
};

export default Chat;
