import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, auth, storage } from '../backend/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 
import { onAuthStateChanged } from 'firebase/auth';


const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => { // Mark the callback function as async
      setUser(user);
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        try {
          const userDoc = await getDoc(userRef); // Use await here
          if (userDoc.exists()){
            const userData = userDoc.data();
            if (userData.profilePic) {
              setImageUri(userData.profilePic);
            }
          }
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

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
      const image = result.assets[0].uri;
      // console.log("Image URI: ", result.assets[0].uri); // Log to verify URI
      uploadImage(user, imageUri);
      setImageUri(image);  // Set image URI using the first item in the assets array
    }
  };

  // const uploadImage = async (uid, pointsToAdd) => {
  //   const userRef = doc(db, 'users', uid);
  //   let profilePicture = "";
  //   try {
  //     // Update user's total points in Firestore
  //     const userDoc = await getDoc(userRef);
  //     if (userDoc.exists()){
  //       const userData = userDoc.data();
  //       profilePicture = userData.profilePic;
  //     }
  //     await updateDoc(userRef, {
  //       profilePic: profilePicture
  //     });
  //   } catch (error) {
  //     console.error("Error updating user points:", error);
  //   }
  // };

  // const uploadImage = async (image) => {
    
  //   try {
  //     if (!user) {
  //       console.log("User is null. Cannot upload image.");
  //       return;
  //     }

  //     const response = await fetch(image);
  //     const blob = await response.blob();

  //     // Upload the image to Firebase Storage
  //     const ref = storage.ref().child(path);
  //     await ref.put(blob);

  //     // Get the download URL of the uploaded image
  //     const imageUrl = await ref.getDownloadURL();
      
  //     // Save the image URL in Firestore
  //     await saveImageUrlToFirestore(imageUrl);
      
  //     // Set the image URI to display the uploaded image
  //     setImageUri(imageUrl);
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // }

  // const uploadImage = async (user) => {
  //   try {
  //     // Update user's total points in Firestore
  //     const userRef = doc(db, 'users', user.uid);
  //     const userDoc = await getDoc(userRef);
  //     if (userDoc.exists()){
  //       setImageUri(userDoc.data().profilePic);
        
  //     }
  //     await updateDoc(userRef, {
  //       profilePic: imageUri
  //     });
  //   } catch (error) {
  //     console.error("Error updating profile pic:", error);
  //   }
  // };
  const uploadImage = async (user, imageUri) => {
    try {
      if (!user || !user.uid){
        console.error("invalid user object: ", user);
        return;
      }
      // Update user's total points in Firestore
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        profilePic: imageUri // Assuming imageUri is set correctly in pickImage
      });
    } catch (error) {
      console.error("Error updating profile pic:", error);
    }
  };

  // const saveImageUrlToFirestore = async (imageUrl) => {
  //   try {
  //     // Save the image URL in Firestore under the user's document
  //     // You can replace 'currentUserUID' with the actual UID of the logged-in user
  //     await db.collection('users').doc(user).update({
  //       profilePic: imageUrl,
  //     });
  //   } catch (error) {
  //     console.error('Error saving image URL to Firestore:', error);
  //   }
  // };
  

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
      <Image
        source={require('../assets/game.png')} // Adjust the path to your image file
        style={styles.image2}
      /> 
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
    fontFamily: ' ',
    fontWeight: '500',
  },
  headline2: {
    fontSize: 20,
    color: '#219653',
    marginBottom: 10,
    fontFamily: ' ',
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
  image2: {
    width: 350,  // Specify your desired width
    height: 170, // Specify your desired height
    resizeMode: 'contain' // or 'cover', 'stretch', etc.
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
    fontFamily: ' ',
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
    fontFamily: ' ', // Ensure you have this font loaded if you use it
  },
});


export default Profile;
