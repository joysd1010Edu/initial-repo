import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Pages/Shareds/Header';
import NavBar from '../Pages/Shareds/NavBar';
import Footer from '../Pages/Shareds/Footer';

const Layout = () => {
    return (
        <div className=' bg-white text-black'>
            <Header/>
            <NavBar/>
            <Outlet/>
            <Footer/>

        </div>
    );
};

export default Layout;