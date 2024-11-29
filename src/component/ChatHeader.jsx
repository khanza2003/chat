import React from 'react'

const ChatHeader = ({user}) => {
  return (
    <div className="align-items-start py-2 px-4 w-100 border-bottom sticky-top bg-white" style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)", borderRadius: "8px", background: "linear-gradient(to right, #add8e6, #ffc0cb)" }}>
    <div className="d-flex align-items-center py-1">
        <div className="position-relative">
            <img src="https://t3.ftcdn.net/jpg/07/94/63/48/360_F_794634822_zPdXYlcXO9WEXoGPqTKOKWIgT5nwzjy3.jpg" className="rounded-circle mx-2" alt={user.username} width="60" height="60" />
        </div>
        <div className="flex-grow-1">
            <strong style={{fontSize:'25px'}}>Logged in as {user.username}</strong>
        </div>
    </div>
</div>
    )
}

export default ChatHeader