import React, { useEffect }  from 'react';
import { HashRouter } from 'react-router-dom'
import { useDispatch } from "react-redux"

import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer"
import Paths from '../components/Paths';


const HomePage = () => {
    /*
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(initializeDotes())
    }, [dispatch])
    */

    return (
        <div className="homepage">
            <HashRouter>
                <NavigationBar />
                <Paths />
                <Footer />
            </HashRouter>
        </div>
    )
}

export default HomePage