import React, { useEffect, useState } from 'react';
import { urlImagePosts } from '../../../config';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaToggleOn, FaToggleOff, FaTrash, FaEdit } from 'react-icons/fa';
import PostService from '../../../services/PostService'; // Adjust the import path as necessary

const PostIndex = () => {
    const [posts, setPosts] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let result = await PostService.getAll();
                result = result.filter(post => post.status !== 2); // Assuming status '2' means trashed
                const sortedPosts = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
                toast.error("Failed to fetch posts!");
            }
        };

        fetchPosts();
    }, [reload]);

    const handleTrash = async (id) => {
        await PostService.trash(id);
        setReload(Date.now());
        toast.success("Post moved to trash");
    };

    const handleStatus = async (id) => {
        try {
            await PostService.switchStatus(id);
            setReload(Date.now());
            toast.success("Post status toggled");
        } catch (error) {
            console.error('Error switching status:', error);
            toast.error("Failed to change post status");
        }
    };

    return (
        <div className="container mt-4">
            <section className="content-header">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Post Management</h1>
                    <Link to="/admin/post/add" className="btn btn-primary">Add New Post</Link>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <Link to="/admin/post/trash" className="text-white text-decoration-none">Thùng rác</Link>
                        </button>
                    </div>
                </div>
            </section>
            <section className="content-body">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>description</th>
                            <th>imgae</th>
                            <th>Date Created</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.name}</td>
                                <td>
                                    {post.image ? (
                                        <img src={urlImagePosts + post.image} className="img-fluid user-avatar" alt="Hình ảnh" />
                                    ) : (
                                        'Không có ảnh'
                                    )}
                                </td>
                                <td>{post.description}</td>
                                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleStatus(post.id)} className={`btn ${post.status === 1 ? 'btn-success' : 'btn-secondary'}`}>
                                        {post.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                    </button>
                                </td>
                                <td>
                                    <Link to={`/admin/post/edit/${post.id}`} className="btn btn-info mr-2">
                                        <FaEdit />
                                    </Link>
                                    <button onClick={() => handleTrash(post.id)} className="btn btn-danger">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default PostIndex;
