import React from "react";
import Banner from "./homecomponents/Banner";
import Category from "./homecomponents/Category";
import Product from "./homecomponents/Product";
import Testimonials from "./homecomponents/Testimonials";
import Blog from "./homecomponents/Blog";

const Home = () => {
    return (
        <>
        <Banner></Banner>
        <Category></Category>
        <Product></Product>
        <Testimonials></Testimonials>
        <Blog></Blog>  
        </>
    );
};
export default Home;