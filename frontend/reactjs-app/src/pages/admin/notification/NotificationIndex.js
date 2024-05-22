import React, { useEffect, useState } from 'react';
import NotificationService from '../../../services/NotificationService';
import { FaTrash, FaEdit, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const NotificationIndex = () => {
    const [notifications, setNotifications] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchNotifications = async () => {
            const result = await NotificationService.getAll();
            setNotifications(result);
        };
        fetchNotifications();
    }, [reload]);

    const HandTrash = async (id) => {
        await NotificationService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handleStatus = async (id) => {
        try {
            await NotificationService.switchStatus(id);
            setReload(Date.now());
            toast.success("Thành công");
        } catch (error) {
            console.error('Error switching status:', error);
            toast.error("Đã xảy ra lỗi khi thay đổi trạng thái.");
        }
    };

    return (
        <div className="content mt-4">
            <section className="content-header my-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Thông báo</h1>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <Link to="/admin/notification/trash" className="text-white text-decoration-none">Thùng rác</Link>
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
                            <th>Tài khoản</th>
                            <th>Mô tả</th>
                            <th>Chi tiết</th>
                            <th>Tình trạng</th>
                            <th>Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications && notifications.length > 0 &&
                            notifications.map((notification, index) => {
                                if (notification.status !== 2) {
                                    return (
                                        <tr key={notification.id} className="datarow">
                                            <td className="text-center">
                                                <input type="checkbox" id={`checkId${index}`} />
                                            </td>
                                            <td>
                                                <div className="name">
                                                    <a href="menu_index.html">
                                                        {notification.user.name}
                                                    </a>
                                                </div>
                                                <div className="d-flex justify-content-start mt-2">
                                                    <button
                                                        onClick={() => handleStatus(notification.id)}
                                                        className={`btn ${notification.status === 1 ? 'btn-success' : 'btn-danger'} me-1`}
                                                    >
                                                        {notification.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                                    </button>
                                                    <Link to={`/admin/notification/edit/${notification.id}`} className='btn btn-primary me-1'>
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        onClick={() => HandTrash(notification.id)}
                                                        className="btn btn-danger">
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                            <td>{notification.description}</td>
                                            <td>{notification.detail}</td>
                                            <td>{notification.statusOfSee === 0 ? "Chưa xem" : "Đã xem"}</td>
                                            <td>{notification.createdAt}</td>
                                        </tr>
                                    );
                                }
                                return null;
                            })
                        }
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default NotificationIndex;
