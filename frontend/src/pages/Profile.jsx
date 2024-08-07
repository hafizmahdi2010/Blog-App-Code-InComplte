import React from 'react'
import Navbar from '../components/Navbar'
import Avatar from 'react-avatar'
import Blog_Card from '../components/Blog_Card'

const Profile = () => {
  return (
    <>
      <Navbar/>
      <div className="flex px-[100px] items-end justify-between mt-[25px]">
       <div className='flex items-center gap-5 '>
          <Avatar name='mahdi farooqui' size='180' round="50%"/>
          <div>
          <h3 className='text-[24px]'>Mahdi farooqui</h3>
          <p className='text-[14px] text-[#808080]'>Joined In 2/3/2024</p>
          </div>
       </div>
       <div>
        <button className='btn-blue !px-[50px]'>Upload New Blog</button>
       </div>
      </div>
      <div className='px-[100px] mt-[26px]'>
        <h3 className='text-3xl'>Your Blogs</h3>
        <div className="grid-itmes mt-6 !px-[0px]">
        <Blog_Card />
        <Blog_Card />
        <Blog_Card />
        <Blog_Card />
        <Blog_Card />
        </div>
      </div>
    </>
  )
}

export default Profile