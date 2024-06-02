import React, { useState, useEffect } from "react";
import '../../assets/styles/productdetails.css'
import Content from "./ProductDetailes/Content";
import ProductGallery from "./ProductDetailes/ProductGallery";

const ProductDetailes = () => {
    const [isGalleryLoaded, setIsGalleryLoaded] = useState(false);

    useEffect(() => {
        // Simulate an event when the ProductGallery is loaded
        const timer = setTimeout(() => {
            setIsGalleryLoaded(true);
        }, 1000); // Adjust the timing as needed

        return () => clearTimeout(timer); // Cleanup the timer
    }, []);

    return (
        <>
            <div>
                <ProductGallery onLoad={() => setIsGalleryLoaded(true)} />
                {isGalleryLoaded && <Content />}
            </div>
        </>
    );
};
export default ProductDetailes;
