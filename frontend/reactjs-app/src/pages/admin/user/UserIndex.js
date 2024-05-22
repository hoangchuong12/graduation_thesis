import React, { useEffect, useState } from 'react';
import UserService from '../../../services/UserService';
import { FaToggleOn, FaTrash, FaEdit, FaToggleOff } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { urlImageUser } from '../../../config';

const UserIndex = () => {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let result = await UserService.getCustomer();
                // Filter out users with status 2
                result = result.filter(user => user.status !== 2);
                // Sort users by createdAt in descending order
                const sortedUsers = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setUsers(sortedUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [reload]);

    const HandTrash = async (id) => {
        await UserService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await UserService.sitchStatus(id);
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
                    <h1>Danh sách người dùng</h1>
                    <Link to="/admin/user/add" className="btn btn-primary">Thêm mới</Link>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <Link to="/admin/user/trash" className="text-white text-decoration-none">Thùng rác</Link>
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
                            <th>Tên đăng nhập</th>
                            <th>Tên người dùng</th>
                            <th>Ảnh đại diện</th>
                            <th>Email</th>
                            <th>Điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Quyền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0 &&
                            users.map((user, index) => (
                                <tr key={user.id} className="datarow">
                                    <td className="text-center">
                                        <input type="checkbox" id={`checkId${index}`} />
                                    </td>
                                    <td>
                                        <div className="name">
                                            <Link to={`#nqt`}>{user.userName}</Link>
                                        </div>
                                        <div className="d-flex justify-content-start mt-2">
                                            <button
                                                onClick={() => handleStatus(user.id, user.status)}
                                                className={`btn ${user.status === 1 ? 'btn-success' : 'btn-danger'} me-1`}
                                            >
                                                {user.status === 1 ? <FaToggleOn size={24}/> : <FaToggleOff size={24}/>}
                                            </button>
                                            <Link to={`/admin/user/edit/${user.id}`} className='btn btn-primary me-1'>
                                                <FaEdit size={20}/>
                                            </Link>
                                            <button
                                                onClick={() => HandTrash(user.id)}
                                                className="btn btn-danger">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-column">
                                            <span>{user.name}</span>
                                            <Link to={`/admin/notification/add/${user.id}`} className='btn btn-secondary mt-1'>
                                                <IoIosNotifications size={24}/>
                                            </Link>
                                        </div>
                                    </td>
                                    <td>
                                        {user.avatar ? (
                                            <img src={`${urlImageUser}/${user.avatar}`} className="img-fluid user-avatar" alt="User" />
                                        ) : (
                                            <p>Không có ảnh</p>
                                        )}
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>{user.role.role === 3 ? "Người mua" : "Người bán"}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default UserIndex;
