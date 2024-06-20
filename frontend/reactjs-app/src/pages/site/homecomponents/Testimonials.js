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
                console.error("Error fetching banners:", error);
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
                    <h2 className="title">Testimonials</h2>
                    <div key={currentBanner.id} className="testimonial-card">
                        <img src={urlImageBanner + currentBanner.image} alt={currentBanner.name}style={{ maxWidth: '100%', height: 'auto' }} />
                        <p className="testimonial-name">{currentBanner.name}</p>
                        <p className="testimonial-title">{currentBanner.description}</p>
                        <img src={quotes} alt="quotation" className="quotation-img" width={26} />
                        <p className="testimonial-desc">
                            {currentBanner.description}
                        </p>
                    </div>
                </div>

                <div className="cta-container">
                    <img src={require("../../../assets/images/cta-banner.jpg")} alt="summer collection" className="cta-banner" />
                    <a href="#" className="cta-content">
                        <p className="discount">25% Discount</p>
                        <h2 className="cta-title">Summer collection</h2>
                        <p className="cta-text">Starting @ $10</p>
                        <button className="cta-btn">Shop now</button>
                    </a>
                </div>

                <div className="service">
                    <h2 className="title">Our Services</h2>
                    <div className="service-container">
                        <a href="#" className="service-item">
                            <div className="service-icon">
                                <IonIcon icon={boatOutline} />
                            </div>
                            <div className="service-content">
                                <h3 className="service-title">Worldwide Delivery</h3>
                                <p className="service-desc">For Orders Over $100</p>
                            </div>
                        </a>
                        <a href="#" className="service-item">
                            <div className="service-icon">
                                <IonIcon icon={rocketOutline} />
                            </div>
                            <div className="service-content">
                                <h3 className="service-title">Next Day Delivery</h3>
                                <p className="service-desc">UK Orders Only</p>
                            </div>
                        </a>
                        <a href="#" className="service-item">
                            <div className="service-icon">
                                <IonIcon icon={callOutline} />
                            </div>
                            <div className="service-content">
                                <h3 className="service-title">Best Online Support</h3>
                                <p className="service-desc">Hours: 8AM - 11PM</p>
                            </div>
                        </a>
                        <a href="#" className="service-item">
                            <div className="service-icon">
                                <IonIcon icon={arrowUndoOutline} />
                            </div>
                            <div className="service-content">
                                <h3 className="service-title">Return Policy</h3>
                                <p className="service-desc">Easy & Free Return</p>
                            </div>
                        </a>
                        <a href="#" className="service-item">
                            <div className="service-icon">
                                <IonIcon icon={ticketOutline} />
                            </div>
                            <div className="service-content">
                                <h3 className="service-title">30% Money Back</h3>
                                <p className="service-desc">For Orders Over $100</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
