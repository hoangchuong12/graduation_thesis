import React, { useEffect, useState } from 'react';
import { FaToggleOn, FaTrash, FaEdit, FaToggleOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { urlImageSlider } from '../../../config';
import Sliderervice from '../../../services/SliderService';

const SliderIndex = () => {
    const [sliders, setSliders] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                let result = await Sliderervice.getAll();
                result = result.filter(slider => slider.status !== 2);
                const sortedSliders = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setSliders(sortedSliders);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        fetchSliders();
    }, [reload]);

    const HandTrash = async (id) => {
        await Sliderervice.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await Sliderervice.sitchStatus(id);
            setReload(Date.now());
            toast.success("Thành công");
        } catch (error) {
            console.error('Error switching status:', error);
            toast.error("Đã xảy ra lỗi khi thay đổi trạng thái.");
        }
    };
    return (
        <div className="content mt-4">
            <section className="content-header my-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Quản lý slider</h1>
                    <Link to="/admin/slider/add" className="btn btn-primary">Thêm mới</Link>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <Link to="/admin/slider/trash" className="text-white text-decoration-none">Thùng rác</Link>
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
                        </tr>
                    </thead>
                    <tbody>
                        {sliders && sliders.length > 0 &&
                            sliders.map((slider, index) => {
                                return (
                                    <tr key={slider.id} className="datarow">
                                        <td className="text-center">
                                            <input type="checkbox" id={`checkId${index}`} />
                                        </td>
                                        <td>
                                            <div className="name">
                                                <Link to={`/admin/slider/edit/${slider.id}`}>
                                                    {slider.name}
                                                </Link>
                                            </div>
                                            <div className="d-flex justify-content-start mt-2">
                                                <button
                                                    onClick={() => handleStatus(slider.id, slider.status)}
                                                    className={`btn ${slider.status === 1 ? 'btn-success' : 'btn-danger'} me-1`}
                                                >
                                                    {slider.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                                </button>
                                                <Link to={`/admin/slider/edit/${slider.id}`} className='btn btn-primary me-1'>
                                                    <FaEdit />
                                                </Link>
                                                <button
                                                    onClick={() => HandTrash(slider.id)}
                                                    className="btn btn-danger">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            {slider.image ? (
                                                <img src={`${urlImageSlider}/${slider.image}`} className="img-fluid user-avatar" alt="Hinh anh" />
                                            ) : (
                                                <p>Không có ảnh</p>
                                            )}
                                        </td>
                                        <td>{slider.desciption}</td>
                                        <td>{slider.createdAt}</td>
                                        <td>{slider.createdBy}</td>
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

export default SliderIndex;
