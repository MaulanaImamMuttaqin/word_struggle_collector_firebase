import React, { useContext, useEffect, useState } from 'react'
import { UserIcon } from '@heroicons/react/solid'
import { AuthContext } from '../../AuthContext/AuthContextProvider'
function Header() {
    const { username: {
        nameIsSet,
        setNameIsSet,
        name
    } } = useContext(AuthContext)
    const logout = () => {
        let signout = window.confirm("Keluar dari Akun Anda?")
        if (!signout) return;
        setNameIsSet(false)
    }
    return (
        <div className='absolute w-screen h-20 flex items-center text-white justify-end px-10 z-30'>
            {/* <div className='hover:cursor-pointer'>Title</div> */}
            <div id="profile" className='flex items-center gap-5 relative  h-full hover:cursor-pointer'>
                <p>Hello, {name}</p>
                <div className='rounded-full h-12 w-12 center p-1 '>
                    <UserIcon className='h-8 w-8' />
                </div>
                <div id="profile-dropdown" className="backdrop-blur-sm border border-white w-60 h-auto top-[50px] opacity-0 invisible right-0  absolute rounded-lg p-5 transition-all">
                    {/* {
                        nameIsSet &&
                        <div className='mb-5 flex'>
                            <p>Hello, </p>
                            <p className="truncate  font-bold w-68 ">{name}</p>
                        </div>
                    } */}
                    <ul>
                        {/* {
                            AuthState.isLoggedIn &&
                            <>
                                <li className='px-4 py-2 hover:bg-gray-600 hover:text-white hover:cursor-pointer'>Settings</li>
                                <li className='px-4 py-2 hover:bg-gray-600 hover:text-white hover:cursor-pointer'>User</li>
                            </>
                        } */}
                        {
                            nameIsSet &&
                            <li className='px-4 py-2 hover:bg-gray-600 hover:text-white hover:cursor-pointer' onClick={logout}>Sign Out</li>
                            // <li className='px-4 py-2 hover:bg-gray-600 hover:text-white hover:cursor-pointer' onClick={() => navigate('/login')}>Sign In</li>
                        }
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Header