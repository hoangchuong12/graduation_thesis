import React, { useEffect, useState, useRef } from 'react';
import { MdDelete } from "react-icons/md";
import OrderService from '../../services/OrderService';
import OrderItemService from '../../services/OrderItemService';
import ProductService from '../../services/ProductService';
import UserService from '../../services/UserService';
import ProductStoreService from '../../services/ProductStoreService';
import ProductSaleService from '../../services/ProductSaleService';
import { urlImageProduct } from '../../config';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const CartItem = ({ item, reload, setReload }) => {
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await ProductService.getById(item.productId);
                setProduct(product);
            } catch (error) {
                if (error.response && error.response.status === 503) {
                    navigate('/404');
                } else {
                    console.error("Error fetching data:", error);
                }
            }
        };

        if (item) {
            fetchProduct();
        }
    }, [item, navigate]);

    if (!item || !product) {
        return <div>Loading...</div>;
    }

    const handleDeleteItem = async (itemId) => {
        try {
            await OrderItemService.delete(itemId);
            setReload(!reload);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };


    return (
        <div>
            <div className="card mb-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                            <div>
                                <img src={urlImageProduct + product.image} className="img-fluid rounded-3" alt="Shopping item" style={{ width: 65 }} />
                            </div>
                            <div className="ms-3">
                                <h5>Canon EOS M50</h5>
                                <p className="small mb-0">{product.name}</p>
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                            <div style={{ width: 50 }}>
                                <h5 className="fw-normal mb-0">{item.quantity}</h5>
                            </div>
                            <div style={{ width: 200 }}>
                                <h5 className="mb-0">{product.price}vnd</h5>
                            </div>
                            <a href="#!" style={{ color: '#cecece' }}><i className="fas fa-trash-alt" /> </a>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                <button className="btn btn-link text-muted" onClick={() => handleDeleteItem(item.id)}>
                                    <MdDelete size={30} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

const Cart = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const location = useLocation();
    const navigate = useNavigate();
    const [orderItems, setOrderItems] = useState([]);
    const [cart, setCart] = useState(null);
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [deliveryPhone, setDeliveryPhone] = useState("");
    const [deliveryName, setDeliveryName] = useState("");


    const [reload, setReload] = useState(false);
    const hasHandledPayment = useRef(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cart = await OrderService.getCart(user.userId);
                const getUserFull = await UserService.getUserById(user.userId);
                if (getUserFull) {
                    setDeliveryAddress(getUserFull.address);
                    setDeliveryPhone(getUserFull.phone);
                    setDeliveryName(getUserFull.name);


                }
                if (cart) {
                    setCart(cart);
                    const cartItems = await OrderItemService.getByOrder(cart.id);
                    if (cartItems) {
                        const itemsWithProducts = await Promise.all(cartItems.map(async (item) => {
                            const product = await ProductService.getById(item.productId);
                            return { ...item, product };
                        }));
                        setOrderItems(itemsWithProducts);
                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 503) {
                    navigate('/404');
                } else {
                    console.error("Error fetching data:", error);
                }
            }
        };
        const handleSuccessfulPayment = async () => {
            if (hasHandledPayment.current) return; // If payment has already been handled, exit the function

            if (!cart) {
                console.error("Cart is null");
                return;
            }
            try {
                const searchParams = new URLSearchParams(location.search);
                const responseCode = searchParams.get("vnp_ResponseCode");
                if (responseCode) {
                    hasHandledPayment.current = true; // Set flag to true to indicate payment has been handled
                    const txnRef = searchParams.get("vnp_TxnRef");
                    await OrderService.setPay(cart.id, txnRef);
                    setReload(!reload);
                    toast.success("Thanh toán thành công!");
                }
            } catch (error) {
                console.error('Error handling successful payment:', error);
                toast.error("Đã xảy ra lỗi khi xử lý thanh toán.");
            }
        };

        handleSuccessfulPayment();
        fetchCartItems();
    }, [user.userId, reload, cart, location.search, navigate]);

    const submitOrderInCartPay = async (amount) => {
        try {
            const linkToPay = await OrderService.payVNPAY(amount);
            if (linkToPay) {
                // console.log("link:",response)
                window.location.href = linkToPay;
            }
        } catch (error) {
            console.error('Error calling VNPAY payment:', error);
            toast.error("Đã xảy ra lỗi khi gọi thanh toán VNPAY.");
        }
    };

    const submitOrderInCart = async () => {
        if (!cart) {
            console.error("Cart is null");
            return;
        }
        const dataUpdateCart = {
            userId: cart.userId,
            totalPrice: cart.totalPrice,
            deliveryAddress: deliveryAddress,
            deliveryPhone: deliveryPhone,
            deliveryName: deliveryName,
            status: 1,
        };

        try {
            const updateCartToOrder = await OrderService.update(cart.id, dataUpdateCart);
            if (updateCartToOrder) {
                if (orderItems) {
                    for (const item of orderItems) {
                        try {
                            const storeOfItem = await ProductStoreService.getByOptionValue(item.optionValueId);
                            if (storeOfItem) {
                                const updatedProductStore = {
                                    productId: storeOfItem.productId,
                                    optionValueId: storeOfItem.optionValueId,
                                    quantity: storeOfItem.quantity - item.quantity,
                                    soldQuantity: storeOfItem.soldQuantity + item.quantity,
                                    price: storeOfItem.price,
                                    createdBy: storeOfItem.createdBy,
                                };
                                await ProductStoreService.update(storeOfItem.id, updatedProductStore);
                            }

                            const sales = await ProductSaleService.getByProduct(item.productId);
                            const activeSale = sales.find(sale => sale.status === 1);

                            if (activeSale) {
                                await ProductSaleService.exportSale(item.productId, item.quantity);
                            }
                        } catch (error) {
                            console.error('Error processing item:', error);
                            toast.error("Đã xảy ra lỗi khi xử lý sản phẩm.");
                            return;
                        }
                    }
                }

                const newCart = await OrderService.getCart(user.userId);
                if (newCart) {
                    setCart(newCart);
                    const cartItems = await OrderItemService.getByOrder(newCart.id);
                    if (cartItems) {
                        const itemsWithProducts = await Promise.all(cartItems.map(async (item) => {
                            const product = await ProductService.getById(item.productId);
                            return { ...item, product };
                        }));
                        setOrderItems(itemsWithProducts);
                    }
                }

                toast.success("Đặt hàng thành công");
            }
        } catch (error) {
            console.error('Error updating cart to order:', error);
            toast.error("Đã xảy ra lỗi khi đặt hàng.");
        }
    };

    //////css internal
    const buttonStyle = {
        backgroundColor: '#6c757d', // Dark gray background
        color: 'white', // White text
        borderRadius: '20px', // Rounded corners
        fontSize: '1rem', // Adjust font size
        padding: '10px 20px', // Adjust padding
        width: '200px', // Fixed width
        margin: '10px auto', // Center align and add space between buttons
        display: 'block', // Ensure block display for centering
        border: 'none', // Remove default border
    };

    const disabledButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#aaa', // Lighter gray for disabled state
        cursor: 'not-allowed', // Not-allowed cursor for disabled state
    };

    return (


        <section className="h-100 h-custom" style={{ backgroundColor: '#eee' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card">
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <h5 className="mb-3"><a href="#!" className="text-body"><i className="fas fa-long-arrow-alt-left me-2" />Continue shopping</a></h5>
                                        <hr />
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div>
                                                <p className="mb-1">Giỏ Hàng</p>

                                            </div>
                                            <div>
                                                <p className="mb-0"><span className="text-muted">Sắp xếp theo:</span> <a href="#!" className="text-body"> <i className="fas fa-angle-down mt-1" /></a></p>
                                            </div>
                                        </div>

                                        {orderItems && orderItems.map((item, index) => (
                                            <CartItem key={index} item={item} reload={reload} setReload={setReload} />
                                        ))}
                                    </div>
                                    <div className="col-lg-5">
                                        {cart && (
                                            <div className="card bg-secondary text-white rounded-3">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <h5 className="mb-0">Tổng đơn</h5>

                                                    </div>

                                                    <a href="#!" type="submit" className="text-white"><i className="fab fa-cc-mastercard fa-2x me-2" /></a>
                                                    <a href="#!" type="submit" className="text-white"><i className="fab fa-cc-visa fa-2x me-2" /></a>
                                                    <a href="#!" type="submit" className="text-white"><i className="fab fa-cc-amex fa-2x me-2" /></a>
                                                    <a href="#!" type="submit" className="text-white"><i className="fab fa-cc-paypal fa-2x" /></a>
                                                    <h5 className="text-uppercase mb-3">Thông tin nhận hàng</h5>
                                                    <div className="mb-5">
                                                        <div data-mdb-input-init className="form-outline">
                                                            <label className="form-label" htmlFor="form3Examplea2">Địa chỉ</label>
                                                            <input type="text" id="deliveryAddress" value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} className="form-control form-control-lg" />
                                                        </div>
                                                        <div data-mdb-input-init className="form-outline">
                                                            <label className="form-label" htmlFor="form3Examplea2">Số điện thoại</label>
                                                            <input type="text" id="deliveryPhone" value={deliveryPhone} onChange={e => setDeliveryPhone(e.target.value)} className="form-control form-control-lg" />
                                                        </div>
                                                        <div data-mdb-input-init className="form-outline">
                                                            <label className="form-label" htmlFor="form3Examplea2">Tên</label>
                                                            <input type="text" id="deliveryName" value={deliveryName} onChange={e => setDeliveryName(e.target.value)} className="form-control form-control-lg" />
                                                        </div>
                                                    </div>
                                                    <hr className="my-4" />
                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Tổng thanh toán</p>
                                                        <p className="mb-2">{cart.totalPrice} VNĐ</p>
                                                    </div>

                                                    <div className="d-flex justify-content-center">
                                                        <button
                                                            type="button"
                                                            onClick={submitOrderInCart}
                                                            className="btn btn-dark me-2" // Lớp màu nền đen cho button, margin-right 2
                                                            disabled={!orderItems || orderItems.length === 0} // Disable button if no items in the cart
                                                        >
                                                            Ship COD
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                submitOrderInCartPay(cart.totalPrice);
                                                                submitOrderInCart();
                                                            }}
                                                            className="btn btn-dark" // Lớp màu nền đen cho button
                                                            disabled={!orderItems || orderItems.length === 0} // Disable button if no items in the cart
                                                        >
                                                            Thanh toán VNPAY
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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

export default Cart;
