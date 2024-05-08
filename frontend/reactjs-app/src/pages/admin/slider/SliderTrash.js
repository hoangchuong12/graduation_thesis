import React, { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {  urlImageSlider } from '../../../config';
import Sliderervice from '../../../services/SliderService';

const SliderTrash = () => {
    const [sliders, setSliders] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        fetchTrashedCategories();
    }, [reload]);

    const fetchTrashedCategories = async () => {
        try {
            const result = await Sliderervice.getAll(); // Ensure this fetches trashed users
            setSliders(result.filter(slider => slider.status === 2)); // Assuming status 2 is for trashed users
        } catch (error) {
            console.error('Error fetching trashed users:', error);
            toast.error('Đã xảy ra lỗi khi tải danh sách đã xóa.');
        }
    };

    const restoreSlider = async (id) => {
        try {
            await Sliderervice.sitchStatus(id);
            setReload(Date.now());
            toast.success('Khôi phục thành công');
        } catch (error) {
            console.error('Error restoring user:', error);
            toast.error('Đã xảy ra lỗi khi khôi phục người dùng.');
        }
    };

    const deleteSlider = async (id) => {
        try {
            await Sliderervice.delete(id);
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
                <h1 className="d-inline">slider : Thùng rác</h1>
                
                <div className="row mt-3 align-items-center">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <a href="/admin/slider/index">Về danh sách</a>
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
                        {sliders && sliders.map((slider, index) => (
                            <tr key={slider.id} className="datarow">
                                <td className="text-center">
                                    <input type="checkbox" id={`checkId${index}`} />
                                </td>
                                <td>
                                    <div className="name">
                                        <a href="menu_index.html">{slider.name}</a>
                                    </div>
                                    <div className="function_style">
                                        <button
                                            onClick={() => restoreSlider(slider.id)}
                                            className="border-0 px-1 text-success"
                                        >
                                            <FaArrowAltCircleLeft />
                                        </button>
                                        <button
                                            onClick={() => deleteSlider(slider.id)}
                                            className="btn-none px-1 text-danger"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                                <td>
                                            {slider.image ? (
                                                <img src={urlImageSlider + slider.image} className="img-fluid user-avatar" alt="Hinh anh" />
                                            ) : (
                                                <p>Không có ảnh</p>
                                            )}
                                        </td>
                                        <td>{slider.desciption}</td>
                                        <td>{slider.createdAt}</td>
                                        <td>{slider.createdBy}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </section>
        </div>
    );
}

export default SliderTrash;
