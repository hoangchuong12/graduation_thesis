import React, { useEffect, useState } from 'react';
import RoleService from '../../../services/RoleService';
import { FaTrash, FaEdit, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const RoleIndex = () => {
    const [roles, setRoles] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        (async () => {
            const result = await RoleService.getAll();
            // Sắp xếp mảng roles tăng dần theo giá trị quyền
            result.sort((a, b) => a.role - b.role);
            setRoles(result);
        })();
    }, [reload]);

    const HandTrash = async (id) => {
        await RoleService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await RoleService.sitchStatus(id);
            setReload(Date.now());
            toast.success("Thành công");
        } catch (error) {
            console.error('Error switching status:', error);
            toast.error("Đã xảy ra lỗi khi thay đổi trạng thái.");
        }
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Phân Quyền</h1>
                <Link to="/admin/role/add" className="btn-add">Thêm mới</Link>
                <div className="row mt-3 align-items-center">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <a href="/admin/role/trash">Thùng rác</a>
                        </button>
                    </div>
                </div>
            </section>
            <section className="content-body my-2">
                <table className="table table-bordered">
                    <thead>
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
                        {roles && roles.length > 0 &&
                            roles.map((role, index) => {
                                // Chỉ hiển thị status khác 2
                                if (role.status !== 2) {
                                    return (
                                        <tr key={role.id} className="datarow">
                                            <td className="text-center">
                                                <input type="checkbox" id="checkId" />
                                            </td>
                                            <td>
                                                <div className="name">
                                                    <a href="menu_index.html">
                                                        {role.name}
                                                    </a>
                                                </div>
                                                <div className="function_style">
                                                    <button
                                                        onClick={() => handleStatus(role.id, role.status)}
                                                        className={
                                                            role.status === 1 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"
                                                        }>
                                                        {role.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                                    </button>
                                                    <Link to={"/admin/role/edit/" + role.id} className='px-1 text-primary'>
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        onClick={() => HandTrash(role.id)}
                                                        className="btn-none px-1 text-danger">
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                            <td>{role.description}</td>
                                            <td>{role.role}</td>
                                        </tr>
                                    );
                                }
                                // Add a return statement for the case where the condition isn't met
                                return null;
                            })
                        }
                    </tbody>
                </table>

            </section>
        </div>
    );
};
export default RoleIndex;
