import IonIcon from '@reacticons/ionicons';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import CategoryService from '../../../services/CategoryService';
import BrandService from '../../../services/BrandService';
import TagService from '../../../services/TagService';
const Menu = () => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [tags, setTags] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                let result = await CategoryService.getAll();
                const sortedCategories = result.filter(category => category.status == 3);
                setCategories(sortedCategories);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        const fetchBrands = async () => {
            try {
                let result = await BrandService.getAll();
                const sortedbrands = result.filter(brand => brand.status ==3);
                setBrands(sortedbrands);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        const fetchTags = async () => {
            try {
                let result = await TagService.getAll();
                const sortedtags = result.filter(brand => brand.status ==3);
                setTags(sortedtags);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        fetchTags();
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
                        <li key={category.id} className="text-truncate">
                        <Link to={`/categoryFortune/${category.id}`} className="text-decoration-none text-reset">
                            {category.name}
                        </Link>
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
                <Link to={`/brandFortune/${brand.id}`} className="menu-title">
                    {brand.name}
                </Link>
            </li>
        ));
    };
    
    const renderTags = () => {
        if (!tags) {
            return <div>Loading tags...</div>;
        }
    
        return (
            <ul>
                {tags.map(tag => (
                    <li key={tag.id} className="text-truncate">
                        <Link 
                            to={`/tagFortune/${tag.id}`} 
                            className="text-decoration-none text-reset d-block"
                        >
                            {tag.name}
                        </Link>
                    </li>
                ))}
            </ul>
        );
    };
    
    
    


    return (
        <>

            <ul className="desktop-menu-category-list">

                <li className="menu-category">
                    <a href="/" className="menu-title">trang chủ</a>
                </li>

                <li className="menu-category">
                    <a href="#tag" className="menu-title">Thể loại</a>

                    <div className="dropdown-panel">

                        {renderCategories()}

                    </div>
                </li>

                <li className="menu-category">
                    <a href="#tag" className="menu-title">Nhãn hiệu</a>
                    <ul className="dropdown-list">
                        {renderBrands()}
                    </ul>
                </li>

                <li className="menu-category">
                    <a href="#tag" className="menu-title">loại sản phẩm</a>

                    <ul className="dropdown-list">

                        {renderTags()}

                    </ul>
                </li>

                <li className="menu-category">
                    <a href="/productfortune" className="menu-title">tất cả sản phẩm</a>
                </li>

            </ul>
        </>
    );
};
export default Menu;