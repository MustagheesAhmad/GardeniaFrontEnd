import { Alert } from "react-native";
import { app } from "./agent";

export const addComment = async (postId, comment, update) => {
  const response = await app.AddComment(postId, { content: comment });
  if (response?.success) {
    Alert.alert('Success', 'comment added');
    await update();
  }
  else {
    Alert.alert('Error', 'comment not added');
  }

}

export const editComment = async (postId, commentId, comment, update) => {
  const response = await app.editComment(postId, commentId, { content: comment });
  if (response?.success) {
    Alert.alert('Success', 'comment edited');
    await update();
  }
  else {
    Alert.alert('Error', 'comment not edited');
  }
}

export const deleteComment = async (postId, commentId, update) => {
  const response = await app.deleteComment(postId, commentId);
  if (response?.success) {
    Alert.alert('Success', 'comment deleted');
    await update();
  }
  else {
    Alert.alert('Error', 'comment not deleted');
  }
}

export const likeDisLikePost = async (postId, type = 'LIKE', update) => {
  try {
    await app.likeDislike(postId, type);
    await update();
  } catch (error) {
    Alert.alert('Error', 'error occered')
  }
}

export const createPost = async ({ content, image }) => {
  const formData = new FormData();
  formData.append('content', content);
  if (image) {
    formData.append('post', {
      uri: image.uri,
      name: 'post_image.jpg',
      type: 'image/jpeg',
    });
  }
  const response = await app.createPost(formData);
  if (response.success) {
    Alert.alert('Success', 'Post has been created');
  }
  else {
    Alert.alert('Error', 'Post not created')
  }

}