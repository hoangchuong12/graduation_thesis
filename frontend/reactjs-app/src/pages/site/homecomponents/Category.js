import React, { useState, useEffect } from 'react';
import CategoryService from '../../../services/CategoryService';
import { urlImageCategory } from '../../../config';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [reload, setReload] = useState(0);


 useEffect(() => {
        const fetchCategories = async () => {
            try {
                let result = await CategoryService.getAll();
                const sortedCategories = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setCategories(sortedCategories);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        fetchCategories();
    }, [reload]);

    const handleClick = (categoryId) => {
        console.log("Clicked category ID:", categoryId);
        // You can perform any action with the category ID here, such as navigating to a specific category page
    };

    if (!categories) {
        return <div>Loading...</div>;
    }

    return (
        <div className="category">
            <div className="container">
                <div className="category-item-container has-scrollbar">
                {categories && categories.length > 0 &&
                            categories.map((category, index) => {
                                return (
                        <div className="category-item" key={category.id} >
                            <div className="category-img-box">
                            {category.image ? (
                                                <img src={urlImageCategory + category.image} className="img-fluid user-avatar" alt="Hinh anh" />
                                            ) : (
                                                <p>Không có ảnh</p>
                                            )}
                            </div>
                            <div className="category-content-box">
                                <div className="category-content-flex">
                                    <h3>{category.name}</h3>
                                    <p className="category-item-amount">(53)</p>
                                </div>
                                <a href="#" className="category-btn">Show all onClick={() => handleClick(category.id)}</a>
                            </div>
                        </div>
                  );
                })
            }
                </div>
            </div>
        </div>
    );
};

export default Category;