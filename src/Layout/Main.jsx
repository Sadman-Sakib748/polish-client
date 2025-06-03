import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Shared/Navbar';
import Footer from '../Component/Shared/Footer/Footer';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;