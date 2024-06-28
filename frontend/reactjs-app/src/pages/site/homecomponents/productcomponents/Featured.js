import React from 'react';
import { IonIcon } from '@ionic/react';
import { star, starOutline } from 'ionicons/icons';

const Featured = () => {
    return (
        <div className="product-featured">
            <h2 className="title">Ưu đãi hôm nay</h2>
            <div className="showcase-wrapper has-scrollbar">
                <div className="showcase-container">
                    <div className="showcase">
                        <div className="showcase-banner">
                            <img src={require("../../../../assets/images/products/shampoo.jpg")} alt="gói shampoo, conditioner & facewash" className="showcase-img" />
                        </div>
                        <div className="showcase-content">
                            <div className="showcase-rating">
                                <IonIcon icon={star} />
                                <IonIcon icon={star} />
                                <IonIcon icon={star} />
                                <IonIcon icon={starOutline} />
                                <IonIcon icon={starOutline} />
                            </div>
                            <a href="#">
                                <h3 className="showcase-title">Gói shampoo, conditioner & facewash</h3>
                            </a>
                            <p className="showcase-desc">
                                Lorem ipsum dolor sit amet consectetur Lorem ipsum
                                dolor dolor sit amet consectetur Lorem ipsum dolor
                            </p>
                            <div className="price-box">
                                <p className="price">$150.00</p>
                                <del>$200.00</del>
                            </div>
                            <button className="add-cart-btn">Thêm vào giỏ hàng</button>
                            <div className="showcase-status">
                                <div className="wrapper">
                                    <p>
                                        Đã bán: <b>20</b>
                                    </p>
                                    <p>
                                        Còn lại: <b>40</b>
                                    </p>
                                </div>
                                <div className="showcase-status-bar" />
                            </div>
                            <div className="countdown-box">
                                <p className="countdown-desc">
                                    Nhanh tay lên! Chương trình kết thúc sau:
                                </p>
                                <div className="countdown">
                                    <div className="countdown-content">
                                        <p className="display-number">360</p>
                                        <p className="display-text">Ngày</p>
                                    </div>
                                    <div className="countdown-content">
                                        <p className="display-number">24</p>
                                        <p className="display-text">Giờ</p>
                                    </div>
                                    <div className="countdown-content">
                                        <p className="display-number">59</p>
                                        <p className="display-text">Phút</p>
                                    </div>
                                    <div className="countdown-content">
                                        <p className="display-number">00</p>
                                        <p className="display-text">Giây</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="showcase-container">
                    <div className="showcase">
                        <div className="showcase-banner">
                            <img src="./assets/images/products/jewellery-1.jpg" alt="Bông tai kim cương vàng hồng" className="showcase-img" />
                        </div>
                        <div className="showcase-content">
                            <div className="showcase-rating">
                                <IonIcon icon={star} />
                                <IonIcon icon={star} />
                                <IonIcon icon={star} />
                                <IonIcon icon={starOutline} />
                                <IonIcon icon={starOutline} />
                            </div>
                            <h3 className="showcase-title">
                                <a href="#" className="showcase-title">Bông tai kim cương vàng hồng</a>
                            </h3>
                            <p className="showcase-desc">
                                Lorem ipsum dolor sit amet consectetur Lorem ipsum
                                dolor dolor sit amet consectetur Lorem ipsum dolor
                            </p>
                            <div className="price-box">
                                <p className="price">$1990.00</p>
                                <del>$2000.00</del>
                            </div>
                            <button className="add-cart-btn">Thêm vào giỏ hàng</button>
                            <div className="showcase-status">
                                <div className="wrapper">
                                    <p> Đã bán: <b>15</b> </p>
                                    <p> Còn lại: <b>40</b> </p>
                                </div>
                                <div className="showcase-status-bar" />
                            </div>
                            <div className="countdown-box">
                                <p className="countdown-desc">Nhanh tay lên! Chương trình kết thúc sau:</p>
                                <div className="countdown">
                                    <div className="countdown-content">
                                        <p className="display-number">360</p>
                                        <p className="display-text">Ngày</p>
                                    </div>
                                    <div className="countdown-content">
                                        <p className="display-number">24</p>
                                        <p className="display-text">Giờ</p>
                                    </div>
                                    <div className="countdown-content">
                                        <p className="display-number">59</p>
                                        <p className="display-text">Phút</p>
                                    </div>
                                    <div className="countdown-content">
                                        <p className="display-number">00</p>
                                        <p className="display-text">Giây</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
