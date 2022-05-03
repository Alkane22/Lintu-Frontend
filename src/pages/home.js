import React from 'react';
import { HashRouter } from 'react-router-dom';

import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer"
import Paths from '../components/Paths';
import CreateHavaintoModal from '../windows/CreateHavainto';
import LoginModal from '../windows/LoginModal';
import NotificationModal from '../windows/NotificationModal';
import { GlobalNotifcation } from '../windows/NotificationModal';


const HomePage = () => {

    return (
        <div className="homepage">
            <HashRouter>
                <NavigationBar />
                <Paths />
                <Footer />
                <CreateHavaintoModal />
                <LoginModal />
                <GlobalNotifcation />
            </HashRouter>
        </div>
    )
}

export default HomePage