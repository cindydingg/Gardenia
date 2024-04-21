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
      <Text style={styles.headline}>Level 2</Text>
      <Text style={styles.headline2}>profile</Text>
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <Text style={styles.headline2}>my garden</Text>
      <View style={styles.rectangle} />  
      <TouchableOpacity style={styles.backButton} onPress={pickImage} 
      > 
      <Text style={styles.backButtonText}>Upload Profile Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Upload')} 
      > 
      <Text style={styles.backButtonText}>Add to Garden</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Garden')} 
      > 
      <Text style={styles.backButtonText}>View Garden</Text>
      </TouchableOpacity>
      
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
  headline2: {
    fontSize: 20,
    color: '#219653',
    marginBottom: 10,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  imageContainer: {
    width: 100,
    height: 100,
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
  rectangle: {
    width: 250,  // Match the width of the image container or adjust as needed
    height: 200,   // Height for the rectangle
    backgroundColor: '#ccc',  // Gray color
    marginBottom: 15,  // Spacing below the rectangle
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
  backButton: {
    backgroundColor: '#6FCF97', // Feel free to change the background color
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  backButtonText: {
    color: '#FFFFFF', // Making text color white
    fontSize: 16,
    fontFamily: 'Poppins', // Ensure you have this font loaded if you use it
  },
});

export default Profile;
