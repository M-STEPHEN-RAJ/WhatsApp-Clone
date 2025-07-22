import React from 'react'
import profile from '../assets/profile.jpg'
import camera from '../assets/camera.png'
import edit from '../assets/edit.svg'

const Profile = () => {
  return (
    <div className='bg-white/5 ml-[4.2%] h-screen flex justify-center items-center'>

        <div className="h-[590px] flex flex-col justify-center items-center gap-5 px-12 bg-white/5 rounded-xl backdrop-blur-md border border-white/20 shadow-lg z-10">

            <h2 className='mb-3 text-white font-semibold text-2xl'>Profile Details</h2>

            <div className="relative">
                <img className='rounded-full w-28' src={profile} alt="" />
                <div className="absolute bottom-0 right-0 p-2 rounded-full bg-[#282828] cursor-pointer">
                    <img className='w-5' src={camera} alt="" />
                </div>
            </div>

            <div className="flex justify-between items-center w-[400px]">
                <h2 className='text-white font-semibold text-xl'>M STEPHEN RAJ</h2>
                <div className="hover:bg-white/20 rounded-full w-fit p-2 cursor-pointer">
                    <img className='w-4' src={edit} alt="" />
                </div>
            </div>

            <div className="flex flex-col gap-2 w-[400px]">
                <p className='text-gray-300 text-sm'>E-mail</p>
                <h2 className='text-white'>stephenrajm.ug22.ad@francisxavier.ac.in</h2>
            </div>

            <div className="flex flex-col gap-2 w-[400px] h-40">
                <div className="flex justify-between items-center">
                    <p className='text-gray-300 text-sm'>About</p>
                    <div className="hover:bg-white/20 rounded-full w-fit p-2 cursor-pointer">
                        <img className='w-4' src={edit} alt="" />
                    </div>                
                </div>
                <textarea className='w-full px-3 py-2 rounded-md border border-white/20 border-b-[#14C861] text-white resize-none outline-none' rows={4}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, earum.
                </textarea>
            </div>

            <div className="flex justify-between items-center gap-20 mt-2">
                <button className='text-sm text-white bg-white/10 hover:bg-white/20 px-10 py-2 rounded-md cursor-pointer'>Cancel</button>
                <button className='text-sm bg-[#14C861] hover:bg-[#14D261] px-10 py-2 rounded-md font-medium cursor-pointer'>Save</button>
            </div>

        </div>

        <div className="relative -left-1.5 bg-[#2A2A2A] flex flex-col justify-center items-center gap-10 w-[520px] h-[590px] border border-white/20 border-l-transparent rounded-r-xl">

            <p>Modify your personal details here</p>

        </div>

    </div>
  )
}

export default Profile