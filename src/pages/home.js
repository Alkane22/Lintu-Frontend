import React, { useEffect }  from 'react';
import { HashRouter } from 'react-router-dom'
import { useDispatch } from "react-redux"

import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer"
import Paths from '../components/Paths';
import CreateHavaintoModal from '../windows/CreateHavainto';
import LoginModal from '../windows/LoginModal';


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
                <CreateHavaintoModal />
                <LoginModal />
            </HashRouter>
        </div>
    )
}

export default HomePage