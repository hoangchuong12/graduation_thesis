import React from 'react';
import '../../assets/styles/style-prefix.css';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';


const LayoutSite = () => {
    
    return (
            <div>
                <Header />
                <Outlet />
                <Footer />
            </div>
    );
};

export default LayoutSite;