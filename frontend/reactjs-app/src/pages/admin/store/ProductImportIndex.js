import React, { useEffect, useState } from 'react';
import ProductStoreService from '../../../services/ProductStoreService';
import ProductService from '../../../services/ProductService';
import ProductOptionService from '../../../services/ProductOptionService';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { urlImageProduct } from '../../../config';


const ProductImportIndex = () => {
    const [imports, setImports] = useState([]);
    const [reload] = useState(0);

    useEffect(() => {
        const fetchImports = async () => {
            const result = await ProductStoreService.getImports();
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setImports(result);
        };
        fetchImports();
    }, [reload]);

    return (
        <div className="container mt-4">
            <section className="content-header my-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Quản lý nhập hàng</h1>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <Link to="/admin/product/store/index" className="text-white text-decoration-none">Về kho hàng</Link>
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
                            <th>Giá nhập</th>
                            <th>Số lượng nhập</th>
                            <th>Mô tả</th>
                            <th>ID User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {imports && imports.length > 0 &&
                            imports.map((importItem, index) => (
                                <ProductTableRow key={index} importItem={importItem} />
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    );
};

const ProductTableRow = ({ importItem }) => {
    const [store, setStore] = useState(null);
    const [product, setProduct] = useState(null);
    const [optionValue, setOptionValue] = useState(null);
    const [option, setOption] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedStore = await ProductStoreService.getById(importItem.storeId);
                setStore(fetchedStore);

                if (fetchedStore) {
                    const fetchedProduct = await ProductService.getById(fetchedStore.productId);
                    setProduct(fetchedProduct);
                }

                if (fetchedStore && fetchedStore.optionValueId !== null) {
                    const fetchedOptionValue = await ProductOptionService.getOptionValue(fetchedStore.optionValueId);
                    setOptionValue(fetchedOptionValue);

                    if (fetchedOptionValue) {
                        const fetchedOption = await ProductOptionService.getById(fetchedOptionValue.optionId);
                        setOption(fetchedOption);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [importItem]);

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
                    <Link to={store && `/admin/product/import/edit/${importItem.id}`} className='btn btn-primary me-1'>
                        <FaEdit size={24} />
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
            <td>{importItem && importItem.price}</td>
            <td>{importItem && importItem.quantity}</td>
            <td>{importItem && importItem.description}</td>
            <td>{importItem && importItem.createdBy}</td>
        </tr>
    );
};

export default ProductImportIndex;
