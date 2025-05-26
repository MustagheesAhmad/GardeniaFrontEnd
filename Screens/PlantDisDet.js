import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import axios from 'axios';

const {width} = Dimensions.get('window');

const PlantDisDet = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        'https://wheat-disease-detection-application-5nk3r7daaa-uc.a.run.app/fetch-images',
      );
      console.log(response.data); // Debug logging
      setImages(response.data.detected_images);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderImageItem = ({item}) => (
    <TouchableOpacity style={styles.imageContainer}>
      <Image source={{uri: item}} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    flexGrow: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    margin: 5,
  },
  image: {
    width: width / 2 - 15, // Adjusting width for two columns with margin
    height: width / 2 - 15, // Adjusting height to maintain square aspect ratio
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default PlantDisDet;
