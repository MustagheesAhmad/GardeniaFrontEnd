import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from './UserContext';

const CreatePost = ({ heading, createPost, setIndex }) => {
  const { getUser } = useUser();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
    });

    if (!canceled) {
      setImage(assets[0]);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleCreatePost = async () => {
    setLoading(true);
    await createPost({ content, image });
    setContent('');
    setImage(null);
    await getUser();
    setIndex(0);
    setLoading(false);
  };

  const insertBullet = () => {
    setContent(prevContent => `${prevContent}\n• `);
  };

  if (loading)
    return <ActivityIndicator color="#00ff00" />

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <TextInput
        style={styles.textArea}
        placeholder="What's on your mind?"
        multiline
        numberOfLines={10}
        value={content}
        onChangeText={setContent}
      />
      <TouchableOpacity onPress={insertBullet} style={styles.bulletButton}>
        <Text style={styles.bulletButtonText}>Add Bullet Point</Text>
      </TouchableOpacity>
      <View style={styles.imageButtonsContainer}>
        <Button title="image from gallery" onPress={pickImage} />
        <Button title="Take a photo" onPress={takePhoto} />
      </View>
      {image && <Image source={{ uri: image?.uri }} style={styles.image} />}
      <Button disabled={content.trim().length === 0 && image === null} title="Create Post" onPress={handleCreatePost} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textArea: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top', // for Android
  },
  bulletButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  bulletButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    rowGap: 2,
    columnGap: 2,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
});

export default CreatePost;
