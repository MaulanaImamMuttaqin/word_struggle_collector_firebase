import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, signInWithGoogle } from "../../../firebase";
import { deviceType } from '../../../utils/utils';
import { AuthContext } from '../../AuthContext/AuthContextProvider';
// import { storage } from '../../../utils/storage'

function SetName() {
    // const [regis, setRegis] = useState<boolean>(false)
    // const [name, setName] = useState("")
    // const { name, setName } = useContext(AuthContext)
    const [user, loading, error] = useAuthState(auth)
    const [isDesktop, setIsDesktop] = useState<boolean>(true)
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
    }, [user, loading]);
    useEffect(() => {
        console.log(deviceType())
        if (deviceType() === "desktop") setIsDesktop(true)
        else setIsDesktop(false)
    }, [])
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     props.nameSetter(name, regis)
    // }

    if (!isDesktop) return (
        <div className='absolute h-screen w-screen center z-50 filter backdrop-blur-sm'>
            <div className='h-[250px] w-[700px] border border-blue-800 rounded-lg bg-[#03021c] center flex-col text-white gap-3  px-10 py-5'>
                Aplikasi ini tidak tersedia di perangkat mobile
                mohon gunakan perangkat desktop

            </div>
        </div>
    )
    if (user) return <></>
    return (
        <div className='absolute h-screen w-screen center z-50 filter backdrop-blur-sm'>
            <div className='h-[250px] w-[700px] border border-blue-800 rounded-lg bg-[#03021c] center flex-col text-white gap-3  px-10 py-5'>
                {loading ? <p>Loading...</p>
                    :
                    <>
                        <h1 className='text-xl tracking-widest'>Anda Belum Masuk</h1>
                        <p>Masuk dengan menggunakan akun Google Anda</p>
                        <button onClick={signInWithGoogle} className='bg-blue-600 py-2.5 px-5 rounded-lg hover:bg-blue-500 transition duration-200 uppercase font-bold tracking-wide'>Masuk</button>

                    </>
                }

            </div>
        </div>
    )
}

export default SetName