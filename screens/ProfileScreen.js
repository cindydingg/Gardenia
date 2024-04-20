import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Profile = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    // Ask for permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to make this work!');
      return;
    }
  
    // Let the user pick an image from their library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
  
    if (!result.cancelled && result.assets && result.assets.length > 0) {
      // console.log("Image URI: ", result.assets[0].uri); // Log to verify URI
      setImageUri(result.assets[0].uri);  // Set image URI using the first item in the assets array
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Profile!</Text>
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload Profile Picture</Text>
      </TouchableOpacity>
      <Button
        title="Add to Garden"
        onPress={() => navigation.navigate('PlantIdentification')}
        color="#6FCF97"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    fontSize: 28,
    color: '#219653',
    marginBottom: 20,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',  // Ensures the image is round and does not overflow
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
    borderRadius: 100,  // Ensures the placeholder is round
  },
  button: {
    backgroundColor: '#6FCF97',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
});

export default Profile;
