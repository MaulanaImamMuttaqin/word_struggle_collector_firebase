import React, { useEffect, useState } from 'react'
import { storage } from '../../../utils/storage'

function SetName({ ...props }: { nameIsSet: boolean, nameSetter: (name: string) => void }) {

    const [name, setName] = useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        props.nameSetter(name)
    }

    if (props.nameIsSet) return <></>
    return (
        <div className='absolute h-screen w-screen center z-50 filter backdrop-blur-sm'>
            <div className='h- w-[700px] border border-blue-800 rounded-lg bg-[#03021c] center flex-col text-white gap-3  px-10 py-5'>
                <h1 className='text-xl tracking-widest'>It Seem's this is your first time in this website</h1>
                <p className='text-sm'>please enter your username </p>
                <form onSubmit={handleSubmit} className="center flex-col w-full gap-3">
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="h-10 w-1/3 rounded-lg bg-dark-blue text-center focus:outline-blue-900" />
                    <button type='submit' className='px-2.5 py-1 rounded-lg font-bold tracking-widest bg-blue-700 hover:bg-blue-800'>OK</button>
                </form>
            </div>
        </div>
    )
}

export default SetName