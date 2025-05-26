import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const PlantCareTips = () => {
  const route = useRoute();
  const { data } = route.params || {};

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data received</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {data.image_path ? (
        <Image source={{ uri: data.image_path }} style={styles.image} />
      ) : (
        <Text style={styles.errorText}>Image not available</Text>
      )}
      <Text style={styles.heading}>Prediction</Text>
      <Text style={styles.content}>{data.prediction || 'N/A'}</Text>
      <Text style={styles.heading}>Causes</Text>
      <Text style={styles.content}>{data.causes || 'N/A'}</Text>
      <Text style={styles.heading}>Prevention</Text>
      <Text style={styles.content}>{data.prevention || 'N/A'}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    backgroundColor: '#e0e0e0', // Placeholder background color
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  content: {
    fontSize: 16,
    marginVertical: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default PlantCareTips;
