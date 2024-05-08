import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faShoppingCart, faShoppingBasket, faHeart, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import ProductGallaryService from '../../../services/ProductGallaryService';
import { urlImageProductGallary } from '../../../config';
import ProductOptionService from '../../../services/ProductOptionService';
import ProductService from '../../../services/ProductService';
import ProductSaleService from '../../../services/ProductSaleService';
import { star, starOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const ProductGallery = () => {
    const { id } = useParams();
    const [galleries, setGalleries] = useState([]);
    const [options, setOptions] = useState([]);
    const [mainImage, setMainImage] = useState('');
    const [activeOptionId, setActiveOptionId] = useState(null);
    const [product, setProduct] = useState(null);
    const [sale, setSale] = useState(null);
    const [isSaleActive, setIsSaleActive] = useState(false);
    const [priceToDisplay, setPriceToDisplay] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const galleryResults = await ProductGallaryService.getByProductId(id);
                if (galleryResults && galleryResults.length > 0) {
                    setGalleries(galleryResults);
                    setMainImage(galleryResults[0].image);
                }
                
                const optionsResults = await ProductOptionService.getByProductId(id);
                if (optionsResults) {
                    setOptions(optionsResults);
                }
                
                const productData = await ProductService.getById(id);
                if (productData) {
                    setProduct(productData);
                }
                
                const sales = await ProductSaleService.getByProductId(id);
                if (sales.length === 0 && productData) {
                    // No sales found, use the regular price from product data
                    setPriceToDisplay(productData.price);
                } else {
                    const now = new Date();
                    const currentSale = sales.find(sale => new Date(sale.dateBegin) <= now && now <= new Date(sale.dateEnd));
                    if (currentSale) {
                        setSale(currentSale);
                        setIsSaleActive(true);
                        setPriceToDisplay(currentSale.priceSale);  // Set the sale price
                    } else {
                        // No active sale, use the regular product price
                        setPriceToDisplay(productData.price);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [id]);
    if (!product) {
        return <div>Loading...</div>; // Or any loading indicator you prefer
    }
    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };

    const toggleOptionVisibility = (optionId) => {
        setActiveOptionId(prevState => prevState === optionId ? null : optionId);
    };

    const handleValueClick = (value) => {
        console.log("Selected value:", value);
    }


    return (
        <section className="py-5">
            <div className="container">
                <div className="row gx-5">
                    <aside className="col-lg-6">
                        <div className="border rounded-4 mb-3 d-flex justify-content-center">
                            <a data-fslightbox="mygallery" className="rounded-4" target="_blank" data-type="image">
                                <img style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }} src={urlImageProductGallary + mainImage} alt="Main Product" />
                            </a>
                        </div>
                        <div className="d-flex justify-content-center mb-3">
                            {galleries.map((gallery, index) => (
                                <a key={index} data-fslightbox="mygallery" className="border mx-1 rounded-2" target="_blank" data-type="image" href={gallery.image}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleThumbnailClick(gallery.image);
                                    }}>
                                    <img width={80} height={80} src={urlImageProductGallary + gallery.image} alt={`Thumbnail ${index + 1}`} />
                                </a>
                            ))}
                        </div>
                    </aside>
                    <main className="col-lg-6">
                        <div className="ps-lg-3">
                            <h4 className="title text-dark">{product.name}</h4>
                            <div className="d-flex flex-row my-3">
                                <div className="text-warning mb-1 me-2">
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStarHalfAlt} />
                                    <span className="ms-1">4.5</span>
                                </div>
                                <span className="text-muted"><FontAwesomeIcon icon={faShoppingBasket} className="fa-sm mx-1" />154 orders</span>
                                <span className="text-success ms-2">In stock</span>
                            </div>
                            <div className="mb-3">
                                <span className="h5">${priceToDisplay}</span>
                                <span className="text-muted">/per box</span>
                            </div>
                            <div className="product-detail">
                                <p>{priceToDisplay}</p>
                            </div>
                            <p>{product.description}</p>
                            <main className="col-lg-6">

                                {/* Product details and options logic here */}
                                <div className="product-options" style={{ margin: '10px 0', padding: '10px' }}>
                                    <h2>Product Options</h2>
                                    {options.length > 0 ? options.map((option) => (
                                        <div key={option.id} className="option-container d-flex flex-column gap-1" style={{ padding: '5px' }}>
                                            <button className="btn btn-light w-100 text-start" style={{ marginBottom: '5px' }} onClick={() => toggleOptionVisibility(option.id)}>
                                                {option.name}:
                                            </button>
                                            {activeOptionId === option.id && (
                                                <ul className="option-values d-flex flex-wrap list-unstyled gap-1 mb-0" style={{ padding: '5px', margin: '0' }}>
                                                    {option.values.map(value => (
                                                        <li key={value.id} className="option-item" style={{ padding: '2px' }}>
                                                            <button className="btn btn-light" onClick={() => handleValueClick(value.value)}>
                                                                {value.value}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )) : <p>No options available for this product.</p>}
                                </div>
                            </main>
                            <hr />
                            <div className="row mb-4">
                                <div className="col-md-4 col-6">
                                    <label className="mb-2">Size</label>
                                    <select className="form-select border border-secondary" style={{ height: 35 }}>
                                        <option>Small</option>
                                        <option>Medium</option>
                                        <option>Large</option>
                                    </select>
                                </div>
                                <div className="col-md-4 col-6 mb-3">
                                    <label className="mb-2 d-block">Quantity</label>
                                    <div className="input-group mb-3" style={{ width: 170 }}>
                                        <button className="btn btn-white border border-secondary px-3" type="button">
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <input type="text" className="form-control text-center border border-secondary" placeholder="1" aria-label="Example text with button addon" />
                                        <button className="btn btn-white border border-secondary px-3" type="button">
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <a href="#" className="btn btn-warning shadow-0">
                                    <FontAwesomeIcon icon={faShoppingCart} /> Buy now
                                </a>
                                <a href="#" className="btn btn-primary shadow-0">
                                    <FontAwesomeIcon icon={faShoppingBasket} /> Add to cart
                                </a>
                                <a href="#" className="btn btn-light border border-secondary py-2 icon-hover px-3">
                                    <FontAwesomeIcon icon={faHeart} /> Save
                                </a>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </section>
    );
};

export default ProductGallery;