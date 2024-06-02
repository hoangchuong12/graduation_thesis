import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostService from '../../../services/PostService'; // Ensure the import path matches your project structure
import { FaArrowAltCircleLeft, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { urlImagePosts } from '../../../config';


const PostTrash = () => {
    const [posts, setPosts] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        fetchTrashedPosts();
    }, [reload]);

    const fetchTrashedPosts = async () => {
        try {
            const result = await PostService.getAll();
            setPosts(result.filter(post => post.status === 2)); // Assuming status 2 is for trashed posts
        } catch (error) {
            console.error('Error fetching trashed posts:', error);
            toast.error('Đã xảy ra lỗi khi tải danh sách bài viết đã xóa.');
        }
    };

    const restorePost = async (id) => {
        try {
            await PostService.switchStatus(id);
            setReload(Date.now());
            toast.success('Khôi phục bài viết thành công');
        } catch (error) {
            console.error('Error restoring post:', error);
            toast.error('Đã xảy ra lỗi khi khôi phục bài viết.');
        }
    };

    const deletePost = async (id) => {
        try {
            await PostService.delete(id);
            setReload(Date.now());
            toast.success('Xóa vĩnh viễn bài viết thành công');
        } catch (error) {
            console.error('Error deleting post permanently:', error);
            toast.error('Đã xảy ra lỗi khi xóa vĩnh viễn bài viết.');
        }
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Bài viết : Thùng rác</h1>

                <div className="row mt-3 align-items-center">
                    <div className="col-12">
                        <Link to="/admin/post/index" className="btn btn-warning">
                            Về danh sách
                        </Link>
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
                            <th>Tiêu đề</th>
                            <th>Hình ảnh</th>
                            <th>Nội dung</th>
                            <th>Ngày tạo</th>
                            <th>ID người tạo</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts && posts.map((post, index) => (
                            <tr key={post.id} className="datarow"> {/* Ensure no whitespace or newline here */}
                                <td className="text-center">
                                    <input type="checkbox" id={`checkId${index}`} />
                                </td>
                                <td>
                                    <a href="menu_index.html">{post.title}</a>
                                </td>
                                <td>
                                    {post.image ? (
                                        <img src={urlImagePosts + post.image} className="img-fluid user-avatar" alt="Hình ảnh" />
                                    ) : (
                                        'Không có ảnh'
                                    )}
                                </td>
                                <td>{post.content ? post.content.substring(0, 100) + '...' : ''}</td>
                                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                <td>{post.createdBy}</td>
                                <td>
                                    <button onClick={() => restorePost(post.id)} className="border-0 px-1 text-success">
                                        <FaArrowAltCircleLeft />
                                    </button>
                                    <button onClick={() => deletePost(post.id)} className="btn-none px-1 text-danger">
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
}

export default PostTrash;
