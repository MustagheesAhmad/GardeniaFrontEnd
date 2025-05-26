import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing vector icons from expo
import CommentComponent from './CommentComponent';
import { useUser } from './UserContext';

const PostComponent = ({ post, isOwner, onDelete, onCommentAdd, onCommentEdit, onCommentDelete, handleLike, handleDislike }) => {
  const { user } = useUser();
  const [commentText, setCommentText] = useState('');
  const [commentEditId, setCommentEditId] = useState(null);

  const handleCommentAdd = async () => {
    if (commentEditId) {
      await onCommentEdit(commentEditId, commentText.trim());
    } else {
      await onCommentAdd(commentText.trim());
    }
    setCommentText('');
    setCommentEditId(null);
  };

  const checkUserExists = (data = [], email) => data.some(item => item?.user?.email === email);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {post?.author?.profilePicture ? <Image source={{ uri: post?.author?.profilePicture }} style={styles.profileImage} /> : <Image
          source={require('../assets/profile.png')}
          style={styles.profileImage}
        />}
        <View style={styles.headerTextContainer}>
          <Text style={styles.authorName}>{post?.author?.fullName}</Text>
          <Text style={styles.postTime}>{new Date(post?.createdAt).toLocaleString()}</Text>
        </View>
        {isOwner && (
          <View style={styles.actions}>
            {/* <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
              <Ionicons name="create-outline" size={24} color="black" />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {post?.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
      <View style={styles.content}>
        <Text>{post.content}</Text>
      </View>
      <View style={styles.likesSection}>
        <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
          <Text>{post?.likes?.length}</Text>
          <Ionicons name={checkUserExists(post?.likes, user?.email) ? "thumbs-up" : "thumbs-up-outline"} size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDislike} style={styles.dislikeButton}>
          <Text>{post?.disLikes?.length}</Text>
          <Ionicons name={checkUserExists(post?.disLikes, user?.email) ? "thumbs-down" : "thumbs-down-outline"} size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.comments}>
        {post.comments.map((comment) => (
          <CommentComponent
            key={comment.id}
            comment={comment}
            isOwner={isOwner || comment?.user?.email === user?.email}
            onDelete={() => onCommentDelete(comment.id)}
            onEdit={() => { setCommentEditId(comment.id); setCommentText(comment?.content); }}
          />
        ))}
      </View>
      <View style={styles.commentInputContainer}>
        <TextInput
          placeholder="Add a comment..."
          value={commentText}
          onChangeText={setCommentText}
          style={styles.input}
        />
        <TouchableOpacity
          disabled={commentText.trim().length === 0}
          onPress={handleCommentAdd}
          style={commentText.trim().length === 0 ? styles.disabledButton : styles.addButton}
        >
          <Text style={styles.addButtonText}>{commentEditId ? 'Edit' : 'Add'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 15, // Added margin on the left and right
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  content: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  likesSection: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  dislikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  comments: {
    marginTop: 10,
    paddingBottom: 10,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#32CD32',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: 'grey',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default PostComponent;
