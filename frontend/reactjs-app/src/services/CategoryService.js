import httpAxios from '../httpAxios';

const CategoryService = {
    create: (brandData) => {
        return httpAxios.post(`product-services/api/categories/create`, brandData);
    },
    setImage: (data) => {
        return httpAxios.put(`product-services/api/categories/set-image`, data);
    },
    getById: (id) => {
        return httpAxios.get(`product-services/api/categories/get-by-id/${id}`);
    },
    getByUser: (userId) => {
        return httpAxios.get(`product-services/api/categories/get-by-user/${userId}`);
    },
    getAll: () => {
        return httpAxios.get(`product-services/api/categories/get-all`);
    },
    update: (id, brand) => { 
        return httpAxios.put(`product-services/api/categories/update/${id}`, brand);
    },
    sitchStatus: (id) => {
        return httpAxios.put(`product-services/api/categories/switch-status/${id}`);
    },
    trash: (id) => {
        return httpAxios.put(`product-services/api/categories/trash/${id}`);
    },
    display: (id) => {
        return httpAxios.put(`product-services/api/categories/display/${id}`);
    },
    delete: (id) => {
        return httpAxios.delete(`product-services/api/categories/delete/${id}`);
    },
}
export default CategoryService;
