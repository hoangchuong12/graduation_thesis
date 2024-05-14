import httpAxios from '../httpAxios';

const ProductfeedbackService = {
    create: (data) => {
        return httpAxios.post(`product-services/api/product-feedbacks/create`, data);
    },
    getById: (id) => {
        return httpAxios.get(`product-services/api/product-feedbacks/get-by-id/${id}`);
    },
    getByProductId: (id) => {
        return httpAxios.get(`product-services/api/product-feedbacks/get-by-product-id/${id}`);
    },
    getByTagId: (id) => {
        return httpAxios.get(`product-services/api/product-feedbacks/get-by-tag-id/${id}`);
    },
    getAll: () => {
        return httpAxios.get(`product-services/api/product-feedbacks/get-all`);
    },
    delete: (id) => {
        return httpAxios.delete(`product-services/api/product-feedbacks/delete/${id}`);
    },
    deleteByProductId: (productId) => {
        return httpAxios.delete(`product-services/api/product-feedbacks/delete-by-product-id/${productId}`);
    },
}
export default ProductfeedbackService;
