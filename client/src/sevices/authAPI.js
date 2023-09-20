import axiosInstance from "./axiosInstance";

const authAPI = {
    login: (values) => axiosInstance.post("/auth/login", values),
    register: (values) => axiosInstance.post("/auth/register", values),
    authInfo: () => axiosInstance.get("/auth/me"),
    allUsers: () => axiosInstance.get("/auth/all-users"),
    selectedUser: (userId) => axiosInstance.get(`/auth/profile/${userId}`)
};

export default authAPI