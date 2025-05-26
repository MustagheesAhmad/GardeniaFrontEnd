import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { createPost } from "../config/utils";

const LivePlantDisDet = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState("");

  const selectImage = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
    });
    if (!canceled) {
      setSelectedImage(assets[0]);
    }
  };

  const captureImage = async () => {
    const { assets, canceled } = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
    });
    if (!canceled) {
      setSelectedImage(assets[0]);
    }
  };

  const detectDisease = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("plantImage", {
        uri: selectedImage.uri,
        name: "image.jpg",
        type: "image/jpeg",
      });

      try {
        setLoading(true);
        const response = await axios.post(
          "http://192.168.18.136:1000/diagnose",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("🚀 ~ detectDisease ~ response:", response);
        setLoading(false);
        setDetectionResult(response.data);

        // Format the detection result into a string
        const formattedContent = formatDetectionResult(response.data);
        setEditableContent(formattedContent);
      } catch (error) {
        console.log("🚀 ~ detectDisease ~ error:", error);
        console.error(error);
        setLoading(false);
      }
    }
  };

  const formatDetectionResult = (result) => {
    const cleanText = (text) => {
      return text
        .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold (**) but keep content
        .replace(/##\s?(.*?)\n?/g, "$1") // Remove heading (##) but keep content
        .trim();
    };
  
    return Object.keys(result)
      .map((key) => {
        if (Array.isArray(result[key])) {
          return `${cleanText(key.replace(/_/g, " "))}:\n${result[key]
            .map((item) => `• ${cleanText(item)}`)
            .join("\n")}`;
        }
        return `${cleanText(key.replace(/_/g, " "))}: ${cleanText(result[key])}`;
      })
      .join("\n\n");
  };
  
  const handlePostContent = async () => {
    const { image_path } = detectionResult;
    try {
      setLoading(true);
      await createPost({
        content: editableContent,
        image: {
          uri: image_path,
          name: "detected_image.jpg",
          type: "image/jpeg",
        },
      });
      setLoading(false);
      Alert.alert("Success", "Post has been created");
      setSelectedImage(null);
      setDetectionResult(null);
      setEditableContent("");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const discardDetection = () => {
    setSelectedImage(null);
    setDetectionResult(null);
    setEditableContent("");
    setIsEditing(false);
  };

  const renderResult = () => {
    if (!detectionResult) return null;

    return (
      <View style={styles.resultContainer}>
        <Image
          source={{ uri: detectionResult.image_path }}
          style={styles.resultImage}
        />
        {isEditing ? (
          <TextInput
            style={styles.textInput}
            multiline
            value={editableContent}
            onChangeText={setEditableContent}
          />
        ) : (
          <View style={styles.resultText}>
            {editableContent.split("\n\n").map((block, i) => {
              const [label, ...rest] = block.split(":");
              const value = rest.join(":").trim();
              return (
                <Text key={i} style={styles.resultLine}>
                  <Text style={styles.boldText}>{label.trim()}:</Text> {value}
                  {"\n\n"}
                </Text>
              );
            })}
          </View>
        )}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Text style={styles.buttonText}>{isEditing ? "Save" : "Edit"}</Text>
          </TouchableOpacity>
          {!isEditing && (
            <>
              <TouchableOpacity
                style={styles.postButton}
                onPress={handlePostContent}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>Post Content</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.discardButton}
                onPress={discardDetection}
              >
                <Text style={styles.buttonText}>Discard</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!detectionResult ? (
        <>
          <View style={styles.buttonContainer}>
            <Button
              title="Capture Image"
              onPress={captureImage}
              color="#228B22"
              disabled={loading}
            />
            <Button
              title="Upload Image"
              onPress={selectImage}
              color="#228B22"
              disabled={loading}
            />
          </View>
          {selectedImage && (
            <Image source={{ uri: selectedImage.uri }} style={styles.image} />
          )}
          {selectedImage && (
            <TouchableOpacity
              style={[styles.detectButton, loading && styles.disabledButton]}
              onPress={detectDisease}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.detectButtonText}>Detect Disease</Text>
              )}
            </TouchableOpacity>
          )}
        </>
      ) : (
        renderResult()
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    width: "100%",
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
    borderRadius: 10,
  },
  detectButton: {
    backgroundColor: "#228B22",
    padding: 15,
    borderRadius: 10,
  },
  detectButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: "#90EE90",
  },
  resultContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "100%",
  },
  resultImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    fontSize: 16,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  bulletList: {
    marginLeft: 10,
  },
  bulletItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    height: 60, 
    width: "80%", 
    alignSelf: "center", 
  },
  editButton: {
    backgroundColor: "#228B22",
    padding: 5,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  postButton: {
    backgroundColor: "#228B22",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },
  discardButton: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
  resultLine: {
    fontSize: 16,
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default LivePlantDisDet;
