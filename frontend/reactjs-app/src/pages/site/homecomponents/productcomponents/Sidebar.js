import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';
import { closeOutline, addOutline, removeOutline } from 'ionicons/icons';
import CategoryService from '../../../../services/CategoryService';
import ProductService from '../../../../services/ProductService';
import ProductSaleService from '../../../../services/ProductSaleService';
import { urlImageProduct } from '../../../../config';

const Sidebar = () => {
    const [categories, setCategories] = useState([]);
    const [sales, setSales] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await CategoryService.getAll();
                const activeCategories = categoriesData.filter(category => category.status === 1);
                setCategories(activeCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchSales = async () => {
            try {
                const salesData = await ProductSaleService.getAll();
                const filteredSales = salesData.filter(sale => sale.status !== 2);
                const salesWithProductDetails = await Promise.all(filteredSales.map(async sale => {
                    const product = await ProductService.getById(sale.productId);
                    return {
                        ...sale,
                        productName: product.name,
                        discount: ((product.price - sale.priceSale) / product.price) * 100
                    };
                }));
                filteredSales.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setSales(salesWithProductDetails);
            } catch (error) {
                console.error("Error fetching sales:", error);
            }
        };

        fetchCategories();
        fetchSales();
    }, []);

    const toggleCategory = (categoryId) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    return (
        <div className="sidebar has-scrollbar p-3" data-mobile-menu>
            <div className="sidebar-category mb-4">
                <div className="sidebar-top d-flex justify-content-between align-items-center mb-2">
                    <h2 className="sidebar-title">Thể loại</h2>
                    <button className="btn sidebar-close-btn" data-mobile-menu-close-btn>
                        <IonIcon icon={closeOutline} />
                    </button>
                </div>
                <ul className="sidebar-menu-category-list">
                    {categories.map(category => (
                        <div key={category.id} className="mb-3">
                            <button className={`btn btn-toggle d-flex justify-content-between align-items-center rounded collapsed  menu-title-flex ${expandedCategory === category.id ? 'active' : ''}`} onClick={() => toggleCategory(category.id)}>
                                <div className="menu-title-flex">{category.name}</div>
                                <div className="add-icon ">
                                    <IonIcon icon={expandedCategory === category.id ? removeOutline : addOutline} />
                                </div>
                                
                            </button>
                            {expandedCategory === category.id && (
                                <div className="bg-white p-2">
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        {category.subCategories && category.subCategories.map(subCategory => (
                                            <li key={subCategory.id}><a href="#" className="link-dark rounded">{subCategory.name}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </ul>
            </div>
            <div className="product-showcase">
                <h3 className="showcase-heading mb-2">giảm giá</h3>
                <div className="showcase-wrapper">
                    {sales.map((sale) => (
                        <ProductSaleTableRow key={sale.id} sale={sale} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProductSaleTableRow = ({ sale }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await ProductService.getById(sale.productId);
                setProduct(fetchedProduct);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [sale.productId]);

    if (!product) {
        return <div>Loading...</div>; // Or any loading indicator you prefer
    }

    const productImage = product.image ? `${urlImageProduct}/${product.image}` : 'placeholder-image.jpg';
    const discountPercentage = ((product.price - sale.priceSale) / product.price) * 100;

    return (
        <div className="showcase mb-3">
                 <Link to={'/productdetail/' + product.id} className="showcase-img-box">
                <img src={productImage} alt={sale.productName} width={75} height={75} className="showcase-img" />
                </Link>
            <div className="showcase-content">
            <Link to={'/productdetail/' + product.id}>
                    <h4 className="showcase-title">{sale.productName}</h4>
            </Link>
                <div className="price-box">
                    <del>${product.price.toFixed(2)}</del>
                    <p className="price">${sale.priceSale.toFixed(2)} </p>
                    
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
