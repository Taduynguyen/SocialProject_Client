import axiosInstance from "./axiosInstance";

const userAPI = {
    uploadAvatar: (formData) => axiosInstance.post("user/upload-avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }),
    uploadProfile: (formData) => axiosInstance.post("user/upload-profile", formData)
}

export default userAPI