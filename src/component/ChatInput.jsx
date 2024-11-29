import React from 'react';

const ChatInput = ({ message, sendMessage, setMessage }) => {
    return (
        <div className="mt-auto align-items-end border-info py-3 px-4 border-top d-lg-block chat-input">
            <div className="input-group flex-fill">
                <input
                    type="text"
                    className="form-control"
                    name="message"
                    value={message}
                    onChange={({ currentTarget: input }) => setMessage(input.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.code === "Enter" ? sendMessage() : null}
                />
                <button
                    className="btn btn-info"
                    onClick={sendMessage}  
                    disabled={!message.trim()} 
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
