import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopicService from '../../../services/TopicService';
import UserService from '../../../services/UserService';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';

const TopicAdd = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(1);
    const [image, setImage] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const topicRequest = {
            name,
            description,
            createdBy: JSON.parse(sessionStorage.getItem('useradmin'))?.userId,
            status,
        };

        try {
            const result = await TopicService.create(topicRequest);
            if (result) {
                if (image !== null) {
                    const path = { path: "topics" };
                    const imageString = await UserService.saveImage(result.id, path, image);
                    if (imageString !== null) {
                        const data = { id: result.id, image: imageString };
                        await TopicService.setImage(data);
                    }
                }
                toast.success("Thêm thành công");
                navigate("/admin/topic/index", { replace: true });
            }
        } catch (error) {
            console.error("Error adding topic:", error);
            toast.error("Thêm loại thất bại!");
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Thêm chủ đề</h1>
                    <div className="row mt-2 align-items-center">
                        <div className="col-md-12 text-end">
                            <Button variant="success" size="sm" href="/admin/topic/index" className="ml-2">
                                <FaSave /> Về danh sách
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label><strong>Tên chủ đề(*)</strong></label>
                                <input type="text" name="name" className="form-control" placeholder="Tên chủ đề" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label><strong>Mô tả</strong></label>
                                <input type="text" name="description" className="form-control" placeholder="Mô tả chủ đề" value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label><strong>Biểu tượng</strong></label>
                                <input type="file" id="image" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                            <div className="mb-3">
                                <label><strong>Trạng thái</strong></label>
                                <select name="status" className="form-select" onChange={(e) => { setStatus(e.target.value) }}
                                    value={status}>
                                    <option value="1">Hoạt động</option>
                                    <option value="2">Không hoạt động</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content-header my-2">
                    <div className="row mt-2 align-items-center">
                        <div className="col-md-12 text-end">
                            <button type="submit" className="btn btn-success btn-sm mr-2" name="THEM">
                                <i className="fa fa-save"></i> Lưu [Thêm]
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </form>
    );
};

export default TopicAdd;
