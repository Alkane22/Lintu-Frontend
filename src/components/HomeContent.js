import React from 'react'
import birdsInfo from '../imgs/linnut.webp'

function HomeContent() {
    return (
        <div className="row justify-content-md-center">
            <h1>Home content</h1>
            <img src={birdsInfo} alt='' />
        </div>
    )
}

export default HomeContent