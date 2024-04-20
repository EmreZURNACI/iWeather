import React from 'react'
import logo from '../Services/ImageService/Images/Logo.png'
import { useNavigate } from 'react-router-dom'
function Logo() {
  const navigate = useNavigate();
  return (
    <div className='flex'>
      <img src={logo} alt="Logo" onClick={() => navigate("/")} />
    </div>
  )
}

export default Logo