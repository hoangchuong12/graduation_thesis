import httpAxios from '../httpAxios';

const Topicservice = {
    create: (topicData) => {
        return httpAxios.post('config-services/api/topics/create', topicData);
    },
    setImage: (data) => {
        return httpAxios.put('config-services/api/topics/set-image', data);
    },
    getById: (id) => {
        return httpAxios.get(`config-services/api/topics/get-by-id/${id}`);
    },
    getAll: () => {
        return httpAxios.get('config-services/api/topics/get-all');
    },
    update: (id, topic) => {
        return httpAxios.put(`config-services/api/topics/update/${id}`, topic);
    },
    switchStatus: (id) => {
        return httpAxios.put(`config-services/api/topics/switch-status/${id}`);
    },
    trash: (id) => {
        return httpAxios.put(`config-services/api/topics/trash/${id}`);
    },
    delete: (id) => {
        return httpAxios.delete(`config-services/api/topics/delete/${id}`);
    },
};

export default Topicservice;
