import Navbar from '../components/Navbar'
import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from "jodit-pro-react";
import { api_base_url } from '../helper/Helper';
import { useNavigate } from 'react-router-dom';

const AddNewBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate(); 

  function createBlog() {
    console.log("called");
    console.log(title, content, desc, image);
  
    if (title !== "" && desc !== "" && image !== "" && content !== "") {
      console.log("if");
      fetch(api_base_url + "/createBlog", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          desc: desc,
          image: image,
          content: content,
          userId: localStorage.getItem("userId"),
        }),
      })
        .then(res => res.json())
        .then(data => {
          if(data.success){
            navigate("/")
          }
          else{
            setError(data.message)
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    } else {
      console.log("else");
      setError("Fill All The Fields");
    }
  }


  useEffect(() => {
    setTimeout(() => {
      let allpaths = document.querySelectorAll("path");
      Array.from(allpaths).forEach((path) => {
        path.setAttribute("fill", "#ffffff");
      })
    }, 1000);
  }, [])

  return (
    <>
      <Navbar />

      <div className="addNewBlogCon px-[100px]">
        <h3 className='text-3xl my-3 mt-10'>Add New Blog - Learn JavaScript</h3>
        <div className="inputBox mb-2" style={{ background: "#3A3A3C" }}>
          <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder='Enter Blog Title' />
        </div>
        <div className="inputBox mb-2" style={{ background: "#3A3A3C" }}>
          <input onChange={(e)=>{setImage(e.target.value)}} value={image} type="text" placeholder='Paset The Blog Image URL... !' />
        </div>
        <div className="inputBox mb-2" style={{ background: "#3A3A3C" }}>
          <textarea onChange={(e)=>{setDesc(e.target.value)}} value={desc} name="" placeholder='Enter Blog Description' id=""></textarea>
        </div>
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1} // tabIndex of textarea
          onChange={newContent => setContent(newContent)}
        />

        <p className='text-[14px] text-red-500'>{error}</p>

        <button onClick={createBlog} className='btn-blue my-3'>Create New Blog</button>

      </div>
    </>
  )
}

export default AddNewBlog