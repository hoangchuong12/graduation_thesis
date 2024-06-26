import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import CategoryService from '../../../services/CategoryService';
import { urlImageCategory } from '../../../config';
import { useParams, useNavigate } from 'react-router-dom';
const Category = () => {
    const [categories, setCategories] = useState([]);
    const [reload, setReload] = useState(0);
    const navigate = useNavigate(); 
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                let result = await CategoryService.getAll();
                const sortedCategories = result.filter(category => category.status == 3);
                setCategories(sortedCategories);
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
        fetchCategories();
    }, [reload]);


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
                                            <img src={urlImageCategory + category.image} width={40}  alt="Hinh anh" />
                                        ) : (
                                            <p>Không có ảnh</p>
                                        )}
                                    </div>
                                    <div className="category-content-box">
                                        <div className="category-content-flex">
                                            <h3 className="category-item-title">{category.name}</h3>
                                            <p className="category-item-amount">(53)</p>
                                        </div>
                                        {/* Replace <a> with <Link> */}
                                        <Link to={'/CategoryFortune/' + category.id} className="category-btn">Show all</Link>
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
