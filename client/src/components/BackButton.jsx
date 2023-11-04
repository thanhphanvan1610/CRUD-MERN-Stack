import React from 'react'
import { Link } from 'react-router-dom';
const BackButton = ({destination = '/'}) => {
    
  return (
    <div className='flex'>
        <Link to={destination} className='bg-slate-500 text-white px-4 py-1 rounded-lg w-fit'>
            Home
        </Link>
      
    </div>
  )
}

export default BackButton
