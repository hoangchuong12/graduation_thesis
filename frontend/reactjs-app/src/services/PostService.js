import httpAxios from '../httpAxios';

const Postservice = {
    create: (postData) => {
        return httpAxios.post(`config-services/api/posts/create`, postData);
    },
    setImage: (data) => {
        return httpAxios.put(`config-services/api/posts/set-image`, data);
    },
    getById: (id) => {
        return httpAxios.get(`config-services/api/posts/get-by-id/${id}`);
    },
    getAll: () => {
        return httpAxios.get(`config-services/api/posts/get-all`);
    },
    update: (id, post) => { 
        return httpAxios.put(`config-services/api/posts/update/${id}`, post);
    },
    switchStatus: (id) => {
        return httpAxios.put(`config-services/api/posts/switch-status/${id}`);
    },
    trash: (id) => {
        return httpAxios.put(`config-services/api/posts/trash/${id}`);
    },
    delete: (id) => {
        return httpAxios.delete(`config-services/api/posts/delete/${id}`);
    },
};

export default Postservice;