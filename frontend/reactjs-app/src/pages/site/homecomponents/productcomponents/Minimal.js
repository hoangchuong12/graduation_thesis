import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';
import { star, starOutline, bagAddOutline, repeatOutline, eyeOutline, heartOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import ProductService from '../../../../services/ProductService';
import { urlImageProduct } from '../../../../config';
import '../../../../assets/styles/minimal.css';

const Minimal = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const productsPerPage = 4;
    const autoScrollInterval = 5000; // 3 seconds

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let result = await ProductService.getAll();
                result = result.filter(product => product.status !== 2);
                const sortedProducts = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setProducts(sortedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTransitioning(true);
            setTimeout(() => {
                setCurrentPage(prevPage => {
                    const nextPage = (prevPage + 1) * productsPerPage >= products.length ? 0 : prevPage + 1;
                    return nextPage;
                });
                setTransitioning(false);
            }, 600);
        }, autoScrollInterval);

        return () => clearInterval(interval);
    }, [products]);

    const handlePrevious = () => {
        setTransitioning(true);
        setTimeout(() => {
            setCurrentPage(prevPage => prevPage === 0 ? Math.floor(products.length / productsPerPage) : prevPage - 1);
            setTransitioning(false);
        }, 600);
    };

    const handleNext = () => {
        setTransitioning(true);
        setTimeout(() => {
            setCurrentPage(prevPage => (prevPage + 1) * productsPerPage >= products.length ? 0 : prevPage + 1);
            setTransitioning(false);
        }, 600);
    };

    const displayedProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);

    return (
        <div className="product-main">
            <h2 className="title">Mặt hàng bán chạy nhất</h2>
            <div className={`product-grid ${transitioning ? 'transitioning' : ''}`}>
                {displayedProducts.map((product, index) => (
                    <ProductShowcase key={product.id} product={product} transitioning={transitioning} />
                ))}
            </div>
            <div className="slider-controls">
                <button onClick={handlePrevious} className="btn-action">
                    <IonIcon icon={chevronBackOutline} style={{ fontSize: '24px' }} />
                </button>
                <button onClick={handleNext} className="btn-action">
                    <IonIcon icon={chevronForwardOutline} style={{ fontSize: '24px' }} />
                </button>
            </div>
        </div>
    );
};

const ProductShowcase = ({ product, transitioning }) => {
    const productImage = product.image ? `${urlImageProduct}/${product.image}` : 'placeholder-image.jpg';

    return (
        <div className={`showcase ${transitioning ? 'showing' : ''}`}>
            <div className="showcase-banner">
                <img src={productImage} className="product-img default" alt="Product" />
                <img src={productImage} width={300} className="product-img hover" alt="Product Hover" />
                <p className="showcase-badge angle black">New Arrival</p>
                <div className="showcase-actions">
                    <button className="btn-action">
                        <IonIcon icon={heartOutline} />
                    </button>
                    <button className="btn-action">
                        <Link to={`/productdetail/${product.id}`}>
                            <IonIcon icon={eyeOutline} />
                        </Link>
                    </button>
                    <button className="btn-action">
                        <IonIcon icon={repeatOutline} />
                    </button>
                    <button className="btn-action">
                        <IonIcon icon={bagAddOutline} />
                    </button>
                </div>
            </div>
            <div className="showcase-content">
                <a href="#" className="showcase-category">{product.category}</a>
                <a href="#">
                    <h3 className="showcase-title">{product.name}</h3>
                </a>
                <a href="#">
                    <h3 className="showcase-title">{product.description}</h3>
                </a>
                <div className="showcase-rating">
                    {Array(product.evaluate).fill().map((_, index) => (
                        <IonIcon key={index} icon={star} />
                    ))}
                    {Array(5 - product.evaluate).fill().map((_, index) => (
                        <IonIcon key={product.evaluate + index} icon={starOutline} />
                    ))}
                </div>
                <div className="price-box">
                    <p className="price">${product.price}</p>
                    <del>${product.previousPrice}</del>
                </div>
            </div>
        </div>
    );
};

export default Minimal;
