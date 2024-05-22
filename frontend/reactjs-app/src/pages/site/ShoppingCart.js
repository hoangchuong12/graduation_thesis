import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import OrderService from '../../services/OrderService';
import OrderItemService from '../../services/OrderItemService';
import ProductService from '../../services/ProductService';
import UserService from '../../services/UserService';
import ProductStoreService from '../../services/ProductStoreService';
import { urlImageProduct } from '../../config';
import { toast } from 'react-toastify';

const CartItem = ({ item }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await ProductService.getById(item.productId);
                setProduct(product);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (item) {
            fetchProduct();
        }
    }, [item]);

    if (!item || !product) {
        return <div>Loading...</div>; // Hiển thị thông báo hoặc hiệu ứng tải dữ liệu
    }

    return (
        <div className="row mb-4 d-flex justify-content-between align-items-center">
            <div className="col-md-2 col-lg-2 col-xl-2">
                <img src={urlImageProduct + product.image} className="img-fluid rounded-3" alt={product.name} />
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3">
                <h6 className="text-muted">Sản phẩm</h6>
                <h6 className="text-black mb-0">{product.name}</h6>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3 d-flex">
                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-link px-2">
                    <i className="fas"><FontAwesomeIcon icon={faMinus} /></i>
                </button>
                <input id="quantity" min={0} name="quantity" defaultValue={item.quantity} type="number" className="form-control form-control-sm" />
                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-link px-2">
                    <i className="fas"><FontAwesomeIcon icon={faPlus} /></i>
                </button>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 className="mb-0">{item.price}</h6>
            </div>
            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" className="text-muted"><i className="fas fa-times" /></a>
            </div>
        </div>
    );
};

const Cart = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log("user in cart", user);

    const [orderItems, setOrderItems] = useState(null);
    const [cart, setCart] = useState(null);

    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [deliveryPhone, setDeliveryPhone] = useState("");
    const [deliveryName, setDeliveryName] = useState("");


    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cart = await OrderService.getCart(user.userId);
                const getUserFull = await UserService.getUserById(user.userId);
                if (getUserFull) {
                    console.log("full user in cart:", getUserFull);
                    setDeliveryAddress(getUserFull.address);
                    setDeliveryPhone(getUserFull.phone);
                    setDeliveryName(getUserFull.name);
                }
                if (cart) {
                    console.log("cart in cart:", cart);
                    setCart(cart);
                    const cartItems = await OrderItemService.getByOrder(cart.id);
                    if (cartItems) {
                        console.log("items in cart", cartItems);
                        const itemsWithProducts = await Promise.all(cartItems.map(async (item) => {
                            const product = await ProductService.getById(item.productId);
                            return { ...item, product };
                        }));
                        setOrderItems(itemsWithProducts);
                    }
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [user.userId]);

    const submitOrderInCart = async () => {
        const dataUpdateCart = {
            userId: cart.userId,
            totalPrice: cart.totalPrice,
            deliveryAddress: deliveryAddress,
            deliveryPhone: deliveryPhone,
            deliveryName: deliveryName,
            status: 1,
        };
        const updateCartToOrder = await OrderService.update(cart.id, dataUpdateCart);
        if (updateCartToOrder !== null) {
            //Chạy vòng lặp orderItems ở đây
            if (orderItems) {
                for (const item of orderItems) {
                    console.log("Inside loop:", item);
                    const storeOfItem = await ProductStoreService.getByOptionValue(item.optionValueId);
                    console.log("store of item:", storeOfItem);
                    if (storeOfItem !== null) {
                        const updatedProductStore = {
                            productId: storeOfItem.productId,
                            optionValueId: storeOfItem.optionValueId,
                            quantity: storeOfItem.quantity - item.quantity,
                            soldQuantity: storeOfItem.soldQuantity + item.quantity,
                            price: storeOfItem.price,
                            createdBy: storeOfItem.createdBy,
                        };
                        try {
                            await ProductStoreService.update(storeOfItem.id, updatedProductStore);
                        } catch (error) {
                            console.error('Error updating product store:', error);
                            toast.error("Đã xảy ra lỗi khi cập nhật kho hàng sản phẩm.");
                        }
                    }
                }
            }
            const cart = await OrderService.getCart(user.userId);
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
            console.log("UPDATE cart to order:", updateCartToOrder);
            toast.success("Đặt hàng thành công");
        }
    }

    return (
        <section className="h-100 h-custom" style={{ backgroundColor: '#d2c9ff' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <div className="card card-registration card-registration-2" style={{ borderRadius: 15 }}>
                            <div className="card-body p-0">
                                <div className="row g-0">
                                    <div className="col-lg-8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0 text-black">Giỏ Hàng</h1>
                                            </div>
                                            <hr className="my-4" />
                                            {orderItems && orderItems.map((item, index) => (
                                                <CartItem key={index} item={item} />
                                            ))}
                                            <hr className="my-4" />
                                            <div className="pt-5">
                                                <h6 className="mb-0"><a href="/" className="text-body"><i className="fas fa-long-arrow-alt-left me-2" />Quay về trang chủ</a></h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 bg-grey">
                                        {cart && (
                                            <div className="p-5">
                                                <h3 className="fw-bold mb-5 mt-2 pt-1">Tổng đơn</h3>
                                                <hr className="my-4" />

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
                                                <div className="justify-content-between mb-5">
                                                    <h5 className="text-uppercase">Tổng thanh toán</h5>
                                                    <h5>{cart.totalPrice}</h5>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={submitOrderInCart}
                                                    data-mdb-button-init
                                                    data-mdb-ripple-init
                                                    className="btn btn-dark btn-block btn-lg"
                                                    data-mdb-ripple-color="dark"
                                                    disabled={!orderItems || orderItems.length === 0} // Kiểm tra và vô hiệu hóa nút nếu không có sản phẩm trong giỏ hàng
                                                >
                                                    Đặt hàng
                                                </button>

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
