import React from 'react'

const Login = ({newUser,handleChange,logNewUser}) => {
  return (
    <div className="card w-100 text-center border-none ">
                        <div className="row">
                            <div className="col-12">
                                <h5>Enter Username</h5>
                            </div>
                            <div className="d-flex justify-content-center py-1">
                                <div className="col-4">
                                    <input 
                                        onChange={(e) => handleChange(e)} 
                                        type="text" 
                                        name="username" 
                                        value={newUser} 
                                        className="form-control mb-3" 
                                        placeholder="Enter Username" 
                                        autoComplete="off" 
                                        onKeyPress={(e) => (e.code === "Enter" ? logNewUser() : null)} 
                                    />
                                    <button 
                                        className="btn w-100" 
                                        onClick={logNewUser}  
                                        style={{background:"rgb(231, 104, 146)"}}
                                    >
                                        Join!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
  )
}

export default Login