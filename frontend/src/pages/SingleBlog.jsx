import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Avatar from 'react-avatar'
import { api_base_url } from '../helper/Helper';
import { useParams } from 'react-router-dom';

const SingleBlog = () => {
  const {blogId} = useParams()
  const [comment, setComment] = useState("");
  const [data, setdata] = useState(null);
  const [error, setError] = useState("");
  console.log(blogId)

  function getData() {
    fetch(api_base_url + "/getSingleBlogData", { mode: "cors", method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        blogId: blogId
      })
     }).then(res => res.json()).then(data => {
      if (data.success) {
        setdata(data.blog)
      }
      else {
        setError(data.message)
      }
    })
  };

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Navbar />
      <div className="singBlogContainer px-[100px]">
        <img src="https://miro.medium.com/v2/resize:fit:1400/1*fHrAZJ1_L0Ff9dvVexL5_A.png" alt="" className="blogImg w-full h-[60vh] my-3 rounded-xl object-cover" />
        <div className='flex items-center gap-2'>
          <Avatar name={data ? data.uploadedByName : ""} size='40' round="50%" />
          <p>{data ? data.uploadedByName : ""}</p>
        </div>

        <div className='mt-2'>
          <h3 className='text-3xl'>{data ? data.title : "" }</h3>
          <p className='text-[gray]'>Uploaded On : {data ? new Date(data.date).toDateString() : ""} | Views : 323M</p>
          <b className='text-[14px]'>Description</b>
          <p className='text-[gray] text-[14px]'>{data ? data.description : ""}</p>

          <pre className='my-3'>{
            `
            <!DOCTYPE html>
<html>
<head>
     <title>My First Web Page</title>
</head>
<body>

       <h1>Welcome to My Web Page</h1>
       <p>This is a paragraph of text.</p>

 </body>
</html>
            `
          }</pre>

          <h3 className='text-2xl my-2'>Add comment</h3>

          <div className="inputBox !items-end !justify-end !bg-[!3A3A3C]" style={{ background: "#3A3A3C" }}>
            <textarea onChange={(e) => { setComment(e.target.value) }} value={comment} className='!bg-[!3A3A3C]' name="comment" id="comment" required placeholder='Add Comment Here... !'></textarea>
            {
              comment.length > 0 ? <div style={{ margin: "15px" }} className='w-[35px] h-[35px] rounded-[50%] bg-[#00AEEF] flex items-center justify-center cursor-pointer'><i class="ri-send-plane-fill"></i></div> : ""
            }
          </div>

          <h3 className='text-2xl my-2'>Comments</h3>

          <div className="comment cursor-pointer p-[10px] rounded-lg mb-3 flex items-center gap-2 bg-[#3A3A3C]">
            <Avatar name='Mahdi farooqui' size='40' round="50%" />
            <div>
              <p className='text-[gray] text-[14px]'>@mahdifarooqui</p>
              <p className=' text-[14px]'>This is a comment</p>
            </div>
          </div>

          <div className="comment cursor-pointer p-[10px] rounded-lg mb-3 flex items-center gap-2 bg-[#3A3A3C]">
            <Avatar name='Mahdi farooqui' size='40' round="50%" />
            <div>
              <p className='text-[gray] text-[14px]'>@mahdifarooqui</p>
              <p className=' text-[14px]'>This is a comment</p>
            </div>
          </div>

          <div className="comment cursor-pointer p-[10px] rounded-lg mb-3 flex items-center gap-2 bg-[#3A3A3C]">
            <Avatar name='Mahdi farooqui' size='40' round="50%" />
            <div>
              <p className='text-[gray] text-[14px]'>@mahdifarooqui</p>
              <p className=' text-[14px]'>This is a comment</p>
            </div>
          </div>

        </div>


      </div>
    </>
  )
}

export default SingleBlog