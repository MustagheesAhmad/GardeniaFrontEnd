import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { API_BASE_URL, AUTH_TOKEN } from '../config/constants'; // Adjust the path as needed
import { app } from '../config/agent';
import { useIsFocused } from '@react-navigation/native';
import { getItem } from '../config/storage';
import InfiniteScrollbarComponent from '../Components/InfiniteScrollbar';

const Forum = () => {
  const isFcoused = useIsFocused()
  const [posts, setPosts] = useState([]);
  const [commentsVisible, setCommentsVisible] = useState({});
  const [newComment, setNewComment] = useState({});
  const [isCommenting, setIsCommenting] = useState({});
  const [editingComment, setEditingComment] = useState({});
  const [editingContent, setEditingContent] = useState({});
  const [newPostContent, setNewPostContent] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingPostContent, setEditingPostContent] = useState('');


  const getPosts = async () => {
    const response = await app.getPosts();
    console.log(response.data[0]);
    if (response?.success) {
      setPosts(response.data)
    }
  }

  const handleLikeDisLike = async (postId, type) => {
    const response = await app.likeDislike(postId, type);

    if (response?.success) {
      const post = await app.singlePost(postId);
    }

  }

  const handleCommentClick = postId => {
    setCommentsVisible(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = async postId => {
    if (!newComment[postId]) return;

    try {
      const data = JSON.stringify({
        content: newComment[postId],
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/posts/${postId}/comment`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AUTH_TOKEN}`, // Updated token
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response.data);

      // Update the comments in the post state
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, comments: [...post.comments, response.data.data] }
            : post,
        ),
      );

      // Clear the new comment input
      setNewComment(prev => ({ ...prev, [postId]: '' }));
      setIsCommenting(prev => ({ ...prev, [postId]: false }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditComment = async (postId, commentId) => {
    if (!editingContent[commentId]) return;

    try {
      const data = JSON.stringify({
        content: editingContent[commentId],
      });

      const config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/posts/${postId}/comment/${commentId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AUTH_TOKEN}`, // Updated token
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response.data);

      // Update the comment in the post state
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? {
              ...post,
              comments: post.comments.map(comment =>
                comment.id === commentId
                  ? { ...comment, content: response.data.data.content }
                  : comment,
              ),
            }
            : post,
        ),
      );

      // Clear the editing state
      setEditingComment(prev => ({ ...prev, [commentId]: false }));
      setEditingContent(prev => ({ ...prev, [commentId]: '' }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/posts/${postId}/comment/${commentId}`,
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`, // Updated token
        },
      };

      const response = await axios.request(config);
      console.log(response.data);

      // Remove the comment from the post state
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? {
              ...post,
              comments: post.comments.filter(
                comment => comment.id !== commentId,
              ),
            }
            : post,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPost = async postId => {
    if (!editingPostContent) return;

    try {
      const data = JSON.stringify({
        content: editingPostContent,
        image: 'http://example.com/updated-image.jpg', // Update this if needed
      });

      const config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/posts/${postId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AUTH_TOKEN}`, // Updated token
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response.data);

      // Update the post in the state
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, content: response.data.data.content }
            : post,
        ),
      );

      // Clear the editing state
      setEditingPostId(null);
      setEditingPostContent('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent) return;

    try {
      const data = JSON.stringify({
        content: newPostContent,
        image:
          'http://res.cloudinary.com/driiqokwu/image/upload/v1716839792/zlqyq9aakwcgy2cidr3y.jpg', // Update this if needed
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/posts`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AUTH_TOKEN}`, // Updated token
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response.data);

      // Add the new post to the state
      setPosts([response.data.data, ...posts]);

      // Clear the new post input
      setNewPostContent('');
      setIsCreatingPost(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <ScrollView>
    //   {/* {isCreatingPost ? (
    //     <View style={styles.newPostContainer}>
    //       <TextInput
    //         style={styles.newPostInput}
    //         value={newPostContent}
    //         onChangeText={setNewPostContent}
    //         placeholder="Enter new post content"
    //       />
    //       <Button title="Submit" onPress={handleCreatePost} />
    //       <Button title="Cancel" onPress={() => setIsCreatingPost(false)} />
    //     </View>
    //   ) : (
    //     // <Button
    //     //   title="Create New Post"
    //     //   onPress={() => setIsCreatingPost(true)}
    //     // />
    //   )} */}
    //   {posts.map(post => (
    //     <View key={post.id} style={styles.postContainer}>
    //       {editingPostId === post.id ? (
    //         <View>
    //           <TextInput
    //             style={styles.editPostInput}
    //             value={editingPostContent}
    //             onChangeText={setEditingPostContent}
    //             placeholder="Edit post content"
    //           />
    //           <Button title="Save" onPress={() => handleEditPost(post.id)} />
    //           <Button title="Cancel" onPress={() => setEditingPostId(null)} />
    //         </View>
    //       ) : (
    //         <View>
    //           <Image source={{ uri: post.image }} style={styles.postImage} />
    //           <Text>{post.content}</Text>
    //           <View style={styles.buttonsContainer}>
    //             <TouchableOpacity onPress={() => handleLikeClick(post.id)}>
    //               <Text style={{ fontWeight: 800 }}>Like</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity onPress={() => handledisLikeClick(post.id)}>
    //               <Text style={{ fontWeight: 800 }}>Dislike</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity onPress={() => handleCommentClick(post.id)}>
    //               <Text style={{ fontWeight: 800 }}>Comment</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity onPress={() => setEditingPostId(post.id)}>
    //               <Text style={{ fontWeight: 800 }}>Edit</Text>
    //             </TouchableOpacity>
    //           </View>
    //           <View style={{ flexDirection: 'row', gap: 40 }}>
    //             <Text>{post.likes.length} likes</Text>
    //             <Text>{post.disLikes.length} dislikes</Text>
    //           </View>

    //           {commentsVisible[post.id] && (
    //             <View>
    //               {post.comments.map(comment => (
    //                 <View key={comment.id} style={styles.commentContainer}>
    //                   {editingComment[comment.id] ? (
    //                     <View>
    //                       <TextInput
    //                         style={styles.editCommentInput}
    //                         value={editingContent[comment.id]}
    //                         onChangeText={text =>
    //                           setEditingContent(prev => ({
    //                             ...prev,
    //                             [comment.id]: text,
    //                           }))
    //                         }
    //                         placeholder="Edit comment"
    //                       />
    //                       <Button
    //                         title="Save"
    //                         onPress={() =>
    //                           handleEditComment(post.id, comment.id)
    //                         }
    //                       />
    //                       <Button
    //                         title="Cancel"
    //                         onPress={() =>
    //                           setEditingComment(prev => ({
    //                             ...prev,
    //                             [comment.id]: false,
    //                           }))
    //                         }
    //                       />
    //                     </View>
    //                   ) : (
    //                     <View style={styles.commentContent}>
    //                       <Text>{comment.content}</Text>
    //                       <View style={styles.commentButtonsContainer}>
    //                         <TouchableOpacity
    //                           onPress={() =>
    //                             setEditingComment(prev => ({
    //                               ...prev,
    //                               [comment.id]: true,
    //                             }))
    //                           }>
    //                           <Text style={{ right: 30, fontWeight: 500 }}>
    //                             Edit
    //                           </Text>
    //                         </TouchableOpacity>
    //                         <TouchableOpacity
    //                           onPress={() =>
    //                             handleDeleteComment(post.id, comment.id)
    //                           }>
    //                           <Text style={{ fontWeight: 500 }}>Delete</Text>
    //                         </TouchableOpacity>
    //                       </View>
    //                     </View>
    //                   )}
    //                 </View>
    //               ))}
    //               {isCommenting[post.id] ? (
    //                 <View>
    //                   <TextInput
    //                     style={styles.commentInput}
    //                     value={newComment[post.id]}
    //                     onChangeText={text =>
    //                       setNewComment(prev => ({ ...prev, [post.id]: text }))
    //                     }
    //                     placeholder="Enter your comment"
    //                   />
    //                   <Button
    //                     title="Submit"
    //                     onPress={() => handleAddComment(post.id)}
    //                   />
    //                   <Button
    //                     title="Cancel"
    //                     onPress={() =>
    //                       setIsCommenting(prev => ({ ...prev, [post.id]: false }))
    //                     }
    //                   />
    //                 </View>
    //               ) : (
    //                 <Button
    //                   title="Add Comment"
    //                   onPress={() =>
    //                     setIsCommenting(prev => ({ ...prev, [post.id]: true }))
    //                   }
    //                 />
    //               )}
    //             </View>
    //           )}
    //         </View>
    //       )}
    //     </View>
    //   ))}
    // </ScrollView>
    <InfiniteScrollbarComponent />
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
    padding: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  commentContainer: {
    marginTop: 10,
    padding: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  commentContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentButtonsContainer: {
    flexDirection: 'row',
  },
  commentInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  editCommentInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  newPostContainer: {
    marginBottom: 20,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  newPostInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  editPostInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default Forum;
