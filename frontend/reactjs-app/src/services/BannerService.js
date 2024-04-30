import httpAxios from '../httpAxios';

const BannerService = {

    create: (BannerData, image) => {
        const formData = new FormData();
        formData.append('BannerRequest', new Blob([JSON.stringify(BannerData)], {
            type: "application/json"
        }));
        formData.append('image', image);
        return httpAxios.post(`banner-services/api/banners/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    },
    getById: (id) => {
        return httpAxios.get(`banner-services/api/banners/get-by-id/${id}`);
    },
    getAll: () => {
        return httpAxios.get(`banner-services/api/banners/get-all`);
    },
    update: (id, banner) => {
        return httpAxios.put(`banner-services/api/banners/update/${id}`, banner);
    },
    sitchStatus: (id) => {
        return httpAxios.put(`banner-services/api/banners/switch-status/${id}`);
    },
    trash: (id) => {
        return httpAxios.put(`banner-services/api/banners/trash/${id}`);
    },
    delete: (id) => {
        return httpAxios.delete(`banner-services/api/banners/delete/${id}`);
    },
};

export default BannerService;
