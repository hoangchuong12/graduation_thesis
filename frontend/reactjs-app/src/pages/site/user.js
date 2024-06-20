import React, { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import OrderService from '../../services/OrderService';
import OrderItemService from '../../services/OrderItemService';
import ProductService from '../../services/ProductService';
import { urlImageUser, urlImageProduct } from '../../config';
import { useNavigate } from 'react-router-dom';

const MyUser = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log("user token in profile", user);

    const navigate = useNavigate();

    const [orders, setOrders] = useState(null);
    const [userInfor, setUserInfo] = useState(null);
    const [renderedOrderItems, setRenderedOrderItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultUserInfo = await UserService.getUserById(user.userId);
                if (resultUserInfo) {
                    console.log('user information in MyUser:', resultUserInfo);
                    setUserInfo(resultUserInfo);
                }
                const resultOrders = await OrderService.getByUser(user.userId);
                if (resultOrders) {
                    resultOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    console.log('orders in MyUser:', resultOrders);
                    setOrders(resultOrders);
                }
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };

        if (user.userId) {
            fetchData();
        }
    }, [user.userId]);

    useEffect(() => {
        const renderOrderItems = async () => {
            if (!orders) return;
            const renderedItems = [];
            for (const order of orders) {
                const orderItems = await OrderItemService.getByOrder(order.id);
                if (orderItems) {
                    orderItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    for (const item of orderItems) {
                        const product = await ProductService.getById(item.productId);
                        if (product) {
                            renderedItems.push(
                                <div key={item.id} className="card mb-4 mb-md-2" onClick={() => navigate(`/order-item-detail/${item.id}`)}>
                                    <div className="row mb-4 d-flex justify-content-between align-items-center">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                            <img src={urlImageProduct + product.image} className="img-fluid rounded-3" alt={product.name} />
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                            <h6 className="text-muted">Sản phẩm</h6>
                                            <h6 className="text-black mb-0">{product.name}</h6>
                                        </div>
                                        <div className="col-md-2 col-lg-2 col-xl-2 d-flex">
                                            <p className="mb-0">Số lượng: {item.quantity}</p>
                                        </div>
                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                            <h6 className="mb-0">Giá:{item.totalPrice}</h6>
                                        </div>
                                        <div className="col-md-2 col-lg-2 col-xl-2 d-flex">
                                            <p className="mb-0">Ngày đặt: {formatDateToLocalDate(item.createdAt)}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    }
                }
            }
            setRenderedOrderItems(renderedItems);
        };

        renderOrderItems();
    }, [orders, navigate]);

    function formatDateToLocalDate(datetimeString) {
        const date = new Date(datetimeString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    }

    const itemsPerPage = 4;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = renderedOrderItems.slice(indexOfFirstItem, indexOfLastItem);

    // eslint-disable-next-line no-unused-vars
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < Math.ceil(renderedOrderItems.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <section className="profile-section">
                <div className="container py-5">
                    <div className="row">
                    <div className="col-lg-4">
                    <div className="card mb-4 text-center">
                        <div className="card-img-top mx-auto mt-4" style={{ width: '150px', height: '150px', overflow: 'hidden', borderRadius: '50%' }}>
                            <img src={userInfor && userInfor.avatar ? urlImageUser + userInfor.avatar : 'default-avatar.jpg'} alt="avatar" className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{userInfor && userInfor.name ? userInfor.name : "User's Name"}</h5>
                            <p className="text-muted">{userInfor && userInfor.role ? userInfor.role.name : "Role"}</p>
                            <p>{userInfor && userInfor.address ? userInfor.address : "No Address Provided"}</p>
                            <div className="d-flex justify-content-center gap-2">

                                <button className="btn btn-outline-primary" onClick={() => navigate(`/my-user-manager`)}>Account Settings</button>
                            </div>
                        </div>
                    </div>
                </div>


                        <div className="col-lg-8">

                            <div className="card">
                                <div className="card mb-4">
                                    <div className="card-header">
                                        Order History
                                    </div>
                                    <div className="card-body">
                                        {currentItems.length > 0 ? (
                                            <div className="list-group">
                                                {currentItems}
                                            </div>
                                        ) : (
                                            <p className="text-muted">No orders completed yet.</p>
                                        )}
                                        <nav aria-label="Page navigation example" className="mt-4">
                                            <ul className="pagination justify-content-center">
                                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                    <button className="page-link" onClick={prevPage}>Previous</button>
                                                </li>
                                                <li className={`page-item ${currentPage === Math.ceil(renderedOrderItems.length / itemsPerPage) ? 'disabled' : ''}`}>
                                                    <button className="page-link" onClick={nextPage}>Next</button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MyUser;
