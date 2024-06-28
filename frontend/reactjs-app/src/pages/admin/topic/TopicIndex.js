import React, { useEffect, useState } from 'react';
import { FaToggleOn, FaTrash, FaEdit, FaToggleOff } from 'react-icons/fa';
import { Link ,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import TopicService from '../../../services/TopicService'; // Import TopicService
import { urlImageTopic } from '../../../config'; // Import urlImageTopic if necessary

const TopicIndex = () => {
    const [topics, setTopics] = useState([]);
    const [reload, setReload] = useState(0);
    const navigate = useNavigate(); 
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                let result = await TopicService.getAll(); // Use TopicService to fetch all topics
                result = result.filter(topic => topic.status !== 2);
                const sortedTopics = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setTopics(sortedTopics);
            } catch (error) {
                if (error.response && error.response.status === 503) {
                    // Nếu lỗi có mã trạng thái 503, điều hướng người dùng đến trang 404
                    navigate('/admin/404');
                } else {
                console.error("Error fetching topics:", error);}
            }
        };
        fetchTopics();
    }, [reload]);

    const handleTrash = async (id) => {
        await TopicService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await TopicService.switchStatus(id);
            setReload(Date.now());
            toast.success("Thành công");
        } catch (error) {
            console.error('Error switching status:', error);
            toast.error("Đã xảy ra lỗi khi thay đổi trạng thái.");
        }
    };

    return (
        <div className="container mt-4">
            <section className="content-header my-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Quản lý chủ đề</h1>
                    <Link to="/admin/topic/add" className="btn btn-primary">Thêm mới</Link>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <Link to="/admin/topic/trash" className="text-white text-decoration-none">Thùng rác</Link>
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
                            <th>Tên chủ đề</th>
                            <th>Biểu tượng</th>
                            <th>Mô tả</th>
                            <th>Ngày tạo</th>
                            <th>ID người tạo</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topics && topics.length > 0 &&
                            topics.map((topic, index) => (
                                <tr key={topic.id} className="datarow">
                                    <td className="text-center">
                                        <input type="checkbox" id={`checkId${index}`} />
                                    </td>
                                    <td>
                                        <div className="name">
                                            <Link to={`/admin/topic/${topic.id}`}>{topic.name}</Link>
                                        </div>
                                        <div className="d-flex justify-content-start mt-2">
                                            <button
                                                onClick={() => handleStatus(topic.id, topic.status)}
                                                className={`btn ${topic.status === 1 ? 'btn-success' : 'btn-danger'} me-1`}
                                            >
                                                {topic.status === 1 ? <FaToggleOn size={24}/> : <FaToggleOff size={24}/>}
                                            </button>
                                            <Link to={`/admin/topic/edit/${topic.id}`} className='btn btn-primary me-1'>
                                                <FaEdit size={20}/>
                                            </Link>
                                            <button
                                                onClick={() => handleTrash(topic.id)}
                                                className="btn btn-danger">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        {topic.image ? (
                                            <img src={`${urlImageTopic}/${topic.image}`} className="img-fluid user-avatar" alt="Hình ảnh" />
                                        ) : (
                                            <p>Không có ảnh</p>
                                        )}
                                    </td>
                                    <td>{topic.description}</td>
                                    <td>{topic.createdAt}</td>
                                    <td>{topic.createdBy}</td>
                                    <td>
                                        <button
                                            onClick={() => handleStatus(topic.id, topic.status)}
                                            className={`btn ${topic.status === 1 ? 'btn-success' : 'btn-danger'} me-1`}
                                        >
                                            {topic.status === 1 ? 'Hoạt động' : 'Không hoạt động'}
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

export default TopicIndex;
