import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, signInWithGoogle } from "../../../firebase";
// import { storage } from '../../../utils/storage'

function SetName({ ...props }: { name: string | null, setName: Dispatch<SetStateAction<string | null>> }) {
    const [user, loading, error] = useAuthState(auth)

    if (user) return <></>
    return (
        <div className='absolute h-screen w-screen center z-50 filter backdrop-blur-sm'>
            <div className='h-[250px] w-[700px] border border-blue-800 rounded-lg bg-[#03021c] center flex-col text-white gap-3  px-10 py-5'>

                <h1 className='text-xl tracking-widest'>Anda Belum Masuk</h1>
                <p>Masuk dengan menggunakan akun Google Anda</p>
                <button onClick={signInWithGoogle} className='bg-blue-600 py-2.5 px-5 rounded-lg hover:bg-blue-500 transition duration-200 uppercase font-bold tracking-wide'>Masuk</button>
                {loading && <p>Loading...</p>}
            </div>
        </div>
    )
}

export default SetName