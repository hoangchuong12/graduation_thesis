import React, { useEffect, useState } from 'react';
import UserService from '../../../services/UserService';
import { FaToggleOn, FaTrash, FaEdit, FaToggleOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { urlImageUser } from '../../../config';


const StaffIndex = () => {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let result = await UserService.getStaffs();
                // Filter out users with status 2 and the admin user
                result = result.filter(user => user.status !== 2 && user.userName !== "admin");
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
            await UserService.switchStatus(id);
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
                    <h1>Danh sách thành viên</h1>
                    <Link to="/admin/staff/add" className="btn btn-primary">Thêm mới</Link>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <Link to="/admin/staff/trash" className="text-white text-decoration-none">Thùng rác</Link>
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
                                            <Link to={`/admin/staff/edit/${user.id}`}>
                                                {user.userName}
                                            </Link>
                                        </div>
                                        <div className="d-flex justify-content-start mt-2">
                                            <button
                                                onClick={() => handleStatus(user.id, user.status)}
                                                className={`btn ${user.status === 1 ? 'btn-success' : 'btn-danger'} me-1`}
                                            >
                                                {user.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                            </button>
                                            <Link to={`/admin/staff/edit/${user.id}`} className='btn btn-primary me-1'>
                                                <FaEdit />
                                            </Link>
                                            <button
                                                onClick={() => HandTrash(user.id)}
                                                className="btn btn-danger">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>
                                        <img src={`${urlImageUser}/${user.avatar}`} className="img-fluid user-avatar" alt="User" />
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>Quản trị</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default StaffIndex;
