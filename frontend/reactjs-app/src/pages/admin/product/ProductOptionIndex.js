import React, { useEffect, useState } from 'react';
import ProductOptionService from '../../../services/ProductOptionService';
import ProductService from '../../../services/ProductService';
import { FaTrash, FaEdit, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { Link ,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { urlImageProduct } from '../../../config';
import { LocalDateTime, DateTimeFormatter } from 'js-joda';


const ProductOptionIndex = () => {
    const [options, setOptions] = useState([]);
    const [reload, setReload] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate(); 
    const optionsPerPage = 5;
    useEffect(() => {
        (async () => {
            try{
            const result = await ProductOptionService.getAll();
            if (result !== null) {
                console.log("option list: ", result);
            }
            // Filter out sales with status 2
            const filteredSales = result.filter(sale => sale.status !== 2);
            // Sort the filtered sales array by createdAt property from newest to oldest
            filteredSales.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOptions(filteredSales);
        } catch (error) {
            if (error.response && error.response.status === 503) {
                // Nếu lỗi có mã trạng thái 503, điều hướng người dùng đến trang 404
                navigate('/admin/404');
            } else {
            console.error("Error fetching brand:", error);
        }}
        })();
    }, [reload]);

    const HandTrash = async (id) => {
        await ProductOptionService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await ProductOptionService.sitchStatus(id);
            setReload(Date.now());
            toast.success("Thành công");
        } catch (error) {
            console.error('Error switching status:', error);
            toast.error("Đã xảy ra lỗi khi thay đổi trạng thái.");
        }
    };
    const indexOfLastOption = currentPage * optionsPerPage;
    const indexOfFirstOption = indexOfLastOption - optionsPerPage;
    const currentOptions = options.slice(indexOfFirstOption, indexOfLastOption);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(options.length / optionsPerPage); i++) {
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
        <div >
            <section className="content-header my-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Sản phẩm | Lựa chọn của sản phẩm</h1>
                    <button type="button" className="btn btn-warning">
                        <Link to="/admin/product/option-trash" className="text-white text-decoration-none">Thùng rác</Link>
                    </button>
                </div>
            </section>
            <section className="content-body my-2">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th className="text-center" style={{ width: '30px' }}>
                                <input type="checkbox" id="checkAll" />
                            </th>
                            <th>Tên sản phẩm</th>
                            <th>Ảnh</th>
                            <th>Tên lựa chọn</th>
                            <th>Mô tả</th>
                            <th>Các lựa chọn</th>
                            <th>Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentOptions.map((option) => (
                                <ProductOptionTableRow key={option.id} option={option} HandTrash={HandTrash} handleStatus={handleStatus} />
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    );
};

const ProductOptionTableRow = ({ option, HandTrash, handleStatus }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await ProductService.getById(option.productId);
                setProduct(fetchedProduct);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [option.productId]);

    const formatDate = (date) => {
        const dateTime = LocalDateTime.parse(date);
        const formatter = DateTimeFormatter.ofPattern("dd/MM/yy");
        return dateTime.format(formatter);
    };

    return (
        <tr className="datarow">
            <td className="text-center">
                <input type="checkbox" id="checkId" />
            </td>
            <td>
                <div className="name">
                    {product ? (
                        <Link to={`#nqt`}>{product.name}</Link>
                    ) : (
                        <span>Loading...</span>
                    )}
                </div>
                <div className="d-flex justify-content-start">
                    <button
                        onClick={() => handleStatus(option.id, option.status)}
                        className={`btn ${option.status === 1 ? 'btn-success' : 'btn-danger'} me-1`}
                    >
                        {option.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                    <Link to={`/admin/product/option-edit/${option.id}`} className='btn btn-primary me-1'>
                        <FaEdit />
                    </Link>
                    <button
                        onClick={() => HandTrash(option.id)}
                        className="btn btn-danger">
                        <FaTrash />
                    </button>
                </div>
            </td>
            <td>
                {product ? (
                    <img src={`${urlImageProduct}/${product.image}`} className="img-fluid user-avatar" alt="Hinh anh" />
                ) : (
                    <p>Không có ảnh</p>
                )}
            </td>
            <td>{option.name}</td>
            <td>{option.description}</td>
            <td>
                <ul>
                    {option.values && option.values.length > 0 && option.values.map((value, index) => (
                        <li key={index}>{value.value}</li>
                    ))}
                </ul>
            </td>
            <td>{formatDate(option.createdAt)}</td>
        </tr>
    );
};

export default ProductOptionIndex;
