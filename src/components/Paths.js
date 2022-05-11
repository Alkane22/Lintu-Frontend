import React from 'react'
import {
    Route,
    Routes,
    useLocation
} from 'react-router-dom'

import TestContent2 from './TestContent2'
import HomeContent from './HomeContent'
import Havainnot from './Havainnot'
import LeafletMapV2 from './LeafletMapV2'

function Paths() {
    //const location = useLocation()
    return (
        <Routes>
            <Route path='/' element={<HomeContent />} />
            <Route path='/havainnot' element={<Havainnot />} />
        </Routes>
    )
}

export default Paths