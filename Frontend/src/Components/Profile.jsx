import React, { useContext, useState } from 'react'
import profile from '../assets/profile.jpg'
import default_profile from '../assets/default-profile.png'
import camera from '../assets/camera.png'
import edit from '../assets/edit.svg'
import tick from '../assets/tick.svg'
import update_profile from '../assets/update-profile.png'
import { AuthContext } from '../Context/AuthContext'

const Profile = () => {

    const { authUser, updateProfile } = useContext(AuthContext);

    const [selectedImg, setSelectedImg] = useState(null);
    const [name, setName] = useState(authUser.fullName);
    const [bio, setBio] = useState(authUser.bio);

    const [editName, setEditName] = useState(false);
    const [editBio, setEditBio] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(!selectedImg) {
            await updateProfile({fullName : name, bio});
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(selectedImg);
        reader.onload = async () => {
            const base64Image = reader.result;
            await updateProfile({ profilePic : base64Image, fullName : name, bio })
        }

    }

    const handleCancel = () => {

        setSelectedImg(null);
        setName(authUser.fullName);
        setBio(authUser.bio);

    };

  return (
    <div className='bg-white/5 ml-[4.2%] h-screen flex justify-center items-center'>

        <div className="h-[590px] flex flex-col justify-center items-center gap-5 px-12 bg-white/5 rounded-xl backdrop-blur-md border border-white/20 shadow-lg z-10">

            <h2 className='mb-3 text-white font-semibold text-2xl'>Profile</h2>

            <label htmlFor='avatar' className="relative cursor-pointer">
                <input onChange={(e) => setSelectedImg(e.target.files[0])} type="file" name="avatar" id="avatar" accept='.png, .jpg, .jpeg' hidden />
                <img 
                 className='rounded-full w-28' 
                 src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || default_profile} 
                 alt="" 
                />
                <div className="absolute bottom-0 right-0 p-2 rounded-full bg-[#282828] cursor-pointer">
                    <img className='w-5' src={camera} alt="" />
                </div>
            </label>

            <div className="flex justify-between gap-5 items-center w-[400px]">

                {editName ? (
                    <input 
                     type="text" 
                     className='border-b border-b-[#14C861] w-full outline-none text-white font-semibold text-xl' 
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     autoFocus
                    />
                  ) : (

                    <h2 
                    className='text-white font-semibold text-xl'
                    >
                        {name}
                    </h2>
                  )
                }

                <div 
                 className="hover:bg-white/20 rounded-full w-fit p-2 cursor-pointer"
                 onClick={() => setEditName(!editName)}
                >
                    <img className='w-4' src={editName ? tick : edit} alt="" />
                </div>
            </div>
            
            <div className="flex flex-col gap-2 w-[400px]">
                <p className='text-gray-300 text-sm'>E-mail</p>
                <h2 className='text-white'>stephenrajm.ug22.ad@francisxavier.ac.in</h2>
            </div>

            <div className="flex flex-col gap-2 w-[400px] h-40">
                <div className="flex justify-between items-center">
                    <p className='text-gray-300 text-sm'>About</p>
                    <div 
                     className="hover:bg-white/20 rounded-full w-fit p-2 cursor-pointer"
                     onClick={() => setEditBio(!editBio)}
                    >
                        <img className='w-4' src={editBio ? tick : edit} alt="" />
                    </div>                
                </div>
                {editBio ? (

                    <textarea 
                     className='w-full px-3 py-2 rounded-md border border-white/20 border-b-[#14C861] text-white resize-none outline-none' rows={4}
                     onChange={(e) => setBio(e.target.value)}
                     value={bio}
                     autoFocus
                    >
                    </textarea>

                  ) : (
                    <p className='text-white'>{ bio }</p>
                  )
                }                

            </div>

            <div className="flex justify-between items-center gap-20 mt-2">
                <button onClick={handleCancel} className='text-sm text-white bg-white/10 hover:bg-white/20 px-10 py-2 rounded-md cursor-pointer'>Cancel</button>
                <button onClick={handleSubmit} className='text-sm bg-[#14C861] hover:bg-[#14D261] px-10 py-2 rounded-md font-medium cursor-pointer'>Save</button>
            </div>

        </div>

        <div className="relative -left-1.5 bg-[#2A2A2A] flex flex-col justify-center items-center gap-10 w-[520px] h-[590px] border border-white/20 border-l-transparent rounded-r-xl">

            <img className='w-80' src={update_profile} alt="" />

            <h2 className='mb-3 text-white font-semibold text-2xl'>Personalize Your Chat Experience</h2>

        </div>

    </div>
  )
}

export default Profile