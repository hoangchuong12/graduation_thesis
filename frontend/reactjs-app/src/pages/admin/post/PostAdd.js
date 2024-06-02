import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostService from '../../../services/PostService';
import UserService from '../../../services/UserService'; // Assuming UserService handles image uploads
import TopicService from '../../../services/TopicService';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';

const PostAdd = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [detail, setDetail] = useState("");
    const [status, setStatus] = useState(1);
    const [image, setImage] = useState(null);
    const [topics, setTopics] = useState([]);
    const [selectedTopicId, setSelectedTopicId] = useState("");

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await TopicService.getAll();
                setTopics(response); // Adding fallback to an empty array
            } catch (error) {
                console.error("Error fetching topics:", error);
                toast.error("Failed to fetch topics!");
            }
        };

        fetchTopics();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const postRequest = {
            name,
            description,
            detail,
            createdBy: JSON.parse(sessionStorage.getItem('useradmin'))?.userId,
            status,
            topicId: selectedTopicId
        };

        try {
            const result = await PostService.create(postRequest);
            if (result && image) {
                const imageString = await UserService.saveImage(result.id, { path: "posts" }, image);
                if (imageString) {
                    await PostService.setImage({ id: result.id, image: imageString });
                }
            }
            toast.success("Post added successfully");
            navigate("/admin/post/index", { replace: true });
        } catch (error) {
            console.error("Error adding post:", error);
            toast.error("Failed to add post!");
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Add New Post</h1>
                    <div className="row mt-2 align-items-center">
                        <div className="col-md-12 text-end">
                            <Button variant="success" size="sm" href="/admin/post/index" className="ml-2">
                                <FaSave /> Back to List
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label><strong>name(*)</strong></label>
                                <input type="text" className="form-control" placeholder="Enter post title" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label><strong>description</strong></label>
                                <textarea className="form-control" placeholder="Enter post content" value={description} onChange={e => setDescription(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label><strong>detail(*)</strong></label>
                                <input type="text" className="form-control" placeholder="Enter post title" value={detail} onChange={e => setDetail(e.target.value)} required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label><strong>Topic</strong></label>
                                <select className="form-select" value={selectedTopicId} onChange={e => setSelectedTopicId(e.target.value)}>
                                    <option value="">Select a Topic</option>
                                    {topics.map(topic => (
                                        <option key={topic.id} value={topic.id}>{topic.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label><strong>Image</strong></label>
                                <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                            <div className="mb-3">
                                <label><strong>Status</strong></label>
                                <select name="status" className="form-select" onChange={(e) => setStatus(e.target.value)} value={status}>
                                    <option value="1">Published</option>
                                    <option value="2">Draft</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content-header my-2">
                    <div className="row mt-2 align-items-center">
                        <div className="col-md-12 text-end">
                            <button type="submit" className="btn btn-success btn-sm mr-2" name="SAVE">
                                <i className="fa fa-save"></i> Save [Add]
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </form>
    );
};

export default PostAdd;
