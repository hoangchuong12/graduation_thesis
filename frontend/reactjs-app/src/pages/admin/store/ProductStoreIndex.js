import React, { useEffect, useState } from 'react';
import ProductStoreService from '../../../services/ProductStoreService';
import ProductService from '../../../services/ProductService';
import ProductOptionService from '../../../services/ProductOptionService';
import { FaEdit, FaDollyFlatbed } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { urlImageProduct } from '../../../config';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductStoreIndex = () => {
    const [stores, setStores] = useState([]);
    const [reload] = useState(0);

    useEffect(() => {
        const fetchStores = async () => {
            const result = await ProductStoreService.getAll();
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setStores(result);
        };
        fetchStores();
    }, [reload]);

    return (
        <div className="content mt-4">
            <section className="content-header my-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Quản lý kho hàng</h1>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <Link to="/admin/product/import/index" className="text-white text-decoration-none">Lịch sử nhập hàng</Link>
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
                            <th>Tên sản phẩm</th>
                            <th>Ảnh</th>
                            <th>Sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Đã bán</th>
                            <th>ID người dùng sở hữu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores && stores.length > 0 &&
                            stores.map((store, index) => (
                                <ProductTableRow key={store.id} store={store} />
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    );
};

const ProductTableRow = ({ store }) => {
    const [product, setProduct] = useState(null);
    const [optionValue, setOptionValue] = useState(null);
    const [option, setOption] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await ProductService.getById(store.productId);
                setProduct(fetchedProduct);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        const fetchOptionValue = async () => {
            try {
                const fetched = await ProductOptionService.getOptionValue(store.optionValueId);

                if (fetched !== null) {
                    const option = await ProductOptionService.getById(fetched.optionId);
                    setOption(option);
                }
                setOptionValue(fetched);
            } catch (error) {
                console.error('Error fetching option value:', error);
            }
        };
        fetchOptionValue();
        fetchProduct();
    }, [store]);

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
                <div className="d-flex justify-content-start mt-2">
                    <Link to={`/admin/product/store/edit/${store.id}`} className='btn btn-primary me-1'>
                        <FaEdit size={24}/>
                    </Link>
                    <Link to={`/admin/product/import/add/${store.id}`} className="btn btn-secondary me-1">
                        <FaDollyFlatbed size={24} />
                    </Link>
                </div>
            </td>
            <td>
                {product ? (
                    <img src={`${urlImageProduct}/${product.image}`} className="img-fluid user-avatar" alt="Hinh anh" />
                ) : (
                    <p>Không có ảnh</p>
                )}
            </td>
            <td>{option ? `${option.name} / ${optionValue ? optionValue.value : ''}` : 'Loading...'}</td>
            <td>{store.price}</td>
            <td>{store.quantity}</td>
            <td>{store.soldQuantity}</td>
            <td>{store.createdBy}</td>
        </tr>
    );
};

export default ProductStoreIndex;
