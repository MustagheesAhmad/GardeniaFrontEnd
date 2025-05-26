import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useUser } from '../Components/UserContext';
import { API_BASE_URL } from '../config/constants';
import { app } from '../config/agent';

const Settings = () => {
  const { user, getUser } = useUser();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [bio, setBio] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setBio(user.bio);
      setSelectedImage(user.profilePicture ? { uri: user.profilePicture } : null);
      setImageUploaded(false);
    }
  }, [user]);

  const handleSelectImage = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
    });
    if (!canceled) {
      setSelectedImage(assets[0]);
      setImageUploaded(true);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', 'Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: selectedImage.uri,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });

    setLoading(true);
    try {
      const response = await app.uploadImage(formData);
      if (response.success) {
        Alert.alert('Success', 'Profile picture updated successfully');
        await getUser(); // Refresh user data
        setSelectedImage(null);
        setImageUploaded(false);
      }
      else {
        console.log(response);
        Alert.alert('Error', 'profile picture not uploaded')
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBio = async () => {
    setLoading(true);
    try {
      const response = await app.updateBio(bio);
      console.log(response);
      if (response?.success) {
        await getUser(); // Refresh user data
        Alert.alert('Success', 'Bio updated successfully');
      }
      else {
        Alert.alert('Error', 'Failed to update bio1');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update bio');
    } finally {
      setLoading(false);
    }
  };

  const handleBioChange = (text) => {
    if (text.length <= 100) {
      setBio(text);
    } else {
      Alert.alert('Character Limit Exceeded', 'Bio cannot exceed 100 characters.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSelectImage}>
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage.uri }} style={styles.image} />
          ) : (
            <Image
              source={require('../assets/profile.png')}
              style={styles.image}
            />
          )}
          <Text style={styles.imageText}>Change Profile Picture</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleUploadImage}
        disabled={!imageUploaded}
        style={[styles.uploadButton, !imageUploaded && styles.disabledButton]}
      >
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#4CAF50" />}
      <View style={styles.bioContainer}>
        <Text style={styles.bioLabel}>About me:</Text>
        <TextInput
          style={styles.bioInput}
          placeholder="Enter Bio"
          value={bio}
          onChangeText={handleBioChange}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          maxLength={100}
        />
        <Text style={styles.charCount}>{`${bio ? bio.length : 0}/100 characters`}</Text>
      </View>
      <TouchableOpacity
        onPress={handleUpdateBio}
        disabled={bio === user?.bio}
        style={[styles.updateButton, bio === user?.bio && styles.disabledButton]}
      >
        <Text style={styles.updateButtonText}>Update About me</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#4CAF50" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageText: {
    fontSize: 18,
    marginTop: 5,
  },
  uploadButton: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  bioContainer: {
    marginTop: 20,
  },
  bioLabel: {
    fontSize: 18,
  },
  bioInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    height: 100,
  },
  charCount: {
    marginTop: 5,
    textAlign: 'right',
    color: 'gray',
  },
  updateButton: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  updateButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  disabledButton: {
    backgroundColor: '#a5d6a7',
  },
});

export default Settings;
