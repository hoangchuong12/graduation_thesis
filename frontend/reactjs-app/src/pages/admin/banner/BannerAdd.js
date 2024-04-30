import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';
import BannerService from '../../../services/BannerService';
const BannerAdd = () => {


    const sessionUserAdmin = sessionStorage.getItem('useradmin');
    let createdBy = null;
    if (sessionUserAdmin !== null) {
        const parsedUser = JSON.parse(sessionUserAdmin);
        createdBy = parsedUser.userId;
    }

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const BannerData = {
            name: name,
            description: description,
            createdBy: createdBy,
        };

        try {
            const result = await BannerService.create(BannerData, image); // Truyền hình ảnh đại diện
            if (result) {
                console.log("usser added = ", result);
                toast.success("Thêm thành công");
                navigate("/admin/banner/index", { replace: true });
            }
        } catch (error) {
            console.error("Error adding user:", error);
            toast.error("Thêm người dùng thất bại!");
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Thêm người dùng</h1>
                    <div className="row mt-2 align-items-center">
                        <div className="col-md-12 text-end">
                            <Button variant="success" size="sm" href="/admin/banner/index" className="ml-2">
                                <FaSave /> Về danh sách
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label><strong>Name Banner(*)</strong></label>
                                <input type="text" name="name" className="form-control" placeholder="name banner" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label><strong>Mật khẩu(*)</strong></label>
                                <input type="text" name="description" className="form-control" placeholder="description" value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label><strong>Ảnh đại diện</strong></label>
                                <input type="file" id="image" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                            </div>

                        </div>
                    </div>
                </section>
                <section className="content-header my-2">
                    <div className="row mt-2 align-items-center">
                        <div className="col-md-12 text-end">
                            <button type="submit" className="btn btn-success btn-sm mr-2" name="THEM">
                                <i className="fa fa-save"></i> Lưu [Thêm]
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </form>
    );
}
export default BannerAdd;