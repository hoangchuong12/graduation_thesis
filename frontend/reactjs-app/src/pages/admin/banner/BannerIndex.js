import React, { useEffect, useState } from 'react';
import { FaToggleOn, FaTrash, FaEdit, FaToggleOff } from 'react-icons/fa';
import { Link ,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

import BannerService from '../../../services/BannerService';
import { urlImageBanner } from '../../../config';

const BannerIndex = () => {
    const [banners, setBanner] = useState([]);
    const [reload, setReload] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate(); 
    const bannersPerPage = 5;

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                let result = await BannerService.getAll();
                result = result.filter(banner => banner.status !== 2);
                const sortedBanner = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setBanner(sortedBanner);
            } catch (error) {
                if (error.response && error.response.status === 503) {
                    // Nếu lỗi có mã trạng thái 503, điều hướng người dùng đến trang 404
                    navigate('/admin/404');
                } else {
                console.error('Error fetching data:', error);
                }}
        };
        fetchBanner();
    }, [reload]);

    const HandTrash = async (id) => {
        await BannerService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await BannerService.sitchStatus(id);
            setReload(Date.now());
            toast.success("Thành công");
        } catch (error) {
            console.error('Error switching status:', error);
            toast.error("Đã xảy ra lỗi khi thay đổi trạng thái.");
        }
    };

    const indexOfLastBanner = currentPage * bannersPerPage;
    const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
    const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);
    const totalPages = Math.ceil(banners.length / bannersPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                    <button
                        onClick={() => handlePageChange(i)}
                        className="page-link"
                    >
                        {i}
                    </button>
                </li>
            );
        }
        return pages;
    };

    return (
        <div className="container mt-4">
            <section className="content-header my-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Quản lý banner</h1>
                    <Link to="/admin/banner/add" className="btn btn-primary">Thêm mới</Link>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <Link to="/admin/banner/trash" className="text-white text-decoration-none">Thùng rác</Link>
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
                            <th>Ngày tạo</th>
                            <th>ID người tạo</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBanners && currentBanners.length > 0 &&
                            currentBanners.map((banner, index) => (
                                <tr key={banner.id} className="datarow">
                                    <td className="text-center">
                                        <input type="checkbox" id={`checkId${index}`} />
                                    </td>
                                    <td>
                                        <div className="name">
                                            <Link to={`#nqt`}>{banner.name}</Link>
                                        </div>
                                    </td>
                                    <td>
                                        {banner.image ? (
                                            <img src={`${urlImageBanner}/${banner.image}`} className="img-fluid user-avatar" alt="Hinh anh" />
                                        ) : (
                                            <p>Không có ảnh</p>
                                        )}
                                    </td>
                                    <td>{banner.description}</td>
                                    <td>{banner.createdAt}</td>
                                    <td>{banner.createdBy}</td>
                                    <td>
                                        <div className="d-flex justify-content-start">
                                            <button
                                                onClick={() => handleStatus(banner.id, banner.status)}
                                                className={`btn ${banner.status === 1 ? 'btn-success' : 'btn-danger'} me-1`}
                                            >
                                                {banner.status === 1 ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                                            </button>
                                            <Link to={`/admin/banner/edit/${banner.id}`} className='btn btn-primary me-1'>
                                                <FaEdit size={20} />
                                            </Link>
                                            <button
                                                onClick={() => HandTrash(banner.id)}
                                                className="btn btn-danger">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <nav>
                    <ul className="pagination justify-content-center">
                        {renderPagination()}
                    </ul>
                </nav>
            </section>
        </div>
    );
};

export default BannerIndex;
