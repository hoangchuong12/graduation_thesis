import React, { useState, useEffect } from 'react';
import ProductService from '../../../services/ProductService';
import { useParams, Link } from 'react-router-dom';
import ProductfeedbackService from '../../../services/ProductFeedbackService';
import UserService from '../../../services/UserService';
import { urlImageProduct, urlImageUser } from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Content = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('spec');
    const [product, setProduct] = useState(null);
    const [productRelateds, setProductRelateds] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [users, setUsers] = useState({});

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchProductAndFeedbacks = async () => {
            try {
                const productResult = await ProductService.getById(id);
                const feedbackResult = await ProductfeedbackService.getByProductId(id);
                const relatedProducts = await ProductService.getRelatedProducts(id);

                if (productResult.status !== 2) {
                    setProduct(productResult);
                    setFeedbacks(feedbackResult);
                    setProductRelateds(relatedProducts);

                    const userIds = feedbackResult.map(feedback => feedback.createdBy);
                    const uniqueUserIds = [...new Set(userIds)];
                    const usersData = await Promise.all(uniqueUserIds.map(async userId => {
                        try {
                            const userData = await UserService.getUserById(userId);
                            return userData;
                        } catch (error) {
                            console.error("Error fetching user data for ID", userId, ":", error);
                            return null;
                        }
                    }));

                    const usersObject = {};
                    usersData.forEach(user => {
                        if (user && user.id) {
                            usersObject[user.id] = user;
                        }
                    });

                    setUsers(usersObject);
                } else {
                    console.error("Product is inactive");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProductAndFeedbacks();
    }, [id]);

    const comments = () => {
        return (
            <section>
                <div className="container my-5 py-5 text-body">
                    <div className="row d-flex justify-content-center">
                        {feedbacks.map(feedback => (
                            <div className="col-md-12 col-lg-10 col-xl-12" key={feedback.id}>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex flex-start">
                                            {users[feedback.createdBy] && (
                                                <div className="d-flex align-items-center me-3">
                                                    <img src={urlImageUser + users[feedback.createdBy].avatar} alt="Avatar" className="rounded-circle shadow-1-strong me-2" width={40} height={40} />
                                                </div>
                                            )}
                                            <div className="w-100">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <div className="text-primary fw-bold mb-0">
                                                        {users[feedback.createdBy]?.name}
                                                    </div>
                                                    <p className="mb-0">{feedback.createdAt}</p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="small mb-0 text-break" style={{ color: '#aaa', marginLeft: '2rem' }}>
                                                        {feedback.detail}
                                                    </p>
                                                    <div className="text-warning mb-1 me-2">
                                                        {[...Array(feedback.evaluate)].map((star, index) => (
                                                            <FontAwesomeIcon icon={faStar} key={index} />
                                                        ))}
                                                    </div>
                                                    <div className="d-flex flex-row">
                                                        <i className="fas fa-star text-warning me-2" />
                                                        <i className="far fa-check-circle" style={{ color: '#aaa' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    return (
        <section className="bg-light border-top py-4">
            <div className="container">
                <div className="row gx-4">
                    <div className="col-lg-8 mb-4">
                        <div className="border rounded-2 px-3 py-2 bg-white">
                            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a className={`nav-link ${activeTab === 'spec' ? 'active' : ''}`} onClick={() => handleTabClick('spec')} id="ex1-tab-1" href="#ex1-pills-1" role="tab">Description</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className={`nav-link ${activeTab === 'warranty' ? 'active' : ''}`} onClick={() => handleTabClick('warranty')} id="ex1-tab-2" href="#ex1-pills-2" role="tab">Comments</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="ex1-content">
                                <div className={`tab-pane fade ${activeTab === 'spec' ? 'show active' : ''}`} id="ex1-pills-1" role="tabpanel">
                                    <p>{product?.description}</p>
                                </div>
                                <div className={`tab-pane fade ${activeTab === 'warranty' ? 'show active' : ''}`} id="ex1-pills-2" role="tabpanel">
                                    {comments()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="px-0 border rounded-2 shadow-0">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Similar items</h5>
                                    <div className="overflow-auto" style={{ maxHeight: '400px' }}>
                                        {productRelateds.map(productRelated => (
                                            <div className="d-flex mb-3" key={productRelated.id}>
                                                <Link to={`/productdetail/${productRelated.id}`} className="me-3">
                                                    <img src={urlImageProduct + productRelated.image} alt={productRelated.name} style={{ minWidth: 96, height: 96 }} className="img-md img-thumbnail" />
                                                </Link>
                                                <div className="info">
                                                    <Link to={`/productdetail/${productRelated.id}`} className="nav-link mb-1">
                                                        {productRelated.name}
                                                    </Link>
                                                    <strong className="text-dark">${productRelated.price}</strong>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Content;
