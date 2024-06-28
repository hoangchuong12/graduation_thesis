import React, { useState, useEffect } from 'react';
import quotes from '../../../assets/images/icons/quotes.svg';
import { IonIcon } from '@ionic/react';
import { boatOutline, rocketOutline, callOutline, arrowUndoOutline, ticketOutline } from 'ionicons/icons';
import BannerService from '../../../services/BannerService';
import { urlImageBanner } from '../../../config'; // Import your image URL configuration if needed

const Testimonials = () => {
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [sliders, setSliders] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const result = await BannerService.getAll();
                const filteredBanners = result.filter(banner => banner.status !== 0 && banner.status !== 2);
                setSliders(filteredBanners);
            } catch (error) {
                console.error("Lỗi khi tải banner:", error);
            }
        };
        fetchBanners();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerIndex(prevIndex =>
                prevIndex === sliders.length - 1 ? 0 : prevIndex + 1
            );
        }, 2000); // Thay đổi banner sau mỗi 2 giây

        return () => clearInterval(interval);
    }, [sliders]);

    if (sliders.length === 0) {
        return null; // Xử lý trường hợp không có banner nào được tải
    }

    const currentBanner = sliders[currentBannerIndex];

    return (
        <div className="container">
            <div className="testimonials-box">
                <div className="testimonial">
                    <h2 className="title">Nhận xét của khách hàng</h2>
                    <div key={currentBanner.id} className="testimonial-card">
                        <img src={urlImageBanner + currentBanner.image} alt={currentBanner.name} style={{ maxWidth: '100%', height: 'auto' }} />
                        <p className="testimonial-name">{currentBanner.name}</p>
                        <p className="testimonial-title">{currentBanner.description}</p>
                        <img src={quotes} alt="dấu ngoặc kép" className="quotation-img" width={26} />
                        <p className="testimonial-desc">
                            {currentBanner.description}
                        </p>
                    </div>
                </div>

                <div className="cta-container">
                    <img src={require("../../../assets/images/cta-banner.jpg")} alt="bộ sưu tập mùa hè" className="cta-banner" />
                    <a href="#" className="cta-content">
                        <p className="discount">Giảm giá 25%</p>
                        <h2 className="cta-title">Bộ sưu tập mùa hè</h2>
                        <p className="cta-text">Bắt đầu từ $10</p>
                        <button className="cta-btn">Mua ngay</button>
                    </a>
                </div>

                <div className="service">
                    <h2 className="title">Dịch vụ của chúng tôi</h2>
                    <div className="service-container">
                        <a href="#" className="service-item">
                            <div className="service-icon">
                                <IonIcon icon={boatOutline} />
                            </div>
                            <div className="service-content">
                                <h3 className="service-title">Giao hàng toàn cầu</h3>
                                <p className="service-desc">Đối với đơn hàng từ $100 trở lên</p>
                            </div>
                        </a>
                        <a href="#" className="service-item">
                            <div className="service-icon">
                                <IonIcon icon={rocketOutline} />
                            </div>
                            <div className="service-content">
                                <h3 className="service-title">Giao hàng trong ngày tiếp theo</h3>
                                <p className="service-desc">Chỉ áp dụng đối với đơn hàng tại Anh</p>
                            </div>
                        </a>
                        <a href="#" className="service-item">
                            <div className="service-icon">
                                <IonIcon icon={callOutline} />
                            </div>
                            <div className="service-content">
                                <h3 className="service-title">Hỗ trợ trực tuyến tốt nhất</h3>
                                <p className="service-desc">Giờ làm việc: 8AM - 11PM</p>
                            </div>
                        </a>
                        <a href="#" className="service-item">
                            <div className="service-icon">
                                <IonIcon icon={arrowUndoOutline} />
                            </div>
                            <div className="service-content">
                                <h3 className="service-title">Chính sách đổi trả</h3>
                                <p className="service-desc">Đổi trả dễ dàng và miễn phí</p>
                            </div>
                        </a>
                        <a href="#" className="service-item">
                            <div className="service-icon">
                                <IonIcon icon={ticketOutline} />
                            </div>
                            <div className="service-content">
                                <h3 className="service-title">Hoàn tiền 30%</h3>
                                <p className="service-desc">Đối với đơn hàng từ $100 trở lên</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
