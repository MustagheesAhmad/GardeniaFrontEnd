import axiosInstance from "./axios";

const responseHandler = (res) => res?.data;

const errorHandler = (err) => err?.response?.data;



const requests = {
  get: (url) => axiosInstance.get(url).then(responseHandler).catch(errorHandler),
  post: (url, body) => axiosInstance.post(url, body).then(responseHandler).catch(errorHandler),
  patch: (url, body) => axiosInstance.patch(url, body).then(responseHandler).catch(errorHandler),
  delete: (url) => axiosInstance.delete(url).then(responseHandler).catch(errorHandler),
  postWithFormData: (url, formData) => axiosInstance.post(url, formData).then(responseHandler).catch(errorHandler),
  patchWithFormData: (url, formData) => axiosInstance.patch(url, formData).then(responseHandler).catch(errorHandler)
}


export const auth = {
  login: (loginInfo) => requests.post('/auth/login', loginInfo),
  signUp: (signUpInfo) => requests.post('/auth/sign-up', signUpInfo),
  forgetPassword: (email) => requests.post('/auth/forget-password', { email }),
  verify: () => requests.get('/auth/verify'),
}


export const app = {
  getPosts: (pageNo = 1, limit = 20) => requests.get(`/posts?page=${pageNo}&limit=${limit}`),
  singlePost: (postId) => requests.get(`/posts/${postId}`),
  editPost: (postId, body) => requests.patch(`/posts/${postId}`, body),
  deletePost: (postId) => requests.delete(`/posts/${postId}`),
  AddComment: (postId, body) => requests.post(`/posts/${postId}/comment`, body),
  editComment: (postId, commentId, body) => requests.patch(`/posts/${postId}/comment/${commentId}`, body),
  deleteComment: (postId, commentId) => requests.delete(`/posts/${postId}/comment/${commentId}`),
  likeDislike: (postId, type) => requests.post(`/posts/${postId}/likeDisLike`, { type }),
  updateBio: (bio) => requests.patch('/profile/update', { bio }),
  uploadImage: (formData) => requests.patchWithFormData('/profile/upload', formData),
  createPost: (formData) => requests.postWithFormData('/posts', formData)
}