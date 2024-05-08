import React from 'react';
import IonIcon from '@reacticons/ionicons';
import logo from '../../../assets/images/logo/logo.svg'
import Menu from '../../../pages/site/header/menu';

export default function Header() {
    return (
        <>
            <header>

                <div className="header-top">
                    <div className="container">
                        <ul className="header-social-container">
                            <li>
                                <a href="#tag" className="social-link">
                                    <IonIcon name="logo-facebook" role="img" className="md hydrated" aria-label="logo facebook"></IonIcon>
                                </a>
                            </li>
                            <li>
                                <a href="#tag" className="social-link">
                                    <IonIcon name="logo-twitter" role="img" className="md hydrated" aria-label="logo twitter"></IonIcon>
                                </a>
                            </li>
                            <li>
                                <a href="#tag" className="social-link">
                                    <IonIcon name="logo-instagram" role="img" className="md hydrated" aria-label="logo instagram"></IonIcon>
                                </a>
                            </li>
                            <li>
                                <a href="#tag" className="social-link">
                                    <IonIcon name="logo-linkedin" role="img" className="md hydrated" aria-label="logo linkedin"></IonIcon>
                                </a>
                            </li>
                        </ul>
                        <div className="header-alert-news">
                            <p>
                                <b>Free Shipping</b> This Week Order Over - $55
                            </p>
                        </div>
                        <div className="header-top-actions">
                            <select name="currency">
                                <option value="usd">USD $</option>
                                <option value="eur">EUR €</option>
                            </select>
                            <select name="language">
                                <option value="en-US">English</option>
                                <option value="es-ES">Español</option>
                                <option value="fr">Français</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="header-main">

                    <div className="container">

                        <a href="#tag" className="header-logo">
                            <img src={logo} alt="Anon's logo" width="120" height="36" />
                        </a>

                        <div className="header-search-container">

                            <input type="search" name="search" className="search-field" placeholder="Enter your product name..." />

                            <button className="search-btn">
                                <IonIcon name="search-outline" role="img" className="md hydrated" aria-label="search outline"></IonIcon>
                            </button>

                        </div>

                        <div className="header-user-actions">

                            <button className="action-btn">
                                <IonIcon name="person-outline" role="img" className="md hydrated" aria-label="person outline"></IonIcon>
                            </button>

                            <button className="action-btn">
                                <IonIcon name="heart-outline" role="img" className="md hydrated" aria-label="heart outline"></IonIcon>
                                <span className="count">0</span>
                            </button>

                            <button className="action-btn">
                                <IonIcon name="bag-handle-outline" role="img" className="md hydrated" aria-label="bag handle outline"></IonIcon>
                                <span className="count">0</span>
                            </button>

                        </div>

                    </div>

                </div>

                <nav className="desktop-navigation-menu">

                    <div className="container">

                
                <Menu></Menu>

                    </div>

                </nav>

                <div className="mobile-bottom-navigation">

                    <button className="action-btn" data-mobile-menu-open-btn="">
                        <IonIcon name="menu-outline" role="img" className="md hydrated" aria-label="menu outline"></IonIcon>
                    </button>

                    <button className="action-btn">
                        <IonIcon name="bag-handle-outline" role="img" className="md hydrated" aria-label="bag handle outline"></IonIcon>

                        <span className="count">0</span>
                    </button>

                    <button className="action-btn">
                        <IonIcon name="home-outline" role="img" className="md hydrated" aria-label="home outline"></IonIcon>
                    </button>

                    <button className="action-btn">
                        <IonIcon name="heart-outline" role="img" className="md hydrated" aria-label="heart outline"></IonIcon>

                        <span className="count">0</span>
                    </button>

                    <button className="action-btn" data-mobile-menu-open-btn="">
                        <IonIcon name="grid-outline" role="img" className="md hydrated" aria-label="grid outline"></IonIcon>
                    </button>

                </div>

                <nav className="mobile-navigation-menu  has-scrollbar" data-mobile-menu="">

                    <div className="menu-top">
                        <h2 className="menu-title">Menu</h2>

                        <button className="menu-close-btn" data-mobile-menu-close-btn="">
                            <IonIcon name="close-outline" role="img" className="md hydrated" aria-label="close outline"></IonIcon>
                        </button>
                    </div>

                    <ul className="mobile-menu-category-list">

                        <li className="menu-category">
                            <a href="#tag" className="menu-title">Home</a>
                        </li>

                        <li className="menu-category">

                            <button className="accordion-menu" data-accordion-btn="">
                                <p className="menu-title">Men's</p>

                                <div>
                                    <IonIcon name="add-outline" className="add-icon md hydrated" role="img" aria-label="add outline"></IonIcon>
                                    <IonIcon name="remove-outline" className="remove-icon md hydrated" role="img" aria-label="remove outline"></IonIcon>
                                </div>
                            </button>

                            <ul className="submenu-category-list" data-accordion="">

                                <li className="submenu-category">
                                    <a href="#tag" className="submenu-title">Shirt</a>
                                </li>

                                <li className="submenu-category">
                                    <a href="#tag" className="submenu-title">Shorts &amp; Jeans</a>
                                </li>

                                <li className="submenu-category">
                                    <a href="#tag" className="submenu-title">Safety Shoes</a>
                                </li>

                                <li className="submenu-category">
                                    <a href="#tag" className="submenu-title">Wallet</a>
                                </li>

                            </ul>

                        </li>

                        <li className="menu-category">

                            <button className="accordion-menu" data-accordion-btn="">
                                <p className="menu-title">Women's</p>

                                <div>
                                    <IonIcon name="add-outline" className="add-icon md hydrated" role="img" aria-label="add outline"></IonIcon>
                                    <IonIcon name="remove-outline" className="remove-icon md hydrated" role="img" aria-label="remove outline"></IonIcon>
                                </div>
                            </button>

                            <ul className="submenu-category-list" data-accordion="">

                                <li className="submenu-category">
                                    <a href="#tag" className="submenu-title">Dress &amp; Frock</a>
                                </li>

                                <li className="submenu-category">
                                    <a href="#tag" className="submenu-title">Earrings</a>
                                </li>

                                <li className="submenu-category">
                                    <a href="#tag" className="submenu-title">Necklace</a>
                                </li>

                                <li className="submenu-category">
                                    <a href="#tag" className="submenu-title">Makeup Kit</a>
                                </li>

                            </ul>

                        </li>

                        <li className="menu-category">

                            <button className="accordion-menu" data-accordion-btn="">
                                <p className="menu-title">Jewelry</p>

                                <div>
                                    <IonIcon name="add-outline" className="add-icon md hydrated" role="img" aria-label="add outline"></IonIcon>
                                    <IonIcon name="remove-outline" className="remove-icon md hydrated" role="img" aria-label="remove outline"></IonIcon>
                                </div>
                            </button>

                            <ul className="submenu-category-list" data-accordion="">

                                <li className="submenu-category">
                                    <a href="#tag" className="submenu-title">Earrings</a>
                                </li>

                                <li className="submenu-category">
                                    <a href="#tag" className="submenu-title">Couple Rings</a>
                                </li>

                                <li className="submenu-category">
                                    <a href="#tag" className="submenu-title">Necklace</a>
                                </li>

                                <li className="submenu-category">
                                    <a href="#tag" className="submenu-title">Bracelets</a>
                                </li>

                            </ul>

                        </li>

                        <li className="menu-category">

                            <button className="accordion-menu" data-accordion-btn="">
                                <p className="menu-title">Perfume</p>

                                <div>
                                    <IonIcon name="add-outline" className="add-icon md hydrated" role="img" aria-label="add outline"></IonIcon>
                                    <IonIcon name="remove-outline" className="remove-icon md hydrated" role="img" aria-label="remove outline"></IonIcon>
                                </div>
                            </button>

                            <ul className="submenu-category-list" data-accordion="">

                                <li className="submenu-category">
                                    <a href="#tag" className="submenu-title">Clothes Perfume</a>
                                </li>

                                <li className="submenu-category">
                                    <a href="#tag" className="submenu-title">Deodorant</a>
                                </li>

                                <li className="submenu-category">
                                    <a href="#tag" className="submenu-title">Flower Fragrance</a>
                                </li>

                                <li className="submenu-category">
                                    <a href="#tag" className="submenu-title">Air Freshener</a>
                                </li>

                            </ul>

                        </li>

                        <li className="menu-category">
                            <a href="#tag" className="menu-title">Blog</a>
                        </li>

                        <li className="menu-category">
                            <a href="#tag" className="menu-title">Hot Offers</a>
                        </li>

                    </ul>

                    <div className="menu-bottom">

                        <ul className="menu-category-list">

                            <li className="menu-category">

                                <button className="accordion-menu" data-accordion-btn="">
                                    <p className="menu-title">Language</p>

                                    <IonIcon name="caret-back-outline" className="caret-back md hydrated" role="img" aria-label="caret back outline"></IonIcon>
                                </button>

                                <ul className="submenu-category-list" data-accordion="">

                                    <li className="submenu-category">
                                        <a href="#tag" className="submenu-title">English</a>
                                    </li>

                                    <li className="submenu-category">
                                        <a href="#tag" className="submenu-title">Español</a>
                                    </li>

                                    <li className="submenu-category">
                                        <a href="#tag" className="submenu-title">Frençh</a>
                                    </li>

                                </ul>

                            </li>

                            <li className="menu-category">
                                <button className="accordion-menu" data-accordion-btn="">
                                    <p className="menu-title">Currency</p>
                                    <IonIcon name="caret-back-outline" className="caret-back md hydrated" role="img" aria-label="caret back outline"></IonIcon>
                                </button>

                                <ul className="submenu-category-list" data-accordion="">
                                    <li className="submenu-category">
                                        <a href="#tag" className="submenu-title">USD $</a>
                                    </li>

                                    <li className="submenu-category">
                                        <a href="#tag" className="submenu-title">EUR €</a>
                                    </li>
                                </ul>
                            </li>

                        </ul>

                        <ul className="menu-social-container">

                            <li>
                                <a href="#tag" className="social-link">
                                    <IonIcon name="logo-facebook" role="img" className="md hydrated" aria-label="logo facebook"></IonIcon>
                                </a>
                            </li>

                            <li>
                                <a href="#tag" className="social-link">
                                    <IonIcon name="logo-twitter" role="img" className="md hydrated" aria-label="logo twitter"></IonIcon>
                                </a>
                            </li>

                            <li>
                                <a href="#tag" className="social-link">
                                    <IonIcon name="logo-instagram" role="img" className="md hydrated" aria-label="logo instagram"></IonIcon>
                                </a>
                            </li>

                            <li>
                                <a href="#tag" className="social-link">
                                    <IonIcon name="logo-linkedin" role="img" className="md hydrated" aria-label="logo linkedin"></IonIcon>
                                </a>
                            </li>

                        </ul>

                    </div>

                </nav>

            </header>
        </>
    )
}
