import React, { useEffect, useState } from 'react';
import RoleService from '../../../services/RoleService';
import { FaTrash, FaEdit, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { Link ,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RoleIndex = () => {
    const [roles, setRoles] = useState([]);
    const [reload, setReload] = useState(0);
    const navigate = useNavigate(); 
    const [currentPage, setCurrentPage] = useState(1);
    const rolesPerPage = 5; // Số lượng vai trò trên mỗi trang

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const result = await RoleService.getAll();
                // Sắp xếp mảng roles tăng dần theo giá trị quyền
                result.sort((a, b) => a.role - b.role);
                setRoles(result);
            } catch (error) {
                if (error.response && error.response.status === 503) {
                    // Nếu lỗi có mã trạng thái 503, điều hướng người dùng đến trang 404
                    navigate('/admin/404');
                } else {
                console.error("Error fetching roles:", error);
                toast.error("Failed to fetch roles!");
            }}
        };

        fetchRoles();
    }, [reload]);

    const HandTrash = async (id) => {
        await RoleService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await RoleService.switchStatus(id);
            setReload(Date.now());
            toast.success("Thành công");
        } catch (error) {
            console.error('Error switching status:', error);
            toast.error("Đã xảy ra lỗi khi thay đổi trạng thái.");
        }
    };

    const indexOfLastRole = currentPage * rolesPerPage;
    const indexOfFirstRole = indexOfLastRole - rolesPerPage;
    const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(roles.length / rolesPerPage); i++) {
            pageNumbers.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i)}>{i}</button>
                </li>
            );
        }

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {pageNumbers}
                </ul>
            </nav>
        );
    };

    return (
        <div className="container m-4">
            <section className="content-header my-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Phân Quyền</h1>
                    <Link to="/admin/role/add" className="btn btn-primary">Thêm mới</Link>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <Link to="/admin/role/trash" className="text-white text-decoration-none">Thùng rác</Link>
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
                            <th>Tên quyền</th>
                            <th>Mô tả</th>
                            <th>Giá trị quyền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRoles.map((role) => (
                            <tr key={role.id} className="datarow">
                                <td className="text-center">
                                    <input type="checkbox" id={`checkId${role.id}`} />
                                </td>
                                <td>
                                    <div className="name">
                                        <Link to={`/admin/role/edit/${role.id}`}>
                                            {role.name}
                                        </Link>
                                    </div>
                                    <div className="d-flex justify-content-start mt-2">
                                        <button
                                            onClick={() => handleStatus(role.id, role.status)}
                                            className={`btn ${role.status === 1 ? 'btn-success' : 'btn-danger'} me-1`}
                                        >
                                            {role.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                        </button>
                                        <Link to={`/admin/role/edit/${role.id}`} className='btn btn-primary me-1'>
                                            <FaEdit />
                                        </Link>
                                        <button
                                            onClick={() => HandTrash(role.id)}
                                            className="btn btn-danger">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                                <td>{role.description}</td>
                                <td>{role.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            {renderPageNumbers()}
        </div>
    );
};

export default RoleIndex;
