import httpAxios from '../httpAxios';

const NotificationService = {
    create: (notification) => {
        return httpAxios.post(`user-services/api/notifications/create`, notification);
    },
    getById: (id) => {
        return httpAxios.get(`user-services/api/notifications/get-by-id/${id}`);
    },
    getAll: () => {
        return httpAxios.get(`user-services/api/notifications/get-all`);
    },
    update: (id, notification) => {
        return httpAxios.put(`user-services/api/notifications/update/${id}`, notification);
    },
    trash: (id) => {
        return httpAxios.put(`user-services/api/notifications/trash/${id}`);
    },
    delete: (id) => {
        return httpAxios.delete(`user-services/api/notifications/delete/${id}`);
    },
    switchStatus: (id) => {
        return httpAxios.put(`user-services/api/notifications/switch-status/${id}`);
    },
};

export default NotificationService;