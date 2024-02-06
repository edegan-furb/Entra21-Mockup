import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import IconButton from "../components/ui/IconButton";
import { uploadPicture, getImageUrlByName, getCurrrentUserImageName } from '../util/storage';
import { Ionicons } from '@expo/vector-icons';

function SettingsScreen() {
  const [imageSource, setImageSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track image loading state

  useEffect(() => {
    setIsLoading(true); // Start loading
    const fetchUserImage = async () => {
      const imageName = await getCurrrentUserImageName();
      if (imageName) {
        const url = await getImageUrlByName(imageName);
        setImageSource({ uri: url });
      }
      setIsLoading(false); // End loading
    };

    fetchUserImage();
  }, []);

  const handleUploadPicture = async () => {
    setIsLoading(true); // Start loading
    const imageName = await uploadPicture();
    if (imageName) {
      const url = await getImageUrlByName(imageName);
      setImageSource({ uri: url });
    }
    setIsLoading(false); // End loading
  };

  const iconSize = Math.min(styles.imageContainer.width, styles.imageContainer.height); // Assuming square container for simplicity

  return (
    <View style={styles.rootContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#e0e7ff" />
          ) : imageSource ? (
            <Image source={imageSource} style={styles.image} />
          ) : (
            <Ionicons name="person-circle-outline" color="#6366f1" size={iconSize} /> //size needs to be 100% of imageContaineir View
          )}
        </View>
        <View style={styles.buttonContainer}>
          <IconButton icon={"pencil-outline"} size={24} color={"#1e1b4b"} onPress={handleUploadPicture} />
        </View>
      </View>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  contentContainer: {
    flexDirection: 'column', // Arrange children in a row
    alignItems: 'center', // Center children vertically in the container
  },
  imageContainer: {
    backgroundColor: "#1e1b4b",
    borderWidth: 1.5,
    borderColor: "#6366f1",
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
    resizeMode: "cover",
  },
  buttonContainer: {
    alignSelf: "flex-end",
  },
});
