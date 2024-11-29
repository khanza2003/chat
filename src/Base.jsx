import React, { useState, useEffect } from 'react';
import Login from "./component/Login";
import Chat from "./component/Chat";

const Base = ({ socket }) => {
    const [newUser, setNewUser] = useState("");
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        
        const handleUsers = (users) => {
            const messagesArr = [];
            for (const { userId, username } of users) {
                const newMessage = { type: "userStatus", userId, username };
                messagesArr.push(newMessage);
            }
            setMessages((prevMessages) => [...prevMessages, ...messagesArr]);
            setUsers(users);
        };

        const handleSession = ({ userId, username }) => {
            setUser({ userId, username });
        };

        const handleUserStatus = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        const handleUserConnected = ({ userId, username }) => {
            const newMessage = { type: "userStatus", userId, username };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        const handleNewMessage = ({ userId, username, message, timestamp }) => {
            const newMessage = { type: "message", userId, username, message, timestamp };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        
        socket.on("users", handleUsers);
        socket.on("session", handleSession);
        socket.on("userStatus", handleUserStatus);
        socket.on("user connected", handleUserConnected);
        socket.on("new message", handleNewMessage);

       
        return () => {
            socket.off("users", handleUsers);
            socket.off("session", handleSession);
            socket.off("userStatus", handleUserStatus);
            socket.off("user connected", handleUserConnected);
            socket.off("new message", handleNewMessage);
        };

    }, [socket]); 

    const handleChange = ({ currentTarget: input }) => {
        setNewUser(input.value);
    };

    const logNewUser = () => {
        if (newUser.trim() !== "") {
            setUser({ userId: newUser, username: newUser });
            socket.auth = { username: newUser };  
            socket.connect(); 
        } else {
            alert("Username cannot be empty!");
        }
    };

    const sendMessage = () => {
        if (message.trim() === "") return; 

        const timestamp = new Date().toISOString();
        socket.emit("new message", message);

        const newMessage = { type: "message", userId: user.userId, username: user.username, message, timestamp };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage("");
    };

    return (
        <main className="content">
            <div className="container mt-3">
                {user.userId ? (
                    <Chat user={user} message={message} messages={messages} sendMessage={sendMessage} setMessage={setMessage} />
                ) : (
                    <Login
                        handleChange={handleChange}
                        logNewUser={logNewUser}
                        newUser={newUser}
                    />
                )}
            </div>
        </main>
    );
};

export default Base;
