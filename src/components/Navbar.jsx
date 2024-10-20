import React from 'react'

export const Navbar = () => {
  return (
    <nav className='flex justify-around bg-purple-700 text-white p-2'>
        <div className="logo font-bold">
            <span>Task Manager</span>
        </div>
        <ul className='flex space-x-4'>
            <li className='hover:font-bold'>Home</li>
            <li className='hover:font-bold'>Tasks</li>
        </ul>
    </nav>
  )
}
