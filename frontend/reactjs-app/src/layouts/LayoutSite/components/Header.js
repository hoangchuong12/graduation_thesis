import React, { useState, useEffect } from 'react';
import IonIcon from '@reacticons/ionicons';
import logo from '../../../assets/images/logo/logo.svg';
import Menu from '../../../pages/site/header/menu';
import '../../../assets/styles/searchResult.css';
import { useNavigate } from 'react-router-dom';
import ProductService from '../../../services/ProductService';
import OrderService from '../../../services/OrderService';
import OrderItemService from '../../../services/OrderItemService';
import FavoriteService from '../../../services/FavoriteService'; // Import FavoriteService
import { urlImageProduct } from '../../../config';

export default function Header() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [favoriteItemCount, setFavoriteItemCount] = useState(0); // State để lưu số lượng sản phẩm yêu thích

    useEffect(() => {
        // Hàm này sẽ được gọi mỗi khi searchTerm thay đổi
        const fetchSearchResults = async () => {
            try {
                if (searchTerm.trim() !== "") {
                    const results = await ProductService.search(searchTerm);
                    setSearchResults(results);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchSearchResults();
    }, [searchTerm]);

    useEffect(() => {
        // Hàm này sẽ được gọi mỗi khi component được render lại
        const fetchCartItemCount = async () => {
            try {
                const user = JSON.parse(sessionStorage.getItem('user'));
                if (!user) return;
                const cart = await OrderService.getCart(user.userId);
                if (!cart) return;
                const cartItems = await OrderItemService.getByOrder(cart.id);
                if (cartItems) {
                    setCartItemCount(cartItems.length);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItemCount();
    }, []);

    useEffect(() => {
        // Hàm này sẽ được gọi mỗi khi component được render lại
        const fetchFavoriteItemCount = async () => {
            try {
                const user = JSON.parse(sessionStorage.getItem('user'));
                if (!user) return;
                const favorites = await FavoriteService.getByUser(user.userId);
                if (favorites) {
                    setFavoriteItemCount(favorites.length); // Cập nhật số lượng sản phẩm yêu thích
                }
            } catch (error) {
                console.error('Error fetching favorite items:', error);
            }
        };

        fetchFavoriteItemCount();
    }, []);

    const handleGoToMyUserClick = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            navigate("/login", { state: { redirectTo: `/user` } });
            return;
        }
        navigate("/user");
    };

    const handleGoToCartClick = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            navigate("/login", { state: { redirectTo: `/card` } });
            return;
        }
        navigate("/card");
    };

    const handleGoToFavoriteClick = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            navigate("/login", { state: { redirectTo: `/favorite` } });
            return;
        }
        navigate("/favorite");
    };

    const handleSearchInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
    };

    const handleSearchItemClick = (productId) => {
        navigate(`/productdetail/${productId}`);
        setSearchTerm("");
    };

    return (
        <>
            <header>
                <div className="header-main">
                    <div className="container">
                        <a href="/" className="header-logo">
                            <img src={logo} alt="Anon's logo" width="120" height="36" />
                        </a>

                        <div className="header-search-container">
                            <input
                                type="search"
                                name="search"
                                className="search-field"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                            />
                            <button className="search-btn">
                                <IonIcon name="search-outline" role="img" className="md hydrated" aria-label="search outline"></IonIcon>
                            </button>

                            {searchResults.length > 0 && (
                                <div className="search-results">
                                    {searchResults.slice(0, 8).map((product) => (
                                        <div
                                            key={product.id}
                                            className="search-result-item"
                                            onClick={() => handleSearchItemClick(product.id)}
                                        >
                                            <img src={urlImageProduct + product.image} alt='HinhAnh' />
                                            <div>
                                                <h5>{product.name}</h5>
                                                <p>{product.description}</p>
                                            </div>
                                            <div className="product-price">
                                                <span>{product.price} VND</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="header-user-actions">
                            <button className="action-btn" onClick={handleGoToMyUserClick}>
                                <IonIcon name="person-outline" role="img" className="md hydrated" aria-label="person outline"></IonIcon>
                            </button>

                            <button className="action-btn" onClick={handleGoToFavoriteClick}>
                                <IonIcon name="heart-outline" role="img" className="md hydrated" aria-label="heart outline"></IonIcon>
                                <span className="count">{favoriteItemCount}</span> {/* Hiển thị số lượng sản phẩm yêu thích */}
                            </button>

                            <button className="action-btn" onClick={handleGoToCartClick}>
                                <IonIcon name="bag-handle-outline" role="img" className="md hydrated" aria-label="bag handle outline"></IonIcon>
                                <span className="count">{cartItemCount}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <nav className="desktop-navigation-menu">
                    <div className="container">
                        <Menu />
                    </div>
                </nav>
            </header>
        </>
    );
}
