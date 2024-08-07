import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api_base_url, togglePwd } from '../helper/Helper'

const Signup = () => {
  const [isTogglePwd, setIsTogglePwd] = useState(false);

  const [username, setusername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [error, setError] = useState("")

  const navigate = useNavigate();

  function submitForm(e) {
    e.preventDefault();
    fetch(api_base_url + "/singUp",
      {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, name: name, email: email, password: pwd })
      })
      .then(res => res.json()).then(data => {
        if (data.success) {
          navigate("/login");
        }
        else {
          setError(data.message);
        }
      })
  }

  return (
    <>
      <div className="w-screen flex flex-col items-center bg-[#2C2C2E] justify-center h-screen">
        <form onSubmit={submitForm} className="mainFrom flex flex-col w-[28vw] h-[auto] p-[25px] rounded-lg bg-[#3A3A3C]">
          <h3 className='text-3xl mb-5'>Sing Up</h3>

          <div className="inputBox mb-2">
            <input onChange={(e) => { setusername(e.target.value) }} value={username} type="text" placeholder='Username' name='username' id='username' required />
          </div>

          <div className="inputBox mb-2">
            <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" placeholder='Name' name='name' id='name' required />
          </div>

          <div className="inputBox mb-2">
            <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Email' name='email' id='email' required />
          </div>

          <div className="inputBox mb-2">
            <input onChange={(e) => { setPwd(e.target.value) }} value={pwd} type="password" placeholder='Password' name='password' id='password' required />
            {
              isTogglePwd ?
                <i className="ri-eye-line text-[20px] mr-2 cursor-pointer" onClick={() => { togglePwd("#password", isTogglePwd, setIsTogglePwd) }}></i>
                : <i className="ri-eye-off-line text-[20px] mr-2 cursor-pointer" onClick={() => { togglePwd("#password", isTogglePwd, setIsTogglePwd) }}></i>
            }

          </div>

          <span className='text-[14px] my-1 text-red-500'>{error}</span>

          <p className='my-3 '>Already Have An Account <Link to="/login" className='text-[#4A6FF4]'>Login</Link></p>

          <button className='btn-blue mb-4 mt-2'>Sing Up</button>
        </form>
      </div>
    </>
  )
}

export default Signup