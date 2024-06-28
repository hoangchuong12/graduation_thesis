import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { star, starOutline } from 'ionicons/icons';
import ProductService from '../../services/ProductService';
import FavoriteService from '../../services/FavoriteService';
import ProductSaleService from '../../services/ProductSaleService';
import { urlImageProduct } from '../../config';
import ReactPaginate from 'react-paginate';
import '../../assets/styles/favoriteProduct.css';
import { useParams, useNavigate } from 'react-router-dom';

const FavoriteProduct = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [favorites, setFavorites] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate(); 
    const productsPerPage = 5;

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const getFavorites = await FavoriteService.getByUser(user.userId);
                if (getFavorites) {
                    setFavorites(getFavorites);
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [user.userId]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productPromises = favorites.map(async favorite => {
                    const product = await ProductService.getById(favorite.productId);
                    let saleInfo = await ProductSaleService.getByProduct(product.id);
                    saleInfo = saleInfo.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    const newestSaleInfo = saleInfo[0];
                    return { ...product, saleInfo: newestSaleInfo };
                });
                const products = await Promise.all(productPromises);
                setProducts(products);
            } catch (error) {
                if (error.response && error.response.status === 503) {
                    // Nếu lỗi có mã trạng thái 503, điều hướng người dùng đến trang 404
                    navigate('/404');
                } else {
                    // Nếu là các lỗi khác, in ra console để debug
                    console.error("Error fetching data:", error);
                }
            }
        };

        if (favorites.length > 0) {
            fetchProducts();
        }
    }, [favorites]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const indexOfLastProduct = (currentPage + 1) * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <div className="container py-5">
                <div className="d-flex justify-content-center mb-5">
                    <h1 className="fw-bold mb-0 text-black">Sản phẩm yêu thích</h1>
                </div>
                {currentProducts.map((product, index) => (
                    <div key={index} className="row justify-content-center mb-3">
                        <div className="col-md-12 col-xl-10">
                            <div className="card shadow-0 border rounded-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                                <img
                                                    src={urlImageProduct + product.image}
                                                    className="w-100"
                                                    alt={product.name}
                                                />
                                                <a href="#!">
                                                    <div className="hover-overlay">
                                                        <div
                                                            className="mask"
                                                            style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }}
                                                        ></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-xl-6">
                                            <h5>{product.name}</h5>
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
                                            <p className="text-truncate mb-4 mb-md-0">
                                                {product.description}
                                            </p>
                                        </div>
                                        <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                            <div className="d-flex flex-row align-items-center mb-1">
                                                {product.saleInfo ? (
                                                    <>
                                                        <h4 className="mb-1 me-1">{product.saleInfo.priceSale} VND</h4>
                                                        <span className="text-danger">
                                                            <s>{product.price} VND</s>
                                                        </span>
                                                    </>
                                                ) : (
                                                    <h4 className="mb-1 me-1">${product.price}</h4>
                                                )}
                                            </div>
                                            <div className="d-flex flex-column mt-4">
                                                <button
                                                    data-mdb-button-init
                                                    data-mdb-ripple-init
                                                    className="btn btn-primary btn-sm"
                                                    type="button"
                                                >
                                                    Chi tiết
                                                </button>
                                                <button
                                                    data-mdb-button-init
                                                    data-mdb-ripple-init
                                                    className="btn btn-outline-primary btn-sm mt-2"
                                                    type="button"
                                                >
                                                    Thêm vào giỏ hàng
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <ReactPaginate
                    previousLabel={'Trang trước'}
                    nextLabel={'Trang sau'}
                    pageCount={Math.ceil(products.length / productsPerPage)}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    previousLinkClassName={'pagination__link'}
                    nextLinkClassName={'pagination__link'}
                    disabledClassName={'pagination__link--disabled'}
                    activeClassName={'pagination__link--active'}
                />
            </div>
        </section>
    );
};

export default FavoriteProduct;
