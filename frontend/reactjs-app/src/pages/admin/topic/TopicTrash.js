import React, { useEffect, useState } from 'react';
import TopicService from '../../../services/TopicService';
import { FaArrowAltCircleLeft, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { urlImageTopic } from '../../../config';

const TopicTrash = () => {
    const [topics, setTopics] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        fetchTrashedTopics();
    }, [reload]);

    const fetchTrashedTopics = async () => {
        try {
            const result = await TopicService.getAll(); // Ensure this fetches trashed topics
            setTopics(result.filter(topic => topic.status === 2)); // Assuming status 2 is for trashed topics
        } catch (error) {
            console.error('Error fetching trashed topics:', error);
            toast.error('Đã xảy ra lỗi khi tải danh sách đã xóa.');
        }
    };

    const restoreTopic = async (id) => {
        try {
            await TopicService.switchStatus(id);
            setReload(Date.now());
            toast.success('Khôi phục thành công');
        } catch (error) {
            console.error('Error restoring topic:', error);
            toast.error('Đã xảy ra lỗi khi khôi phục chủ đề.');
        }
    };

    const deleteTopic = async (id) => {
        try {
            await TopicService.delete(id);
            setReload(Date.now());
            toast.success('Xóa vĩnh viễn thành công');
        } catch (error) {
            console.error('Error deleting topic permanently:', error);
            toast.error('Đã xảy ra lỗi khi xóa vĩnh viễn.');
        }
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Chủ đề: Thùng rác</h1>
                
                <div className="row mt-3 align-items-center">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <a href="/admin/topic/index">Về danh sách</a>
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
                            <th>Tên chủ đề</th>
                            <th>Biểu tượng</th>
                            <th>Mô tả</th>
                            <th>Ngày tạo</th>
                            <th>ID người tạo</th>
                        </tr>
                    </thead>

                    <tbody>
                        {topics && topics.map((topic, index) => (
                            <tr key={topic.id} className="datarow">
                                <td className="text-center">
                                    <input type="checkbox" id={`checkId${index}`} />
                                </td>
                                <td>
                                    <div className="name">
                                        <a href={`/admin/topic/${topic.id}`}>{topic.name}</a>
                                    </div>
                                    <div className="function_style">
                                        <button
                                            onClick={() => restoreTopic(topic.id)}
                                            className="border-0 px-1 text-success"
                                        >
                                            <FaArrowAltCircleLeft />
                                        </button>
                                        <button
                                            onClick={() => deleteTopic(topic.id)}
                                            className="btn-none px-1 text-danger"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    {topic.image ? (
                                        <img src={urlImageTopic + topic.image} className="img-fluid user-avatar" alt="Hình ảnh" />
                                    ) : (
                                        <p>Không có ảnh</p>
                                    )}
                                </td>
                                <td>{topic.description}</td>
                                <td>{topic.createdAt}</td>
                                <td>{topic.createdBy}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </section>
        </div>
    );
}

export default TopicTrash;
