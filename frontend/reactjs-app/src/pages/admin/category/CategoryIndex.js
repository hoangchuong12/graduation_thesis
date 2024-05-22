import React, { useEffect, useState } from 'react';
import CategoryService from '../../../services/CategoryService';
import { FaToggleOn, FaTrash, FaEdit, FaToggleOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { urlImageCategory } from '../../../config';

const CategoryIndex = () => {
    const [categories, setCategories] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                let result = await CategoryService.getAll();
                result = result.filter(category => category.status !== 2);
                const sortedCategories = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setCategories(sortedCategories);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        fetchCategories();
    }, [reload]);

    const HandTrash = async (id) => {
        await CategoryService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };
    const handleDislay = async (id) => {
        await CategoryService.display(id);
        setReload(Date.now());
        toast.success("Đã chuyển đổi trưng bày");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await CategoryService.sitchStatus(id);
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
                    <h1>Quản lý loại sản phẩm</h1>
                    <Link to="/admin/category/add" className="btn btn-primary">Thêm mới</Link>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <Link to="/admin/category/trash" className="text-white text-decoration-none">Thùng rác</Link>
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
                            <th>Tên loại</th>
                            <th>Biểu tượng</th>
                            <th>Mô tả</th>
                            <th>Số lượng sản phẩm</th>
                            <th>Ngày tạo</th>
                            <th>ID người tạo</th>
                            <th>Trưng bày</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories && categories.length > 0 &&
                            categories.map((category, index) => (
                                <tr key={category.id} className="datarow">
                                    <td className="text-center">
                                        <input type="checkbox" id={`checkId${index}`} />
                                    </td>
                                    <td>
                                        <div className="name">
                                            <Link to={`#nqt`}>{category.name}</Link>
                                        </div>
                                        <div className="d-flex justify-content-start mt-2">
                                            <button
                                                onClick={() => handleStatus(category.id)}
                                                className={`btn ${category.status === 1 ? 'btn-success' : 'btn-danger'} me-1`}
                                            >
                                                {category.status === 1 ? <FaToggleOn size={24}/> : <FaToggleOff size={24}/>}
                                            </button>
                                            <Link to={`/admin/category/edit/${category.id}`} className='btn btn-primary me-1'>
                                                <FaEdit size={20}/>
                                            </Link>
                                            <button
                                                onClick={() => HandTrash(category.id)}
                                                className="btn btn-danger">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        {category.image ? (
                                            <img src={`${urlImageCategory}/${category.image}`} className="img-fluid user-avatar" alt="Hinh anh" />
                                        ) : (
                                            <p>Không có ảnh</p>
                                        )}
                                    </td>
                                    <td>{category.description}</td>
                                    <td>{category.productQuantity}</td>
                                    <td>{category.createdAt}</td>
                                    <td>{category.createdBy}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDislay(category.id)}
                                            className={`btn ${category.status === 3 ? 'btn-success' : 'btn-danger'} me-1`}
                                        >
                                            {category.status === 3 ? <FaToggleOn size={24}/> : <FaToggleOff size={24}/>}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default CategoryIndex;
