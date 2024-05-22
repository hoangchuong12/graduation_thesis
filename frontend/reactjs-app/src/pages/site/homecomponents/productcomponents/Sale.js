import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';
import { star, starOutline, bagAddOutline, repeatOutline, eyeOutline, heartOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import ProductSaleService from '../../../../services/ProductSaleService';
import { urlImageProduct } from '../../../../config';
import ProductService from '../../../../services/ProductService';
const Sale = () => {
    const [sales, setSales] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        (async () => {
            const result = await ProductSaleService.getAll();
            // Filter out sales with status 2
            const filteredSales = result.filter(sale => sale.status !== 2);
            // Sort the filtered sales array by createdAt property from newest to oldest
            filteredSales.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setSales(filteredSales);
        })();
    }, [reload]);


    return (
        <div className="product-main">
        <h2 className="title">Products Sale</h2>
        <div className="product-grid">

        {sales && sales.length > 0 &&
                            sales.map((sale, index) => (
                                <ProductSaleTableRow key={sale.id} sale={sale}  />
                            ))
                        }
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

    // Handle null image property
    const productImage = product.image ? `${urlImageProduct}/${product.image}` : 'placeholder-image.jpg';

    // Calculate discount percentage
    const discountPercentage = ((product.price - sale.priceSale) / product.price) * 100;

    return (
        <div className="showcase">
            <div className="showcase-banner">
                <img src={productImage} className="product-img default" />
                <img src={urlImageProduct + product.image}  width={300} className="product-img hover" />
                <p className="showcase-badge angle black">sale :{discountPercentage.toFixed(0)}%</p>
                <div className="showcase-actions">
                    <button className="btn-action">
                        <IonIcon icon={heartOutline} />
                    </button>
                    <button className="btn-action">
                    <Link to={'/productdetail/' + product.id}>
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
                    <a href="#" className="showcase-category">{product.name}</a>
                    <a href="#">
                        <h3 className="showcase-title">{product.description}</h3>
                    </a>
                {/* Display product rating */}
                <div className="showcase-rating">
                    {Array(product.evaluate)
                        .fill()
                        .map((_, index) => (
                            <IonIcon key={index} icon={star} />
                        ))}
                    {Array(5 - product.evaluate)
                        .fill()
                        .map((_, index) => (
                            <IonIcon key={product.evaluate + index} icon={starOutline} />
                        ))}
                </div>
                {/* Display product price */}
                <div className="price-box">
                    <p className="price">${sale.priceSale.toFixed(2)}</p>
                    <del>${product.price.toFixed(2)}</del>
                </div>
            </div>
        </div>
    );
};

export default Sale;