import React, { useEffect, useState } from 'react';
import TagService from '../../../services/TagService';
import { FaToggleOn, FaTrash, FaEdit, FaToggleOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { urlImageTag } from '../../../config';


const TagIndex = () => {
    const [tags, setTags] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                let result = await TagService.getAll();
                result = result.filter(tag => tag.status !== 2);
                const sortedTags = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setTags(sortedTags);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        fetchTags();
    }, [reload]);

    const HandTrash = async (id) => {
        await TagService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };
    const handleDislay = async (id) => {
        await TagService.display(id);
        setReload(Date.now());
        toast.success("Đã chuyển đổi trưng bày");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await TagService.sitchStatus(id);
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
                    <h1>Quản lý nhãn</h1>
                    <Link to="/admin/tag/add" className="btn btn-primary">Thêm mới</Link>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <Link to="/admin/tag/trash" className="text-white text-decoration-none">Thùng rác</Link>
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
                            <th>Tên nhãn</th>
                            <th>Biểu tượng</th>
                            <th>Mô tả</th>
                            <th>Ngày tạo</th>
                            <th>ID người tạo</th>
                            <th>Trưng bày</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags && tags.length > 0 &&
                            tags.map((tag, index) => (
                                <tr key={tag.id} className="datarow">
                                    <td className="text-center">
                                        <input type="checkbox" id={`checkId${index}`} />
                                    </td>
                                    <td>
                                        <div className="name">
                                            <Link to={`/admin/tag/edit/${tag.id}`}>
                                                {tag.name}
                                            </Link>
                                        </div>
                                        <div className="d-flex justify-content-start mt-2">
                                            <button
                                                onClick={() => handleStatus(tag.id, tag.status)}
                                                className={`btn ${tag.status === 1 ? 'btn-success' : 'btn-danger'} me-1`}
                                            >
                                                {tag.status === 1 ? <FaToggleOn size={24}/> : <FaToggleOff size={24}/>}
                                            </button>
                                            <Link to={`/admin/tag/edit/${tag.id}`} className='btn btn-primary me-1'>
                                                <FaEdit size={20}/>
                                            </Link>
                                            <button
                                                onClick={() => HandTrash(tag.id)}
                                                className="btn btn-danger">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        {tag.image ? (
                                            <img src={`${urlImageTag}/${tag.image}`} className="img-fluid user-avatar" alt="Hinh anh" />
                                        ) : (
                                            <p>Không có ảnh</p>
                                        )}
                                    </td>
                                    <td>{tag.description}</td>
                                    <td>{tag.createdAt}</td>
                                    <td>{tag.createdBy}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDislay(tag.id)}
                                            className={`btn ${tag.status === 3 ? 'btn-success' : 'btn-danger'} me-1`}
                                        >
                                            {tag.status === 3 ? <FaToggleOn size={24}/> : <FaToggleOff size={24}/>}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default TagIndex;
