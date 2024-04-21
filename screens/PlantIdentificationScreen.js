import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(key="AIzaSyABO4W2bUHvP5BZkeGDe_5js5Z_aVx5TF4");

import { db, auth } from '../backend/firebaseConfig'; // adjust the path as necessary
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 

const { width } = Dimensions.get('window');

const PlantIdentificationScreen = ({ route, navigation }) => {
  const { imgBase64 } = route.params;
  const [classificationResult, setClassificationResult] = useState(null);
  const [mimeType] = useState('image/jpeg')
  const [points, setPoints] = useState(0);
  const [user, setUser] = useState(null);

  const processClassificationResult = (result) => {
    // Check if result ends with "rarity." and remove the last 12 characters
    if (result && !result.startsWith("Not a Plant")) {
      return result.slice(0, -4).trim();
    }
    return result;
  };

  // Process classificationResult before rendering
  const displayClassificationResult = processClassificationResult(classificationResult);

  useEffect(() => {
    classifyPlantImage(imgBase64);
  }, [imgBase64]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (classificationResult && user) {
      const calculatedPoints = parsePoints(classificationResult);
      setPoints(calculatedPoints);  // Update points state when classificationResult updates
      updateUserPoints(user.uid, calculatedPoints);
    }
  }, [classificationResult, user]);

  const classifyPlantImage = async (imageUri) => {
    if (!imageUri) {
      Alert.alert('Error', 'No image selected.');
      return null;
    }
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      const prompt = "Output only less than 5 words stating the plant species. Give me a percentage of how common this plant is where 1% means the plant is super common and 100% means this plant is super rare. Format it like this: Venus Flytrap 30% If it is not a plant, format it like this: Not a Plant :(";
      //console.log("NORMAL imageUri:", imageUri)
      //console.log("base 64 imageUri:", imageUri.base64)
      const imagePart = fileToGenerativePart(imageUri, mimeType);
      
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = await response.text();
      console.log(text);
      setClassificationResult(text);
      return text;
    
   } catch (error) {
      console.error("Error:", error);
      Alert.alert('Classification Error', 'Failed to classify the image. Please try again.');
      return null;
    }
  }

  const updateUserPoints = async (uid, pointsToAdd) => {
    const userRef = doc(db, 'users', uid);
    let updatedPoints = 0;
    try {
      // Update user's total points in Firestore
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()){
        const userData = userDoc.data();
        const currentPoints = userData.points || 0;
        updatedPoints = currentPoints + pointsToAdd;
      }
      await updateDoc(userRef, {
        points: updatedPoints
      });
    } catch (error) {
      console.error("Error updating user points:", error);
    }
  };

  // const handleClassifyImage = async () => {
  //   //console.log("URI Provided to API: ", capturedImageUri);
  //   const imageUri = imgBase64; 
  //   const result = await classifyPlantImage(imgBase64);
  //   setClassificationResult(result);
  // };
  
  function fileToGenerativePart(uri) {
    const prefix = 'data:image/jpeg;base64,';
    if (uri.startsWith(prefix)) {
      return {
        inlineData: {
          data: uri.substring(prefix.length),
          mimeType,
        },
      };
    } else {
      console.error('Invalid URI format');
      Alert.alert('Error', 'Invalid image format. Expected base64 encoded JPEG image.');
      return null;
    }
  }

  const parsePoints = (resultString) => {
    if (!resultString) return 0;
    const regex = /(\d+)%/;
    const match = resultString.match(regex);
    return match ? parseInt(match[1], 10) : 0;
  };
  // // Function to parse the percentage and calculate points
  // const parsePoints = (resultString) => {
  //   const regex = /(\d+)%/; // Regular expression to find a number followed by '%'
  //   const match = resultString.match(regex);
  //   if (match && match[1]) {
  //     const percentage = parseInt(match[1], 10); // Convert the percentage to an integer
  //     return percentage * 10; // Return the points calculated by multiplying by 10
  //   }
  //   return 0; // Return 0 if no percentage is found
  // };

const PlantIdentificationScreen = ({ navigation }) => {
  const image = navigation.getParam('image');
  console.log(image);
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.header}>Plant Identity</Text>
        <Text style={styles.matchPercentage}>{points ? `${points}% rarity` : '...'}</Text>
        <Image 
            source={require('../assets/planttest.webp')} 
            style={styles.plantImage}
        />
        <View style={styles.plantNameContainer}>
          <Text style={styles.plantName}>{displayClassificationResult || 'analyzing...'}</Text>
        </View>
      </View>
      <Text style={styles.pointsHeader}> {points ? `+${points} points` : '...'}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Upload')}
      >
        <Text style={styles.buttonTextPhoto}>new photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    fontSize: 37,
    color: '#219653',
    fontWeight: 'bold',
    marginTop: 20
  },
  pointsHeader: {
    fontSize: 37,
    color: '#219653',
    fontWeight: 'bold',
    marginTop: 55,
    marginBottom: 20,
  },
  matchPercentage: {
    fontSize: 20,
    color: '#FFFFFF',
    backgroundColor: '#6FCF97',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 10
  },
  plantImage: {
    width: 150, // Set the width as needed
    height: 150, // Set the height as needed
    resizeMode: 'contain', // Keep the plant image aspect ratio
    marginTop: 20
  },
  plantNameContainer: {
    backgroundColor: 'transparent',
    borderColor: "#6FCF97",
    borderWidth: 2,
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 20,
    marginTop: 20
  },
  plantName: {
    fontSize: 30,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#219653',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#6FCF97',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  buttonTextPhoto: {
    fontSize: 25,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  boxContainer: {
    backgroundColor: 'white',
    padding: 55,
    alignItems: 'center',
    shadowColor: '#6FCF97', // These shadow properties are for iOS
    shadowOffset: { width: 0, height: 1},
    shadowOpacity: 1,
    // shadowRadius: 3,
    marginTop: 40,
  },
});

export default PlantIdentificationScreen;