import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostService from '../../../services/PostService';
import UserService from '../../../services/UserService'; // Assuming UserService handles image uploads
import TopicService from '../../../services/TopicService';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';

const PostEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [detail, setDetail] = useState("");
    const [status, setStatus] = useState(1);
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState("");
    const [topics, setTopics] = useState([]);
    const [selectedTopicId, setSelectedTopicId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await PostService.getById(id);
                if (postResponse) {
                    setName(postResponse.name);
                    setDescription(postResponse.description);
                    setDetail(postResponse.detail);
                    setStatus(postResponse.status);
                    setCurrentImage(postResponse.image);
                    setSelectedTopicId(postResponse.topicId);
                }

                const topicResponse = await TopicService.getAll();
                setTopics(topicResponse);  // Fallback to an empty array if no data is returned
            } catch (error) {
                console.error('Error fetching post data:', error);
                toast.error("Failed to fetch post details.");
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateData = {
            name,
            description,
            detail,
            status,
            topicId: selectedTopicId,
            image: currentImage
        };

        if (image) {
            const imageString = await UserService.saveImage(id, { path: "posts" }, image);
            updateData.image = imageString;
        }

        try {
            await PostService.update(id, updateData);
            toast.success("Post updated successfully!");
            navigate("/admin/post/index");
        } catch (error) {
            console.error('Error updating post:', error);
            toast.error("Failed to update post.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="content">
                <section className="content-header my-2">
                    <h1>Edit Post</h1>
                    <Button variant="success" size="sm" onClick={() => navigate("/admin/post/index")}>
                        <FaSave /> Back to List
                    </Button>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label><strong>Name</strong></label>
                                <input type="text" className="form-control" placeholder="Enter post name" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label><strong>Description</strong></label>
                                <textarea className="form-control" placeholder="Enter post description" value={description} onChange={e => setDescription(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label><strong>Detail</strong></label>
                                <textarea className="form-control" placeholder="Enter post detail" value={detail} onChange={e => setDetail(e.target.value)} required />
                            </div>
                        </div>
                        <div className="col-md-6">
  
                            <div className="mb-3">
                                <label><strong>Status</strong></label>
                                <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label><strong>Topic</strong></label>
                                <select className="form-select" value={selectedTopicId} onChange={e => setSelectedTopicId(e.target.value)}>
                                    <option value="">Select a Topic</option>
                                    {topics.map((topic) => (
                                        <option key={topic.id} value={topic.id}>{topic.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </section>
                <Button type="submit" className="btn btn-success btn-sm">
                    <FaSave /> Save [Update]
                </Button>
            </div>
        </form>
    );
};

export default PostEdit;
