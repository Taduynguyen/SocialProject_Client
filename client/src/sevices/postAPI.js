import axiosInstance from "./axiosInstance";

const postAPI= {
    addNewPost: (formData) => axiosInstance.post("/posts/add-new", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }),
    getAllPost: () => axiosInstance.get("/posts/all-posts"),
    toggleLike: (postId) => axiosInstance.post(`/posts/toggle-like/${postId}`),
    addComment: (postId, commentData) => axiosInstance.post(`/posts/add-comment/${postId}`, commentData),
    detailPost: (postId) => axiosInstance.get(`posts/detail-post/${postId}`),
};

export default postAPI;