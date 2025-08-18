import React from 'react'
import no_mobile from '../assets/no-mobile.png'
import back from '../assets/arrow-right.png'

const NoMobileView = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#2C2C2C] text-center p-6">
      <div className="bg-[#1E1E1E] text-white rounded-2xl p-8 shadow-lg max-w-md">
        <img src={no_mobile} alt="" />
        <h1 className="text-2xl font-bold mb-4">Mobile Not Supported</h1>
        <p className="text-gray-300">
          Please login through a <span className="font-semibold text-white">Laptop / PC </span> 
          to access this feature.
        </p>
      </div>
    </div>
  )
}

export default NoMobileView