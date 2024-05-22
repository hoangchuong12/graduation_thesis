import React, { useEffect, useState } from 'react';
import BrandService from '../../../services/BrandService';
import { FaToggleOn, FaTrash, FaEdit, FaToggleOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { urlImageBrand } from '../../../config';

const BrandIndex = () => {
    const [brands, setBrands] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                let result = await BrandService.getAll();
                result = result.filter(brand => brand.status !== 2);
                const sortedBrands = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setBrands(sortedBrands);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };
        fetchBrands();
    }, [reload]);

    const HandTrash = async (id) => {
        await BrandService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };
    const handleDislay = async (id) => {
        await BrandService.display(id);
        setReload(Date.now());
        toast.success("Đã chuyển đổi trưng bày");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await BrandService.sitchStatus(id);
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
                    <h1>Quản lý thương hiệu</h1>
                    <Link to="/admin/brand/add" className="btn btn-primary">Thêm mới</Link>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <Link to="/admin/brand/trash" className="text-white text-decoration-none">Thùng rác</Link>
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
                            <th>Tên thương hiệu</th>
                            <th>Logo</th>
                            <th>Mô tả</th>
                            <th>Ngày tạo</th>
                            <th>ID người dùng sở hữu</th>
                            <th>Trưng bày</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands && brands.length > 0 &&
                            brands.map((brand, index) => (
                                <tr key={brand.id} className="datarow">
                                    <td className="text-center">
                                        <input type="checkbox" id={`checkId${index}`} />
                                    </td>
                                    <td>
                                        <div className="name">
                                            <Link to={`#nqt`}>{brand.name}</Link>
                                        </div>
                                        <div className="d-flex justify-content-start mt-2">
                                            <button
                                                onClick={() => handleStatus(brand.id)}
                                                className={`btn ${brand.status === 1 ? 'btn-success' : 'btn-danger'} me-1`}
                                            >
                                                {brand.status === 1 ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                                            </button>
                                            <Link to={`/admin/brand/edit/${brand.id}`} className='btn btn-primary me-1'>
                                                <FaEdit size={20} />
                                            </Link>
                                            <button
                                                onClick={() => HandTrash(brand.id)}
                                                className="btn btn-danger">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        {brand.image ? (
                                            <img src={`${urlImageBrand}/${brand.image}`} className="img-fluid user-avatar" alt="Hinh anh" />
                                        ) : (
                                            <p>Không có ảnh</p>
                                        )}
                                    </td>
                                    <td>{brand.description}</td>
                                    <td>{brand.createdAt}</td>
                                    <td>{brand.createdBy}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDislay(brand.id)}
                                            className={`btn ${brand.status === 3 ? 'btn-success' : 'btn-danger'} me-1`}
                                        >
                                            {brand.status === 3 ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
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
export default BrandIndex;
