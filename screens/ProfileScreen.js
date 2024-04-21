// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { db, auth, storage } from '../backend/firebaseConfig';
// import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 
// import { onAuthStateChanged } from 'firebase/auth';


// const Profile = ({ navigation }) => {
//   const [user, setUser] = useState(null);
//   const [imageUri, setImageUri] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => { // Mark the callback function as async
//       setUser(user);
//       if (user) {
//         const userRef = doc(db, 'users', user.uid);
//         try {
//           const userDoc = await getDoc(userRef); // Use await here
//           if (userDoc.exists()){
//             const userData = userDoc.data();
//             if (userData.profilePic) {
//               setImageUri(userData.profilePic);
//             }
//           }
//         } catch (error) {
//           console.error('Error fetching profile picture:', error);
//         }
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const pickImage = async () => {
//     // Ask for permission to access media library
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Sorry, we need media library permissions to make this work!');
//       return;
//     }
  
//     // Let the user pick an image from their library
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });
  
//     if (!result.cancelled && result.assets && result.assets.length > 0) {
//       const image = result.assets[0].uri;
//       // console.log("Image URI: ", result.assets[0].uri); // Log to verify URI
//       setImageUri(image);  // Set image URI using the first item in the assets array
//       uploadImage(user, image);
//     }
//   };

//   const uploadImage = async (user, imageUri) => {
//     try {
//       if (!user || !user.uid || !imageUri){
//         console.error("invalid parameters: ", {user, imageUri});
//         return;
//       }
//       // Update user's total points in Firestore
//       const userRef = doc(db, 'users', user.uid);
//       const docSnap = await getDoc(userRef);
//   if (docSnap.exists()) {
//     await updateDoc(userRef, {
//       profilePic: imageUri
//     }).catch(error => {
//       console.error("Error updating profile pic:", error);
//     });
//   } else {
//     // Optionally create the document if it doesn't exist
//     await setDoc(userRef, { profilePic: imageUri }, { merge: true });
//   }


//   return (
//     <View style={styles.container}>
//       <Text style={styles.headline}>Level 2</Text>
//       <Text style={styles.headline2}>profile</Text>
//       <View style={styles.imageContainer}>
//         {imageUri ? (
//           <Image source={{ uri: imageUri }} style={styles.image} />
//         ) : (
//           <View style={styles.placeholder} />
//         )}
//       </View>
//       <Text style={styles.headline2}>my garden</Text>
//       <Image
//         source={require('../assets/game.png')} // Adjust the path to your image file
//         style={styles.image2}
//       /> 
//       <TouchableOpacity style={styles.backButton} onPress={pickImage} 
//       > 
//       <Text style={styles.backButtonText}>Upload Profile Picture</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Upload')} 
//       > 
//       <Text style={styles.backButtonText}>Add to Garden</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Garden')} 
//       > 
//       <Text style={styles.backButtonText}>View Garden</Text>
//       </TouchableOpacity>
      
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headline: {
//     fontSize: 28,
//     color: '#219653',
//     marginBottom: 20,
//     fontWeight: '500',
//   },
//   headline2: {
//     fontSize: 20,
//     color: '#219653',
//     marginBottom: 10,
//     fontWeight: '400',
//   },
//   imageContainer: {
//     width: 100,
//     height: 100,
//     borderRadius: 100,
//     marginBottom: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',  // Ensures the image is round and does not overflow
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   image2: {
//     width: 350,  // Specify your desired width
//     height: 170, // Specify your desired height
//     resizeMode: 'contain' // or 'cover', 'stretch', etc.
//   },
//   placeholder: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#ccc',
//     borderRadius: 100,  // Ensures the placeholder is round
//   },
//   rectangle: {
//     width: 250,  // Match the width of the image container or adjust as needed
//     height: 200,   // Height for the rectangle
//     backgroundColor: '#ccc',  // Gray color
//     marginBottom: 15,  // Spacing below the rectangle
//   },
//   button: {
//     backgroundColor: '#6FCF97',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   backButton: {
//     backgroundColor: '#6FCF97', // Feel free to change the background color
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 20,
//     marginTop: 20,
//   },
//   backButtonText: {
//     color: '#FFFFFF', // Making text color white
//     fontSize: 16,
//   },
// });

// export default Profile;

// }
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, auth } from '../backend/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists() && userDoc.data().profilePic) {
            setImageUri(userDoc.data().profilePic);
          }
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
      }
    });
    return unsubscribe;
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled && result.assets) {
      const image = result.assets[0].uri;
      setImageUri(image);
      uploadImage(user, image);
    }
  };

  const uploadImage = async (user, imageUri) => {
    if (!user || !user.uid || !imageUri) {
      console.error("Invalid parameters:", { user, imageUri });
      return;
    }
    const userRef = doc(db, 'users', user.uid);

    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        await updateDoc(userRef, { profilePic: imageUri });
      } else {
        await setDoc(userRef, { profilePic: imageUri }, { merge: true });
      }
    } catch (error) {
      console.error("Error updating profile pic:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Profile</Text>
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
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Upload')}>
        <Text style={styles.buttonText}>Add to Garden</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Garden')}>
        <Text style={styles.buttonText}>View Garden</Text>
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
    fontWeight: '500',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
    borderRadius: 100,
  },
  button: {
    backgroundColor: '#6FCF97',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Profile;
