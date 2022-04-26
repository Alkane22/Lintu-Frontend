import React from 'react'
import {
    Route,
    Routes,
    useLocation
} from 'react-router-dom'

import TestContent from './TestContent'
import TestContent2 from './TestContent2'
import HomeContent from './HomeContent'
import Login from '../windows/Login'
import Havainnot from './Havainnot'

function Paths() {
    const location = useLocation()
    return (
        <Routes>
            <Route path='/' element={<HomeContent />} />
            <Route path='/havainnot' element={<Havainnot />} />
            <Route path='/linnut' element={<TestContent2 />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

export default Paths