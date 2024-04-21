import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(key="AIzaSyABO4W2bUHvP5BZkeGDe_5js5Z_aVx5TF4");

import { db } from '../backend/firebaseConfig'; // adjust the path as necessary
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 

const { width } = Dimensions.get('window');

const PlantIdentificationScreen = ({ route, navigation }) => {
  //retrieve classification result passed as a param
  const { photo } = route.params;
  const [imgBase64, setImgBase64] = useState(`data:image/jpeg;base64,${photo.base64}`);
  const [classificationResult, setClassificationResult] = useState(null);
  const [mimeType, setMimeType] = useState('image/jpeg')
  const [points, setPoints] = useState(0);
  
  useEffect(() => {
    // Call handleClassifyImage when component mounts
    handleClassifyImage();
  }, [imgBase64]); // Pass an empty dependency array to ensure it runs only once

  const classifyPlantImage = async (imageUri) => {
    if (!imageUri) {
      Alert.alert('Error', 'No image selected.');
      return null;
    }
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      const prompt = "Output only less than 5 words stating the plant species. Give me a rating percentage of how rare this plant is. Format it like this: Venus Flytrap. 50% rarity.";
      //console.log("NORMAL imageUri:", imageUri)
      //console.log("base 64 imageUri:", imageUri.base64)
      const imagePart = fileToGenerativePart(imageUri, mimeType);
      
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = await response.text();
      console.log(text);
      return text;
    
   } catch (error) {
      console.error("Error:", error);
      Alert.alert('Classification Error', 'Failed to classify the image. Please try again.');
      return null;
    }
  }
  
  const handleClassifyImage = async () => {
    try {
      const result = await classifyPlantImage(imgBase64);
      setClassificationResult(result);
      const parsedPoints = parsePoints(result);
      setPoints(parsedPoints);

      // Update points in Firestore
      await updatePointsInFirestore(parsedPoints);

    } catch (error) {
      console.error("Error:", error);
      Alert.alert('Classification Error', 'Failed to classify the image. Please try again.');
    }
  };

  const updateFirestore = async (newPoints) => {
    try {
      const userUid = 'USER_UID';
      const userDocRef = doc(db, 'users', userUid);

      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()){
        const oldPoints = userDocSnapshot.data().points || 0;
        // Calculate the sum of old and new points
        const totalPoints = oldPoints + newPoints;
  
        // Update the 'points' field in the user's document with the total points
        await updateDoc(userDocRef, { points: totalPoints });
        
        console.log('Points updated in Firestore successfully!');
      } else {
        console.error('User document does not exist.');
      }
    } catch (error) {
        console.error("Error updating points in Firestore: ", error);
    }
};
  
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

  // Function to parse the percentage and calculate points
  const parsePoints = (resultString) => {
    const regex = /(\d+)%/; // Regular expression to find a number followed by '%'
    const match = resultString.match(regex);
    if (match && match[1]) {
      const percentage = parseInt(match[1], 10); // Convert the percentage to an integer
      return percentage * 10; // Return the points calculated by multiplying by 10
    }
    return 0; // Return 0 if no percentage is found
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your plant has been identified:</Text>
      <Text style={styles.result}>{classificationResult || 'No result available'}</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Upload')} 
      > 

      <Text style={styles.backButtonText}>Go Back to Upload</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Points Gained: </Text>
      <Text style={styles.result}>{points || 'No points available'}</Text>
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
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10, // Adding some margin for better spacing
  },
  result: {
    fontSize: 16,
    color: 'green', // Give some color to make it stand out
    marginBottom: 20, // Space before the button
  },
  buttonContainer: {
    position: 'absolute',
    width: 204.93, // Width as per your specification
    height: 50, // Height as per your specification
    left: (width - 204.93) / 2, // Center horizontally based on container width
    top: 214, // Position from the top as specified
    backgroundColor: 'gray', // Background color for visibility
    justifyContent: 'center',
    borderRadius: 25, // Optional: if you want rounded buttons
  }
});

export default PlantIdentificationScreen;