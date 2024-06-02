import React, { useEffect, useState } from 'react';
import OrderService from '../../../services/OrderService';
import OrderItemService from '../../../services/OrderItemService';
import ProductService from '../../../services/ProductService';
import ProductOptionService from '../../../services/ProductOptionService';
import ProductStoreService from '../../../services/ProductStoreService';
import { FaToggleOn, FaTrash, FaToggleOff, FaCheckSquare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { urlImageProduct } from '../../../config';

const OrderItemIndex = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const result = await OrderItemService.getAll();
                const itemsWithProduct = [];
                for (const item of result) {
                    const order = await OrderService.getById(item.orderId);
                    if (order.status !== 3) { // status of order === 3 => cart
                        const product = await ProductService.getById(item.productId);
                        const optionValue = await ProductOptionService.getOptionValue(item.optionValueId);
                        const option = await ProductOptionService.getById(optionValue.optionId);
                        item.product = product; // Add product info to item
                        item.option = option; // Add option info to item
                        item.optionValue = optionValue; // Add option value info to item
                        itemsWithProduct.push(item);
                    }
                }
                const itemsWithProductFill = itemsWithProduct.filter(item => item.status !== 2);
                const sorted = itemsWithProductFill.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrderItems(sorted);
            } catch (error) {
                console.error("Error fetching order items:", error);
            }
        };

        fetchOrderItems();
    }, [reload]);

    const HandTrash = async (id) => {
        await OrderItemService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handExport = async (item) => {
        try {
            await OrderItemService.export(item.id);
            const dataExport = {
                orderItemId: item.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.totalPrice,
                description: item.option.name + "/" + item.optionValue.value,
                createdBy: JSON.parse(sessionStorage.getItem('useradmin'))?.userId
            }
            const exportAdd = await ProductStoreService.export(dataExport);
            if (exportAdd !== null) {
                setReload(Date.now());
                toast.success("Xác nhận đơn hàng");
            }
        } catch (error) {
            console.error("Error export:", error);
        }
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await OrderItemService.sitchStatus(id);
            setReload(Date.now());
            toast.success("Thành công");
        } catch (error) {
            console.error('Error switching status:', error);
            toast.error("Đã xảy ra lỗi khi thay đổi trạng thái.");
        }
    };

    const getRowClassName = (status) => {
        if (status < 3) {
            return "table-info";
        }
        return "";
    };

    return (
        <div className="container mt-4">
            <section className="content-header my-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Quản lý đơn đặt hàng</h1>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <a href="/admin/order-item/trash" className="text-white text-decoration-none">Thùng rác</a>
                        </button>
                    </div>
                </div>
            </section>
            <section className="content-body my-2">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th className="text-center" style={{ width: '30px' }}>
                                <input type="checkbox" id="checkAll" />
                            </th>
                            <th>Sản phẩm</th>
                            <th>Ảnh</th>
                            <th>Loại lựa chọn</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Ngày đặt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems && orderItems.length > 0 &&
                            orderItems.map((item) => (
                                <tr key={item.id} className={`datarow ${getRowClassName(item.status)}`}>
                                    <td className="text-center">
                                        <input type="checkbox" />
                                    </td>
                                    <td>
                                        <div className='name'>
                                            {item.product ? item.product.name : "Tên sản phẩm không tồn tại"}
                                        </div>
                                        <div className="d-flex justify-content-start mt-2">
                                            <button
                                                onClick={() => handleStatus(item.id, item.status)}
                                                className={`btn ${item.status === 0 ? 'btn-danger' : 'btn-success'} me-1`}
                                            >
                                                {item.status === 0 ? <FaToggleOff size={24} /> : <FaToggleOn size={24} />}
                                            </button>
                                            <button
                                                onClick={() => HandTrash(item.id)}
                                                className="btn btn-danger me-1">
                                                <FaTrash />
                                            </button>
                                            <button
                                                onClick={() => handExport(item)}
                                                className="btn btn-success">
                                                <FaCheckSquare size={24} />
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        {item.product ? (
                                            <img src={`${urlImageProduct}/${item.product.image}`} className="img-fluid user-avatar" alt="Hinh anh" />
                                        ) : (
                                            <p>Không có ảnh</p>
                                        )}
                                    </td>
                                    <td>{item.option ? `${item.option.name} / ${item.optionValue.value}` : "Loại lựa chọn không tồn tại"}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.totalPrice}</td>
                                    <td>{item.createdAt}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default OrderItemIndex;
