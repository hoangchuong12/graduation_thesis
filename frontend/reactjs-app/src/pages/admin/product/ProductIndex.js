import React, { useEffect, useState } from 'react';
import ProductService from '../../../services/ProductService';
import BrandService from '../../../services/BrandService';
import { FaToggleOn, FaTrash, FaEdit, FaToggleOff, FaTag, FaHandLizard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { urlImageProduct } from '../../../config';
import { MdOutlineCollections } from "react-icons/md";


const ProductIndex = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(0);
    const [brandNames, setBrandNames] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let result = await ProductService.getAll();
                result = result.filter(product => product.status !== 2);
                const sortedProducts = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setProducts(sortedProducts);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        fetchProducts();
    }, [reload]);

    useEffect(() => {
        const fetchBrandNames = async () => {
            const names = {};
            for (const product of products) {
                try {
                    if(product.brandId !== null){
                        const brand = await BrandService.getById(product.brandId);
                        names[product.brandId] = brand !== null ? brand.name : "N/A";
                    }else{
                        names[product.brandId] = "N/A";
                    } 
                } catch (error) {
                    console.error("Error fetching brand:", error);
                    names[product.brandId] = "N/A";
                }
            }
            setBrandNames(names);
        };
        fetchBrandNames();
    }, [products]);

    const HandTrash = async (id) => {
        await ProductService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await ProductService.sitchStatus(id);
            setReload(Date.now());
            toast.success("Thành công");
        } catch (error) {
            console.error('Error switching status:', error);
            toast.error("Đã xảy ra lỗi khi thay đổi trạng thái.");
        }
    };

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

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
        <div className="mt-4">
            <section className="content-header my-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Quản lý sản phẩm</h1>
                    <Link to="/admin/product/add" className="btn btn-primary">Thêm mới</Link>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <Link to="/admin/product/trash" className="text-white text-decoration-none">Thùng rác</Link>
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
                            <th>Thương hiệu</th>
                            <th>Ảnh</th>
                            <th>Mô tả</th>
                            <th>Đánh giá</th>
                            <th>Ngày tạo</th>
                            <th>ID người tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts && currentProducts.length > 0 &&
                            currentProducts.map((product, index) => {
                                return (
                                    <tr key={product.id} className="datarow">
                                        <td className="text-center">
                                            <input type="checkbox" id={`checkId${index}`} />
                                        </td>
                                        <td>
                                            <div className="name">
                                                <a href="menu_index.html">
                                                    {product.name}
                                                </a>
                                            </div>
                                            <div className="d-flex justify-content-start">
                                                <button
                                                    onClick={() => handleStatus(product.id, product.status)}
                                                    className={`btn ${product.status === 1 ? 'btn-success' : 'btn-danger'} me-1`}
                                                >
                                                    {product.status === 1 ? <FaToggleOn size={24}/> : <FaToggleOff size={24}/>}
                                                </button>
                                                <Link to={"/admin/product/edit/" + product.id} className='btn btn-primary me-1'>
                                                    <FaEdit size={20}/>
                                                </Link>
                                                <Link to={'/admin/product/sale-add/' + product.id} className="btn btn-info me-1">
                                                    <FaTag />
                                                </Link>
                                                <Link to={'/admin/product/option-add/' + product.id} className="btn btn-secondary me-1">
                                                    <FaHandLizard />
                                                </Link>
                                                <Link to={'/admin/product/gallary-index/' + product.id} className="btn btn-light me-1">
                                                    <MdOutlineCollections size={24}/>
                                                </Link>
                                                <button 
                                                    onClick={() => HandTrash(product.id)}
                                                    className="btn btn-danger">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                        <td>{brandNames[product.brandId]}</td>
                                        <td>
                                            {product.image ? (
                                                <img src={urlImageProduct + product.image} className="img-fluid user-avatar" alt="Hinh anh" />
                                            ) : (
                                                <p>Không có ảnh</p>
                                            )}
                                        </td>
                                        <td>{product.description}</td>
                                        <td>{product.evaluate}</td>
                                        <td>{product.createdAt}</td>
                                        <td>{product.createdBy}</td>
                                    </tr>
                                );
                            })
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

export default ProductIndex;
