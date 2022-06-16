import React, { useContext, useEffect } from 'react'
// import Footer from './Views/Footer'
import Header from './Views/Header'
// import Sidebar from './Views/Sidebar'

function Wrapper({ children }: { children: JSX.Element }) {
    return (
        <div className='h-screen w-screen overflow-hidden bg-dark-blue-gradient' >
            <Header />
            {children}
        </div>
    )
}

export default Wrapper