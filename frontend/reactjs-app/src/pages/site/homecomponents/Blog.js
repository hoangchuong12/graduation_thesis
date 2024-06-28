import React from 'react';

const Blog = () => {
    return (
        <div className="blog">
            <div className="container">
                <div className="blog-container has-scrollbar">
                    <div className="blog-card">
                        <a href="#">
                            <img src={require("../../../assets/images/blog-1.jpg")} alt="Hướng dẫn chỉ số hiệu suất bán lẻ quần áo 2021 cho các nhà điều hành" width={300} className="blog-banner" />
                        </a>
                        <div className="blog-content">
                            <a href="#" className="blog-category">Thời trang</a>
                            <a href="#">
                                <h3 className="blog-title">Hướng dẫn chỉ số hiệu suất bán lẻ quần áo 2021 cho các nhà điều hành.</h3>
                            </a>
                            <p className="blog-meta">
                                Bởi <cite>Ông Admin</cite> / <time dateTime="2022-04-06">06 Tháng 4, 2022</time>
                            </p>
                        </div>
                    </div>
                    <div className="blog-card">
                        <a href="#">
                            <img src={require("../../../assets/images/blog-2.jpg")} alt="Xu hướng thời trang Curbside: Làm thế nào để chiến thắng cuộc chiến lấy hàng." className="blog-banner" width={300} />
                        </a>
                        <div className="blog-content">
                            <a href="#" className="blog-category">Quần áo</a>
                            <h3>
                                <a href="#" className="blog-title">Xu hướng thời trang Curbside: Làm thế nào để chiến thắng cuộc chiến lấy hàng.</a>
                            </h3>
                            <p className="blog-meta">
                                Bởi <cite>Ông Robin</cite> / <time dateTime="2022-01-18">18 Tháng 1, 2022</time>
                            </p>
                        </div>
                    </div>
                    <div className="blog-card">
                        <a href="#">
                            <img src={require("../../../assets/images/blog-3.jpg")} alt="Các nhà cung cấp EBT: Chiếm lĩnh phần thưởng của bạn từ doanh thu SNAP trực tuyến." className="blog-banner" width={300} />
                        </a>
                        <div className="blog-content">
                            <a href="#" className="blog-category">Giày</a>
                            <h3>
                                <a href="#" className="blog-title">Các nhà cung cấp EBT: Chiếm lĩnh phần thưởng của bạn từ doanh thu SNAP trực tuyến.</a>
                            </h3>
                            <p className="blog-meta">
                                Bởi <cite>Ông Selsa</cite> / <time dateTime="2022-02-10">10 Tháng 2, 2022</time>
                            </p>
                        </div>
                    </div>
                    <div className="blog-card">
                        <a href="#">
                            <img src={require("../../../assets/images/blog-4.jpg")} alt="Xu hướng thời trang Curbside: Làm thế nào để chiến thắng cuộc chiến lấy hàng." className="blog-banner" width={300} />
                        </a>
                        <div className="blog-content">
                            <a href="#" className="blog-category">Điện tử</a>
                            <h3>
                                <a href="#" className="blog-title">Xu hướng thời trang Curbside: Làm thế nào để chiến thắng cuộc chiến lấy hàng.</a>
                            </h3>
                            <p className="blog-meta">
                                Bởi <cite>Ông Pawar</cite> / <time dateTime="2022-03-15">15 Tháng 3, 2022</time>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
