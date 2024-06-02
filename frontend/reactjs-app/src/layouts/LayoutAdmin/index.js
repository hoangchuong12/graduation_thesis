import React, { createContext, useState, useEffect, useContext } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure this line is correctly importing the icons
import './layoutAdmin.css';
import { Link } from 'react-router-dom';
import { FaProductHunt, FaClone, FaRegUser } from "react-icons/fa";
import { MdExitToApp, MdContactSupport } from "react-icons/md";
import { RiArticleFill } from "react-icons/ri";
import { SiSellfy } from "react-icons/si";
import { BiSolidUserRectangle } from "react-icons/bi";
import { BsDisplay } from "react-icons/bs";
import { GrSystem } from "react-icons/gr";
import { toast, ToastContainer } from 'react-toastify';
import UserService from '../../services/UserService';
import LoginAdmin from './LoginAdmin';

const AdminContext = createContext();

export const useAdminContext = () => useContext(AdminContext);

const LayoutAdmin = () => {
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const sessionUserAdmin = sessionStorage.getItem('useradmin');
        if (sessionUserAdmin !== null) {
            try {
                const parsedUser = JSON.parse(sessionUserAdmin);
                if (parsedUser && typeof parsedUser === 'object') {
                    UserService.getUserById(parsedUser.userId)
                        .then(userGet => {
                            if (userGet.role.role === 1) {
                                setUser(userGet);
                            } else {
                                sessionStorage.removeItem('useradmin');
                                setUser(null);
                                navigate("/admin/login");
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching user:', error);
                        });
                } else {
                    console.error('Stored user is not a valid JSON object.');
                }
            } catch (error) {
                console.error('Error parsing stored user:', error);
            }
        }
    }, [navigate]);

    const login = async (authRequest) => {
        try {
            const response = await UserService.loginAdmin(authRequest);
            if (response) {
                const { userId, token } = response;
                const userData = { userId, token };
                sessionStorage.setItem('useradmin', JSON.stringify(userData));
                UserService.getUserById(userData.userId)
                    .then(userGet => {
                        if (userGet.role.role === 1) {
                            setUser(userGet);
                        } else {
                            sessionStorage.removeItem('useradmin');
                            setUser(null);
                            navigate("/admin/login");
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching user:', error);
                    });
                toast.success('Đăng nhập thành công');
                navigate("/admin");
            } else {
                toast.error("Đăng nhập thất bại!");
            }
        } catch (error) {
            console.log('Login error');
            toast.error('Đăng nhập thất bại!');
        }
    };

    const logout = () => {
        sessionStorage.removeItem('useradmin');
        setUser(null);
        navigate("/admin");
    };

    function handleItemClick(item) {
        const hdlitem = document.getElementById(item);
        hdlitem.classList.toggle("active");
    };

    return (
        <>
            <ToastContainer />
            <AdminContext.Provider value={{ user, login, logout }}>
                {user === null ? (
                    <LoginAdmin login={login} />
                ) : (
                    <>
                        <section className="hdl-header sticky-top">
                            <div className="container-fluid">
                                <ul className="menutop">
                                    <li>
                                        <a href="#nqt">
                                            <FaClone />
                                            E COMMERCE
                                        </a>
                                    </li>
                                    <li className="text-phai">
                                        <a href="#nqt" onClick={logout}>
                                            <MdExitToApp />
                                            Thoát
                                        </a>
                                    </li>
                                    <li className="text-phai">
                                        <a href="#nqt">
                                            <FaRegUser />
                                            Chào quản lý
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </section>
                        <section className="hdl-content">
                            <div className="container-fluid">
                                <div className="row">
                                    {isSidebarOpen && (
                                        <div className="col-md-2 bg-dark p-0 hdl-left">
                                            <div className="hdl-left">
                                                <div className="dashboard-name">
                                                    Bản điều khiển
                                                </div>
                                                <nav className="m-2 mainmenu">
                                                    <ul className="main">
                                                        <li className="hdlitem item-sub" id="item1" onClick={() => handleItemClick('item1')}>
                                                            <FaProductHunt className="icon-left" />
                                                            <a href="#nqt">Sản phẩm</a>
                                                            <i className="fa-solid fa-plus icon-right"></i>
                                                            <ul className="submenu">
                                                                <li>
                                                                    <Link to="/admin/product/index" className="margin-left-submenu" >Tất cả sản phẩm</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="/admin/product/store/index" className="margin-left-submenu">Kho hàng</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="/admin/category/index" className="margin-left-submenu">Loại sản phẩm</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="/admin/tag/index" className="margin-left-submenu">Nhãn</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="/admin/brand/index" className="margin-left-submenu">Thương hiệu</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="/admin/product/sale-index" className="margin-left-submenu">Khuyễn mãi</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="/admin/product/option-index" className="margin-left-submenu">Lựa chọn sản phẩm</Link>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li className="hdlitem item-sub" id="item2" onClick={() => handleItemClick('item2')}>
                                                            <RiArticleFill className="icon-left" />
                                                            <a href="#nqt">Bài viết</a>
                                                            <i className="fa-solid fa-plus icon-right"></i>
                                                            <ul className="submenu">
                                                                <li>
                                                                    <Link to="/admin/post/index">Tất cả bài viết</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="/admin/topic/index">Chủ đề</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="/admin/page/index">Trang đơn</Link>
                                                                </li>
                                                            </ul>
                                                        </li>

                                                        <li className="hdlitem item-sub" id="item3" onClick={() => handleItemClick('item3')}>
                                                            <SiSellfy className="icon-left" />
                                                            <a href="#nqt">Quản lý bán hàng</a>
                                                            <i className="fa-solid fa-plus icon-right"></i>
                                                            <ul className="submenu">
                                                                <li>
                                                                    <Link to="/admin/order-item/index">Tất cả đơn hàng</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="/admin/order/export">Xuất hàng</Link>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li className="hdlitem">
                                                            <BiSolidUserRectangle className="icon-left" />
                                                            <Link to="/admin/user/index">Khách hàng</Link>
                                                        </li>
                                                        <li className="hdlitem">
                                                            <MdContactSupport className="icon-left" />
                                                            <Link to="/admin/contact/index">Liên hệ</Link>
                                                        </li>
                                                        <li className="hdlitem item-sub" id="item4" onClick={() => handleItemClick('item4')}>
                                                            <BsDisplay className="icon-left" />
                                                            <a href="#nqt">Giao diện</a>
                                                            <i className="fa-solid fa-plus icon-right"></i>
                                                            <ul className="submenu">
                                                                <li>
                                                                    <Link to="/admin/banner/index">Banner</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="/admin/slider/index">Slider</Link>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li className="hdlitem item-sub" id="item5" onClick={() => handleItemClick('item5')}>
                                                            <GrSystem className="icon-left" />
                                                            <a href="#nqt">Hệ thống</a>
                                                            <i className="fa-solid fa-plus icon-right"></i>
                                                            <ul className="submenu">
                                                                <li>
                                                                    <Link to="/admin/staff/index">Thành viên</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="/admin/notification/index">Thông báo</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="/admin/information/index">Cấu hình</Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="/admin/role/index">Quyền</Link>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    )}
                                    <div className={`col-md-${isSidebarOpen ? '10' : '12'}`}>
                                        <button
                                            className="btn btn-dark position-fixed m-2"
                                            style={{ bottom: '20px', zIndex: 1000 }}
                                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                        >
                                            {isSidebarOpen ? (
                                                <i className="bi bi-chevron-left"></i>
                                            ) : (
                                                <i className="bi bi-chevron-right"></i>
                                            )}
                                        </button>
                                        <div className="content">
                                            <Outlet />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </AdminContext.Provider>
        </>
    );
};

export default LayoutAdmin;
