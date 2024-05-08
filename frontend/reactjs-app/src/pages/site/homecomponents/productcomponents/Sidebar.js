import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import bag from '../../../../assets/images/icons/bag.svg'
import glasses from '../../../../assets/images/icons/glasses.svg'
import cosmetics from '../../../../assets/images/icons/cosmetics.svg'
import perfume from '../../../../assets/images/icons/perfume.svg'
import jewelry from '../../../../assets/images/icons/jewelry.svg'
import shoes from '../../../../assets/images/icons/shoes.svg'
import dress from '../../../../assets/images/icons/dress.svg'
import { IonIcon } from '@ionic/react';
import { closeOutline, addOutline, removeOutline, star, starHalfOutline } from 'ionicons/icons';
import CategoryService from '../../../../services/CategoryService';
import BrandService from '../../../../services/BrandService';
import { urlImageCategory } from '../../../../config';


const Sidebar = () => {

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                let result = await CategoryService.getAll();
                const sortedCategories = result.filter(category => category.status !== 0 && category.status !== 2);
                setCategories(sortedCategories);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        const fetchBrands = async () => {
            try {
                let result = await BrandService.getAll();
                const sortedbrands = result.filter(brand => brand.status !== 0 && brand.status !== 2);
                setBrands(sortedbrands);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        fetchBrands();
        fetchCategories();
    }, [reload]);


    const renderCategories = () => {
        if (!brands) {
            return <div>Loading brands...</div>;
        }

        return categories.map(category => (
            <li key={category.id} className="dropdown-item">
                <button className="sidebar-accordion-menu" data-accordion-btn>
                    <div className="menu-title-flex">
                        {/* {category.image ? (
                            <img src={urlImageCategory + category.image} className="menu-title-img" alt="Hinh anh" />
                        ) : (
                            <p>Không có ảnh</p>
                        )} */}
                        <p className="menu-title">{category.name}</p>
                    </div>
                    <div>
                        <IonIcon icon={addOutline} className="add-icon" />
                    </div>
                </button>
            </li>
        ));
    };

    return (
        <div className="sidebar  has-scrollbar" data-mobile-menu>
            <div className="sidebar-category">
                <div className="sidebar-top">
                    <h2 className="sidebar-title">Category</h2>
                    <button className="sidebar-close-btn" data-mobile-menu-close-btn>
                        <IonIcon icon={closeOutline} />
                    </button>
                </div>
                <ul className="sidebar-menu-category-list">
                    {renderCategories()}

                </ul>
            </div>
            <div className="product-showcase">
                <h3 className="showcase-heading">best sellers</h3>
                <div className="showcase-wrapper">
                    <div className="showcase-container">
                        <div className="showcase">
                            <a href="#" className="showcase-img-box">
                                <img src={require("../../../../assets/images/products/1.jpg")} alt="baby fabric shoes" width={75} height={75} className="showcase-img" />
                            </a>
                            <div className="showcase-content">
                                <a href="#">
                                    <h4 className="showcase-title">baby fabric shoes</h4>
                                </a>
                                <div className="showcase-rating">
                                    <IonIcon icon={star} />
                                    <IonIcon icon={star} />
                                    <IonIcon icon={star} />
                                    <IonIcon icon={star} />
                                    <IonIcon icon={star} />
                                </div>
                                <div className="price-box">
                                    <del>$5.00</del>
                                    <p className="price">$4.00</p>
                                </div>
                            </div>
                        </div>
                        <div className="showcase">
                            <a href="#" className="showcase-img-box">
                                <img src={require("../../../../assets/images/products/2.jpg")} alt="men's hoodies t-shirt" className="showcase-img" width={75} height={75} />
                            </a>
                            <div className="showcase-content">
                                <a href="#">
                                    <h4 className="showcase-title">men's hoodies t-shirt</h4>
                                </a>
                                <div className="showcase-rating">
                                    <IonIcon icon={star} />
                                    <IonIcon icon={star} />
                                    <IonIcon icon={star} />
                                    <IonIcon icon={star} />
                                    <IonIcon icon={starHalfOutline} />
                                </div>
                                <div className="price-box">
                                    <del>$17.00</del>
                                    <p className="price">$7.00</p>
                                </div>
                            </div>
                        </div>
                        <div className="showcase">
                            <a href="#" className="showcase-img-box">
                                <img src={require("../../../../assets/images/products/3.jpg")} alt="girls t-shirt" className="showcase-img" width={75} height={75} />
                            </a>
                            <div className="showcase-content">
                                <a href="#">
                                    <h4 className="showcase-title">girls t-shirt</h4>
                                </a>
                                <div className="showcase-rating">
                                    <IonIcon icon={star} />
                                    <IonIcon icon={star} />
                                    <IonIcon icon={star} />
                                    <IonIcon icon={star} />
                                    <IonIcon icon={starHalfOutline} />
                                </div>
                                <div className="price-box">
                                    <del>$5.00</del>
                                    <p className="price">$3.00</p>
                                </div>
                            </div>
                        </div>
                        <div className="showcase">
                            <a href="#" className="showcase-img-box">
                                <img src={require("../../../../assets/images/products/4.jpg")} alt="woolen hat for men" className="showcase-img" width={75} height={75} />
                            </a>
                            <div className="showcase-content">
                                <a href="#">
                                    <h4 className="showcase-title">woolen hat for men</h4>
                                </a>
                                <div className="showcase-rating">
                                    <IonIcon icon={star} />
                                    <IonIcon icon={star} />
                                    <IonIcon icon={star} />
                                    <IonIcon icon={star} />
                                    <IonIcon icon={star} />
                                </div>
                                <div className="price-box">
                                    <del>$15.00</del>
                                    <p className="price">$12.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Sidebar;