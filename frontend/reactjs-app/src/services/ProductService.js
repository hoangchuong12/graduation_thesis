import httpAxios from '../httpAxios';

const ProductService = {
    getProduct: () => {
        return httpAxios.get(`product-services/api/products/get-all`);
    }
};

export default ProductService;
