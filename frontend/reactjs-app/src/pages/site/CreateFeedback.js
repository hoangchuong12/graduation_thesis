import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import UserService from '../../services/UserService';
import '../../assets/styles/createFeedback.css';
import { useNavigate } from 'react-router-dom';
import FeedbackService from '../../services/FavoriteService';

const CreateFeedback = () => {
    const location = useLocation();
    const { orderItemId, productId } = location.state || {};
    const [image, setImage] = useState(null);
    const [evaluate, setEvaluate] = useState(0);
    const description = `Đánh giá sản phẩm cho đơn hàng: ${orderItemId}`;
    const [detail, setDetail] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const request = {
            orderItemId,
            productId,
            evaluate,
            description,
            createdBy: JSON.parse(sessionStorage.getItem('user'))?.userId,
            detail,
        };
    
        const path = {
            path: "feedbacks"
        };

        try {
            const result = await FeedbackService.create(request);
            if (result) {
                console.log("feedback add is: ", result.id);
                if(image !== null){
                    const imageString = await UserService.saveImage(result.id, path, image)
                    console.log("string image save feedback : ", imageString); 
                    if(imageString !== null){
                        const data = {
                            id: result.id,
                            image: imageString
                        };
                        console.log("setimage data is: ", data);
                        await FeedbackService.setImage(data);
                    }
                }
                console.log("brand added = ", result);
                navigate("/user", { replace: true });
            }
        } catch (error) {
            if (error.response && error.response.status === 503) {
                // Nếu lỗi có mã trạng thái 503, điều hướng người dùng đến trang 404
                navigate('/404');
            } else {
                // Nếu là các lỗi khác, in ra console để debug
                console.error("Error fetching data:", error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white">
                    <h2>{`Đánh giá đơn hàng có mã: ${orderItemId}`}</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="image" className="form-label">Chọn hình ảnh</label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Đánh giá</label>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <React.Fragment key={star}>
                                        <input
                                            type="radio"
                                            id={`star${star}`}
                                            name="evaluate"
                                            value={star}
                                            checked={evaluate === star}
                                            onChange={(e) => setEvaluate(parseInt(e.target.value))}
                                        />
                                        <label htmlFor={`star${star}`}>&#9733;</label>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="detail" className="form-label">Chi tiết đánh giá</label>
                            <textarea
                                className="form-control"
                                id="detail"
                                rows="3"
                                value={detail}
                                onChange={(e) => setDetail(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Hoàn tất</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateFeedback;
