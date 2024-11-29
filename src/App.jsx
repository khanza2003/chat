import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import Base from "./Base";
import { io } from "socket.io-client";

const socket = io("https://chatserver-2z1p.onrender.com", {
    withCredentials: true,
    transports: ['websocket', 'polling'], 
});

function App() {
    return <Base socket={socket} />;
}

export default App;

