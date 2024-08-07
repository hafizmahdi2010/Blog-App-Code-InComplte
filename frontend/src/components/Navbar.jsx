import React, { useEffect, useState } from 'react'
import Logo from "../images/codeFusion.png"
import { Link } from 'react-router-dom'
import Avatar from 'react-avatar';
import { addClass, api_base_url, removeClass, toggleClass, toggleHiddenClass } from '../helper/Helper';

const Navbar = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  function getUserDetails() {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors", method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userId": localStorage.getItem("userId"),
      })
    }).then(res => res.json())
      .then(data => {
        if (data.success == false) {
          setError(data.message)
        }
        else {
          setData(data);
        };
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);


  return (
    <>
      <header className='flex items-center px-[100px] h-[90px] bg-[#3A3A3C] justify-between'>
        <div className="logo">
          <img className='w-[200px]' src={Logo} alt="" />
        </div>

        <div className="right flex items-center gap-[15px]">
          <Link to="/">Home</Link>
          <Link>About</Link>
          <Link>Blog</Link>
          <Link>Servises</Link>
          <Link>Contact</Link>

          <div className="inputBox hidden !w-[30vw] searchBox">
            <input type="text" placeholder='Search Here... !' />
            <i onClick={() => { addClass(".searchBox", "hidden") }} className="ri-close-line text-[20px] cursor-pointer mr-2"></i>
          </div>

          <i onClick={() => { removeClass(".searchBox", "hidden") }} className="ri-search-line text-[20px] searchBtn cursor-pointer"></i>
          <Avatar onClick={() => { toggleHiddenClass(".dropDown") }} name={data ? data.name : ""} size="40" className=' cursor-pointer' round="50%" />

          <div className="dropDown hidden absolute right-4 top-[90px] shadow-lg rounded-lg p-[15px] bg-[#3A3A3C] w-[250px] h-[250px]">
            <div className='mb-3'>
              <h3 className='-mb-1'>{data ? data.name : ""}</h3>
              <Link to="/profile" className='text-[14px] text-blue-500 mb-2'>View Profile</Link>
            </div>
            <Link to="/uploadBlog" className='flex items-center gap-[10px] p-[10px] bg-[#4A4A4E] mb-2'><i className="ri-upload-2-line text-[20px]"></i> Upload Blog</Link>
            <Link to="/createNewBlogList" className='flex items-center gap-[10px] p-[10px] bg-[#4A4A4E] mb-2'><i className="ri-add-line text-[20px]"></i> Create New BlogList</Link>
            <Link className='flex items-center gap-[10px] p-[10px] bg-[#4A4A4E] mb-2'><i className="ri-logout-circle-r-fill text-[20px]"></i> Logout</Link>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar