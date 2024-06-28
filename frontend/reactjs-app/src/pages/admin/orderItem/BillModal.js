import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const BillModal = ({ show, onHide, order }) => {
    if (!order) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Chi Tiết Đơn Hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="order-details">
                    <p><strong>Mã Đơn Hàng:</strong> {order.id}</p>
                    <p><strong>Mã Khách Hàng:</strong> {order.userId}</p>
                    <p><strong>Tổng Giá:</strong> {order.totalPrice} VND</p>
                    <p><strong>Phương Thức Thanh Toán:</strong> {order.payment}</p>
                    <p><strong>Địa Chỉ Giao Hàng:</strong> {order.deliveryAddress}</p>
                    <p><strong>Số Điện Thoại Giao Hàng:</strong> {order.deliveryPhone}</p>
                    <p><strong>Tên Người Nhận:</strong> {order.deliveryName}</p>
                    <p><strong>Ngày Tạo:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                    <p><strong>Ngày Cập Nhật:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BillModal;
