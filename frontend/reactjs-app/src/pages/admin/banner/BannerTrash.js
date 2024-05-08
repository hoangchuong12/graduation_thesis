import React, { useEffect, useState } from 'react';
import UserService from '../../../services/UserService';
import { FaArrowAltCircleLeft, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import BannerService from '../../../services/BannerService';
import { urlImageBanner } from '../../../config';
const BannerTrash = () => {
    const [banners, setBanners] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        fetchTrashedCategories();
    }, [reload]);

    const fetchTrashedCategories = async () => {
        try {
            const result = await BannerService.getAll(); // Ensure this fetches trashed users
            setBanners(result.filter(banner => banner.status === 2)); // Assuming status 2 is for trashed users
        } catch (error) {
            console.error('Error fetching trashed users:', error);
            toast.error('Đã xảy ra lỗi khi tải danh sách đã xóa.');
        }
    };

    const restorebanner = async (id) => {
        try {
            await BannerService.sitchStatus(id);
            setReload(Date.now());
            toast.success('Khôi phục thành công');
        } catch (error) {
            console.error('Error restoring user:', error);
            toast.error('Đã xảy ra lỗi khi khôi phục người dùng.');
        }
    };

    const deletebanner = async (id) => {
        try {
            await BannerService.delete(id);
            setReload(Date.now());
            toast.success('Xóa vĩnh viễn thành công');
        } catch (error) {
            console.error('Error deleting permanently:', error);
            toast.error('Đã xảy ra lỗi khi xóa vĩnh viễn.');
        }
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">banner : Thùng rác</h1>
                
                <div className="row mt-3 align-items-center">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <a href="/admin/banner/index">Về danh sách</a>
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
                            <th>Tên loại</th>
                            <th>Biểu tượng</th>
                            <th>Mô tả</th>
                            <th>Ngày tạo</th>
                            <th>ID người tạo</th>
                        </tr>
                    </thead>

                    <tbody>
                        {banners && banners.map((banner, index) => (
                            <tr key={banner.id} className="datarow">
                                <td className="text-center">
                                    <input type="checkbox" id={`checkId${index}`} />
                                </td>
                                <td>
                                    <div className="name">
                                        <a href="menu_index.html">{banner.name}</a>
                                    </div>
                                    <div className="function_style">
                                        <button
                                            onClick={() => restorebanner(banner.id)}
                                            className="border-0 px-1 text-success"
                                        >
                                            <FaArrowAltCircleLeft />
                                        </button>
                                        <button
                                            onClick={() => deletebanner(banner.id)}
                                            className="btn-none px-1 text-danger"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                                <td>
                                            {banner.image ? (
                                                <img src={urlImageBanner + banner.image} className="img-fluid user-avatar" alt="Hinh anh" />
                                            ) : (
                                                <p>Không có ảnh</p>
                                            )}
                                        </td>
                                        <td>{banner.desciption}</td>
                                        <td>{banner.createdAt}</td>
                                        <td>{banner.createdBy}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </section>
        </div>
    );
}

export default BannerTrash;
