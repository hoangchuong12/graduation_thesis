import React, { useEffect, useState } from 'react';
import ProductStoreService from '../../../services/ProductStoreService';
import ProductService from '../../../services/ProductService';
// import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { urlImageProduct } from '../../../config';

const ProductExportIndex = () => {
    const [exports, setExports] = useState([]);
    const [reload] = useState(0);

    useEffect(() => {
        const fetchExports = async () => {
            try {
                const result = await ProductStoreService.getExports();
                if(result){
                    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setExports(result);
                }
            } catch (error) {
                console.error("Error fetching exports:", error);
            }
        };
        fetchExports();
    }, [reload]);
    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Quản lý lịch sử xuất hàng</h1>
                <Link to="/admin/slider/add" className="btn btn-primary">Thêm mới</Link>
            </section>
            <section className="content-body my-2">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: '30px' }}>
                                <input type="checkbox" id="checkAll" />
                            </th>
                            <th>Tên sản phẩm</th>
                            <th>Ảnh</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Ngày xuất</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exports && exports.length > 0 &&
                            exports.map((exportItem, index) => (
                                <ProductExportTableRow key={exportItem.id} exportItem={exportItem} />
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    );
};

const ProductExportTableRow = ({ exportItem }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await ProductService.getById(exportItem.productId);
                setProduct(fetchedProduct);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };

        fetchProduct();
    }, [exportItem]);

    function formatDateToLocalDate(datetimeString) {
        const date = new Date(datetimeString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    }

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
                <div className="function_style">
                    {/* <Link to={`/admin/product/export/detail/${exportItem.id}`} className='px-1 text-primary'>
                        <FaEye size={24} />
                    </Link> */}
                </div>
            </td>
            <td>
                {product ? (
                    <img src={`${urlImageProduct}/${product.image}`} className="img-fluid user-avatar" alt="Hinh anh" />
                ) : (
                    <p>Không có ảnh</p>
                )}
            </td>
            <td>{exportItem.price}</td>
            <td>{exportItem.quantity}</td>
            <td>{formatDateToLocalDate(exportItem.createdAt)}</td>
        </tr>
    );
};

export default ProductExportIndex;
