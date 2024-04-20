import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [viewImage, setViewImage] = useState(false);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.getCameraPermissionsAsync(); // Fix typo and syntax error
      if (cameraStatus !== 'granted') {
        const newCameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        
        if (newCameraStatus.status !== 'granted') {
          alert('We need camera and camera roll permissions to make this work.');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setSelectedImage(result.assets[0].uri);
  }
  };

const getFilenameFromUri = (uri) => {
  if (uri) {
    const uriParts = uri.split('/');
    return uriParts[uriParts.length - 1];
  }
  return '';
};

const handleFilenamePress = () => {
  setViewImage(!viewImage);
};

  return (
    <View style={styles.container}>
      <Text>Gardenia!</Text>
      <StatusBar style="auto" />
      <View>
          <TouchableOpacity
            style={{
              minWidth: '80%', minHeight: 40, borderRadius: 2, backgroundColor: 'lightgrey', alignItems: 'center', justifyContent: 'center', marginTop: 10,
            }}
            onPress={pickImage}
          >
            <Text>+ add attachment</Text>
          </TouchableOpacity>
          {selectedImage !== null ? (
            <>
              <TouchableOpacity onPress={handleFilenamePress}>
                <Text>{getFilenameFromUri(selectedImage)}</Text>
              </TouchableOpacity>
              {viewImage && (
                <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
              )}
            </>
          ) : null}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
