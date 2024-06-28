import React, { useEffect, useState } from 'react';
import InformationService from '../../../services/InformationService';
import { FaToggleOn, FaTrash, FaEdit, FaToggleOff } from 'react-icons/fa';
import { Link , useNavigate
    
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { urlImageInformation } from '../../../config';

const InformationIndex = () => {
    const [informations, setInformations] = useState([]);
    const [reload, setReload] = useState(0);
    const navigate = useNavigate(); 
    const [currentPage, setCurrentPage] = useState(1);
    const informationsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                let result = await InformationService.getAll();
                // Filter out informations with status 2
                result = result.filter(inf => inf.status !== 2);
                // Sort informations by createdAt in descending order
                const sortedData = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setInformations(sortedData);
            } catch (error) {
                if (error.response && error.response.status === 503) {
                    // Nếu lỗi có mã trạng thái 503, điều hướng người dùng đến trang 404
                    navigate('/admin/404');
                } else {
                console.error('Error fetching data:', error);
                }}
        };
        fetchData();
    }, [reload]);

    const HandTrash = async (id) => {
        await InformationService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await InformationService.sitchStatus(id);
            setReload(Date.now());
            toast.success("Thành công");
        } catch (error) {
            console.error('Error switching status:', error);
            toast.error("Đã xảy ra lỗi khi thay đổi trạng thái.");
        }
    };

    const handleDislay = async (id) => {
        await InformationService.display(id);
        setReload(Date.now());
        toast.success("Đã chuyển đổi trưng bày");
    };

    const indexOfLastInformation = currentPage * informationsPerPage;
    const indexOfFirstInformation = indexOfLastInformation - informationsPerPage;
    const currentInformations = informations.slice(indexOfFirstInformation, indexOfLastInformation);
    const totalPages = Math.ceil(informations.length / informationsPerPage);

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
                    <h1>Thông tin cấu hình</h1>
                    <Link to="/admin/information/add" className="btn btn-primary">Thêm mới</Link>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <Link to="/admin/information/trash" className="text-white text-decoration-none">Thùng rác</Link>
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
                            <th>Tên</th>
                            <th>Ảnh</th>
                            <th>Địa chỉ</th>
                            <th>Email</th>
                            <th>Điện thoại</th>
                            <th>Mã số doanh nghiệp</th>
                            <th>Giấy phép</th>
                            <th>Người đại diện</th>
                            <th>Số điện thoại người đại diện</th>
                            <th>Ngày tạo</th>
                            <th>Trưng bày</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentInformations && currentInformations.length > 0 &&
                            currentInformations.map((information, index) => (
                                <tr key={information.id} className="datarow">
                                    <td className="text-center">
                                        <input type="checkbox" id={`checkId${index}`} />
                                    </td>
                                    <td>
                                        <div className="name">
                                            <Link to={`#nqt`}>{information.name}</Link>
                                        </div>
                                        <div className="d-flex justify-content-start mt-2">
                                            <button
                                                onClick={() => handleStatus(information.id)}
                                                className={`btn ${information.status === 1 ? 'btn-success' : 'btn-danger'} me-1`}
                                            >
                                                {information.status === 1 ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                                            </button>
                                            <Link to={`/admin/information/edit/${information.id}`} className='btn btn-primary me-1'>
                                                <FaEdit size={20} />
                                            </Link>
                                            <button
                                                onClick={() => HandTrash(information.id)}
                                                className="btn btn-danger">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        {information.logo ? (
                                            <img src={`${urlImageInformation}/${information.logo}`} className="img-fluid user-avatar" alt="HinhAnh" />
                                        ) : (
                                            <p>Không có ảnh</p>
                                        )}
                                    </td>
                                    <td>{information.address}</td>
                                    <td>{information.email}</td>
                                    <td>{information.phone}</td>
                                    <td>{information.businessNumber}</td>
                                    <td>{information.license}</td>
                                    <td>{information.repersent}</td>
                                    <td>{information.repersentPhone}</td>
                                    <td>{information.createdAt}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDislay(information.id)}
                                            className={`btn ${information.status === 3 ? 'btn-success' : 'btn-danger'} me-1`}
                                        >
                                            {information.status === 3 ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                                        </button>
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

export default InformationIndex;
