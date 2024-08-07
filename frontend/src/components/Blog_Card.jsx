import React from 'react'
import { useNavigate } from 'react-router-dom'

const Blog_Card = ({blog}) => {
  const navigate = useNavigate();
  return (
    <>
      <div onClick={()=>{navigate(`/singleBlog/${blog._id}`)}} className="blogCard w-[21vw] cursor-pointer h-[350px] bg-[#3A3A3C] rounded-lg p-[15px]">
       <img className='w-full h-[60%] rounded-lg object-cover' src={blog.image} alt="" />
        
        <div className='details h-[100px]'>
          <h3 className='text-[20px] w-[80%] line-clamp-1 mt-2'>{blog.title}</h3>
          <p className='text-[14px] text-[#A3A3A3] line-clamp-3'>{blog.description}</p>
        </div>

        <div className="bottom flex items-center justify-between">
          <p className='text-[15px] text-[#A3A3A3]'>{new Date(blog.date).toDateString()}</p>
          <p className='text-[15px] text-[#A3A3A3]'>{blog.uploadedByName}</p>
        </div>
        
      </div>
    </>
  )
}

export default Blog_Card