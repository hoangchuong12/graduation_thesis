import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import TopicService from '../../../services/TopicService';
import UserService from '../../../services/UserService';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';

const TopicEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [status, setStatus] = useState(1);
    const [productQuantity, setProductQuantity] = useState(0);
    const [image, setImage] = useState(null);
    const [stringImageDefault, setStringImageDefault] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topicData = await TopicService.getById(id);

                setName(topicData.name);
                setDescription(topicData.description);
                setCreatedBy(topicData.createdBy);
                setStatus(topicData.status);
                setProductQuantity(topicData.productQuantity)
                setStringImageDefault(topicData.image);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error("Failed to fetch data.");
            }
        };
        fetchData();
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const topicData = {
                name: name,
                description: description,
                createdBy: createdBy,
                status: status,
                productQuantity: productQuantity,
            };
    
            const path = {
                path: "topics"
            };
            const deleteIfExitsImage = await TopicService.getById(id);
            console.log("image old = ", deleteIfExitsImage.image);
            if(image !== null){
                if(deleteIfExitsImage.image !== null){
                    const deleteImage = {
                        path: "topics",
                        filename: deleteIfExitsImage.image
                    };
                    console.log("delete data = ", deleteImage);
                    await UserService.deleteImage(deleteImage);
                }
            }
    
            const result = await TopicService.update(id, topicData);
            if (result) {
                if (image !== null) { // Kiểm tra image khác null
                    const stringImage = await UserService.saveImage(id, path, image);
                    if(stringImage !== null){
                        const data = {
                            id: result.id,
                            image: stringImage
                        };
                        console.log("setimage data is: ", data);
                        await TopicService.setImage(data);
                    }
                }else{
                    const data = {
                        id: result.id,
                        image: stringImageDefault
                    };
                    console.log("setimage data is: ", data);
                    await TopicService.setImage(data);
                }
                toast.success("Chủ đề đã được cập nhật thành công!");
                navigate("/admin/topic/index", { replace: true });
            }
        } catch (error) {
            console.error('Error updating topic:', error);
            toast.error("Cập nhật chủ đề thất bại.");
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Cập nhật chủ đề</h1>
                    <div className="row mt-2 align-items-center">
                        <div className="col-md-12 text-end">
                            <Button variant="success" size="sm" as={Link} to="/admin/topic/index">
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
                            <Button type="submit" className="btn btn-success btn-sm">
                                <FaSave /> Lưu [Cập nhật]
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </form>
    );
};

export default TopicEdit;
