import React from 'react'
import havaintos from '../services/havaintoService'
import { useState } from 'react'

const Havainnot = () => {
    const getEm = havaintos.getHavainnot()
    

    return (
        <div>Havainnot</div>
    )
}

export default Havainnot