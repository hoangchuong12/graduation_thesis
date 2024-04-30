import React from 'react';
import Sidebar from './productcomponents/Sidebar';
import Minimal from './productcomponents/Minimal';
import Featured from './productcomponents/Featured';
import Grid from './productcomponents/Grid';

const Product = () => {
    return (
        <div className="product-container">
        <div className="container">
            {/*
            - SIDEBAR
            */}
            <Sidebar></Sidebar>
            <div className="product-box">
            {/*
                - PRODUCT MINIMAL
            */}
            <Minimal></Minimal>
  
            {/*
                - PRODUCT FEATURED
            */}
            <Featured></Featured>
            {/*
                - PRODUCT GRID
            */}
            <Grid></Grid>
            </div>
        </div>
        </div>

    );
};

export default Product;