import React from "react";
import '../../assets/styles/productdetails.css'
import Content from "./ProductDetailes/Content";

import ProductGallery from "./ProductDetailes/ProductGallery";

const ProductDetailes = () => {
    return (
        <>
            <div>
            <ProductGallery></ProductGallery>
            <Content></Content>
            </div>

        </>
    );
};
export default ProductDetailes;