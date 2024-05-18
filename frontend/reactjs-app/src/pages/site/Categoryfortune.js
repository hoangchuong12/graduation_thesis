import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import ProductService from '../../services/ProductService';
import ProductCategoryService from '../../services/ProductCategory';
import { urlImageProduct } from '../../config';
import CategoryService from '../../services/CategoryService';
import { Link } from 'react-router-dom'; // Import Link

const CategoryFortune = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [filters, setFilters] = useState({
        priceRange: { min: 0, max: 10000 },
        ratings: []
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productCategoryResponse = await ProductCategoryService.getByCategoryId(id);
                if (Array.isArray(productCategoryResponse)) {
                    const productDetailsPromises = productCategoryResponse.map(productCategory =>
                        ProductService.getById(productCategory.productId)
                            .then(response => response) // Assuming response is the product object
                            .catch(err => null) // Handle error by returning null
                    );

                    const productDetailsResponses = await Promise.all(productDetailsPromises);
                    const productsData = productDetailsResponses.filter(product => product !== null);
                    setProducts(productsData);
                }
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        const fetchCategories = async () => {
            try {
                let result = await CategoryService.getAll();
                const sortedbrands = result.filter(brand => brand.status !== 0 && brand.status !== 2);
                setCategories(sortedbrands);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        fetchCategories();
        fetchProducts();
    }, [id]);

    const handlePriceRangeFilterChange = (value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            priceRange: { ...prevFilters.priceRange, max: value }
        }));
    };

    const handleRatingFilterChange = (rating) => {
        // Convert rating to integer if it's coming from an input element as a string
        const ratingValue = parseInt(rating, 10); // Make sure rating is treated as an integer
        const updatedRatings = filters.ratings.includes(ratingValue)
            ? filters.ratings.filter(r => r !== ratingValue) // Remove the rating if it's already in the filter
            : [...filters.ratings, ratingValue]; // Add the rating if it's not already in the filter
    
        setFilters(prevFilters => ({ ...prevFilters, ratings: updatedRatings }));
    };
    
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const price = parseFloat(product.price);
            if (price < filters.priceRange.min || price > filters.priceRange.max) {
                return false;
            }
            // Ensure the product's evaluate rating exactly matches any of the selected ratings
            if (filters.ratings.length > 0 && !filters.ratings.includes(product.evaluate)) {
                return false;
            }
            return true;
        });
    }, [products, filters]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <div className="card">
                        <div className="card-header bg-primary text-white">Filters</div>
                        <div className="card-body">
                        <h6 className="fw-bold mt-3">Categories</h6>
                        <div className="list-unstyled">
                            {categories.map(category => (
                                <Link key={category.id} to={`/categoryFortune/${category.id}`}className="d-block mb-2">
                                    {category.name}
                                </Link>
                                                        
                            ))}
                        </div>
                            <h6 className="fw-bold mt-3">Price Range</h6>
                            <input
                                type="range"
                                className="form-range"
                                min="0"
                                max="10000"
                                value={filters.priceRange.max}
                                onChange={(e) => handlePriceRangeFilterChange(e.target.value)}
                            />
                            <div>Max Price: ${filters.priceRange.max}</div>
        
                            <h6 className="fw-bold mt-3">Ratings</h6>
                            {[1, 2, 3, 4, 5].map((rating, index) => (
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={rating}
                                        id={`rating-${rating}`}
                                        checked={filters.ratings.includes(rating)}
                                        onChange={() => handleRatingFilterChange(rating)}
                                    />
                                    <label className="form-check-label" htmlFor={`rating-${rating}`}>
                                        {Array(rating).fill(<FontAwesomeIcon icon={faStar} />)}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="row">
                        {currentItems.map((product, index) => (
                            <div key={product.id} className="col-lg-4 col-md-6 mb-4 d-flex">
                                <div className="card w-100 my-2 shadow-2-strong">
                                    <img src={urlImageProduct + product.image} className="card-img-top" alt="Hinh anh" />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">${product.price.toFixed(2)}</h5>
                                        <p className="card-text">{product.description || 'No description available.'}</p>
                                        <div className="d-flex align-items-center">
                                            {Array.from({ length: product.rating }, (_, i) => (
                                                <FontAwesomeIcon key={i} icon={faStar} />
                                            ))}
                                        </div>
                                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                            <a href="#!" className="btn btn-primary shadow-0 me-1">Add to cart</a>
                                            <a href="#!" className="btn btn-light border icon-hover px-2 pt-2">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <nav>
                        <ul className='pagination'>
                            {pageNumbers.map((number) => (
                                <li key={number} className='page-item'>
                                    <a onClick={() => paginate(number)} href='#!' className='page-link'>
                                        {number}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default CategoryFortune;
