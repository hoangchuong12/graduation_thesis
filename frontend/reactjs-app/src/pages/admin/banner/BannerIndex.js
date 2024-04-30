import React, { useEffect, useState } from 'react';
import { FaToggleOn, FaTrash, FaEdit, FaToggleOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import BannerService from '../../../services/BannerService';
import { urlImageBanner } from '../../../config';

const BannerIndex = () => {
    const [banners, setBanners] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const result = await BannerService.getAll();
                if (Array.isArray(result)) {
                    const sortedBanners = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setBanners(sortedBanners);
                } else {
                    console.error("Error fetching banners: Data returned is not an array.");
                }
            } catch (error) {
                console.error("Error fetching banners:", error);
            }
        })();
    }, [reload]);

    const HandTrash = async (id) => {
        await BannerService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Danh sách người dùng</h1>
                <Link to="/admin/banner/add" className="btn-add">Thêm mới</Link>
                <div className="row mt-3 align-items-center">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <a href="/admin/banner/trash">Thùng rác</a>
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
                            <th>id banner</th>
                            <th>name banner</th>
                            <th>image banner</th>
                            <th>description</th>
                        </tr>
                    </thead>
                    <tbody>
                    {banners && banners.length > 0 &&
                            banners.map((banner, index) => {
                                return (
                                    <tr key={banner.id} className="datarow">
                                        <td className="text-center">
                                            <input type="checkbox" id={`checkId${index}`} />
                                        </td>
                                   
                                        <td>
                                            <div className="name">
                                                <a href="menu_index.html">
                                                    {banner.id}
                                                </a>
                                            </div>
                                            <div className="function_style">
                                                <Link to={"/admin/user/edit/" + banner.id} className='px-1 text-primary'>
                                                    <FaEdit size={20}/>
                                                </Link>
                                                <button
                                                    onClick={() => HandTrash(banner.id)}
                                                    className="btn-none px-1 text-danger">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                             <td>{banner.name}</td>     
                                        <td>
                                            <img src={urlImageBanner + banner.image} className="img-fluid user-avatar" alt="User" />
                                        </td>
                                        <td>{banner.description}</td>                                   
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default BannerIndex;
