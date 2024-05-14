import IonIcon from '@reacticons/ionicons';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import CategoryService from '../../../services/CategoryService';
import BrandService from '../../../services/BrandService';
const Menu = () => {
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
        if (!categories) {
            return <div>Loading...</div>;
        }

        const numberOfItemsPerColumn = 3;
        const columns = [];

        for (let i = 0; i < categories.length; i += numberOfItemsPerColumn) {
            const columnItems = categories.slice(i, i + numberOfItemsPerColumn);
            columns.push(
                <ul key={i} className="dropdown-panel-list">
                    {columnItems.map(category => (
                        <li key={category.id} className="panel-list-item">
                            <a href="#tag">{category.name}</a>
                        </li>
                    ))}
                </ul>
            );
        }

        return columns;
    };

    const renderBrands = () => {
        if (!brands) {
            return <div>Loading brands...</div>;
        }

        return brands.map(brand => (
            <li key={brand.id} className="dropdown-item">
                <a href="#tag" className="menu-title">{brand.name}</a>
            </li>
        ));
    };



    return (
        <>

            <ul className="desktop-menu-category-list">

                <li className="menu-category">
                    <a href="/" className="menu-title">Home</a>
                </li>

                <li className="menu-category">
                    <a href="#tag" className="menu-title">Categories</a>

                    <div className="dropdown-panel">

                    {renderCategories()}

                    </div>
                </li>

                <li className="menu-category">
                    <a href="#tag" className="menu-title">Brands</a>
                    <ul className="dropdown-list">
                    {renderBrands()}
                    </ul>
                </li>

                <li className="menu-category">
                    <a href="#tag" className="menu-title">Women's</a>

                    <ul className="dropdown-list">

                        <li className="dropdown-item">
                            <a href="#tag">Dress &amp; Frock</a>
                        </li>

                        <li className="dropdown-item">
                            <a href="#tag">Earrings</a>
                        </li>

                        <li className="dropdown-item">
                            <a href="#tag">Necklace</a>
                        </li>

                        <li className="dropdown-item">
                            <a href="#tag">Makeup Kit</a>
                        </li>

                    </ul>
                </li>

                <li className="menu-category">
                    <a href="#tag" className="menu-title">Jewelry</a>

                    <ul className="dropdown-list">

                        <li className="dropdown-item">
                            <a href="#tag">Earrings</a>
                        </li>

                        <li className="dropdown-item">
                            <a href="#tag">Couple Rings</a>
                        </li>

                        <li className="dropdown-item">
                            <a href="#tag">Necklace</a>
                        </li>

                        <li className="dropdown-item">
                            <a href="#tag">Bracelets</a>
                        </li>

                    </ul>
                </li>

                <li className="menu-category">
                    <a href="#tag" className="menu-title">Perfume</a>

                    <ul className="dropdown-list">

                        <li className="dropdown-item">
                            <a href="#tag">Clothes Perfume</a>
                        </li>

                        <li className="dropdown-item">
                            <a href="#tag">Deodorant</a>
                        </li>

                        <li className="dropdown-item">
                            <a href="#tag">Flower Fragrance</a>
                        </li>

                        <li className="dropdown-item">
                            <a href="#tag">Air Freshener</a>
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
        </>
    );
};
export default Menu;