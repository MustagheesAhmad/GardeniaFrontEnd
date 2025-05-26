import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';

const CommentComponent = ({ comment, isOwner, onDelete, onEdit }) => {

  return (
    <View style={styles.commentContainer}>
      <Image source={{ uri: comment?.user?.profilePicture }} style={styles.profileImage} />
      <View style={styles.commentContent}>
        <Text style={styles.userName}>{comment?.user?.fullName}: </Text>
        <Text>{comment.content}</Text>
        {isOwner && (
          <View style={styles.actions}>
            <TouchableOpacity onPress={onEdit} style={styles.editButton}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 5,
  },
  editButton: {
    marginRight: 10,
  },
  editText: {
    color: 'black',
  },
  deleteButton: {
    marginRight: 10,
  },
  deleteText: {
    color: 'red',
  },
});

export default CommentComponent;
