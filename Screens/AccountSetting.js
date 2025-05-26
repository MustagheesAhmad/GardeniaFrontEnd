import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {API_BASE_URL, AUTH_TOKEN} from '../config/constants'; // Adjust the path as needed

const AccountSetting = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false); // State for activity indicator

  const handleSelectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setSelectedImage(uri);
      }
    });
  };

  const handleUploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', 'Please select an image first');
      return;
    }

    setLoading(true); // Start loading indicator

    const formData = new FormData();
    formData.append('image', {
      uri: selectedImage,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/profile/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${AUTH_TOKEN}`, // Updated token
          },
        },
      );
      Alert.alert('Success', 'Profile picture updated successfully');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to upload image');
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const handleUpdateBio = async () => {
    setLoading(true); // Start loading indicator

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/profile/update`,
        {bio},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`, // Updated token
          },
        },
      );
      Alert.alert('Success', 'Bio updated successfully');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update bio');
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Image" onPress={handleSelectImage} />
      {selectedImage && (
        <Image source={{uri: selectedImage}} style={styles.image} />
      )}
      <Button title="Upload Image" onPress={handleUploadImage} />
      <TextInput
        style={styles.input}
        placeholder="About Me"
        value={bio}
        onChangeText={setBio}
      />
      <Button title="Update Bio" onPress={handleUpdateBio} />
      {loading && (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          color="#0000ff"
        />
      )}
      {/* Show activity indicator based on loading state */}
    </View>
  );
};

export default AccountSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 20,
    borderRadius: 60,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
