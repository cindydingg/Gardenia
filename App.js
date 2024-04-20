import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import UploadScreen from './screens/UploadScreen';
import PlantIdentificationScreen from './screens/PlantIdentificationScreen';
import LocationScreen from './screens/LocationScreen';
import GameScreen from './screens/GameScreen';  // Assuming you have a GameScreen.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const Stack = createNativeStackNavigator();

const genAI = new GoogleGenerativeAI(key="AIzaSyABO4W2bUHvP5BZkeGDe_5js5Z_aVx5TF4");

export default function App() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [viewImage, setViewImage] = useState(false);
  const [classificationResult, setClassificationResult] = useState(null);
  const [mimeType, setMimeType] = useState('image/jpeg')

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
    base64: true,
  });


  if (!result.canceled) {
    setSelectedImage(result.assets[0].uri);
  }
  };

const handleFilenamePress = () => {
  setViewImage(!viewImage);
};


const classifyPlantImage = async (imageUri) => {
  if (!imageUri) {
    Alert.alert('Error', 'No image selected.');
    return null;
  }

  try {
    // const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    // const prompt = "Write a story about Eggert, a notoriously hard CS professor at UCLA."

    // const result = await model.generateContent(prompt);
    // const response = await result.response;
    // const text = response.text();
    // console.log(text);
    // return text;
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = "What plant species is this?";
    console.log(imageUri)
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
  const imageUri = selectedImage; 
  const result = await classifyPlantImage(imageUri);
  setClassificationResult(result);
};

function fileToGenerativePart(uri) {

  const base64Prefix = 'base64,';
  const base64Index = uri.indexOf(base64Prefix);

  if (base64Index === -1) {
    console.error('Error: URI does not contain base64 data.');
    Alert.alert('Error', 'Invalid image URI. Please ensure it contains base64 encoded data.');
    return null;
  }

  const base64Data = uri.substring(base64Index + base64Prefix.length);
  
  if (!base64Data) {
    console.error('Error: Invalid image data.');
    Alert.alert('Error', 'Invalid image data. Please select a proper image.');
    return null;
  }

  // You might want to determine mimeType based on the data URI prefix instead of assuming
  const mimeType = uri.startsWith('data:image/jpeg') ? 'image/jpeg' :
                   uri.startsWith('data:image/png') ? 'image/png' : '';

  return {
    inlineData: {
      data: base64Data,
      mimeType: mimeType,
    },
  };
  // // Ensure the URI contains 'base64,' before processing it
  // if (!uri.includes('base64,')) {
  //   console.error('Error: URI does not contain base64 data.');
  //   Alert.alert('Error', 'Invalid image URI. Please ensure it contains base64 encoded data.');
  //   return null;
  // }

  // const base64Index = uri.indexOf('base64,') + 'base64,'.length;
  // const base64Data = uri.substring(base64Index);
  
  // if (!base64Data) {
  //   console.error('Error: Invalid image data.');
  //   Alert.alert('Error', 'Invalid image data. Please select a proper image.');
  //   return null;
  // }

  // // Assuming mimeType is determined or passed correctly as an argument
  // return {
  //   inlineData: {
  //     data: base64Data,
  //     mimeType,
  //   },
  // };
}
  
  // const fileExtension = uri.split('.').pop();
  // console.log("uri:" + uri);
  // switch(fileExtension) {
  //   case 'png':
  //     setMimeType('image/png');
  //     break;
  //   case 'jpg':
  //   case 'jpeg':
  //     setMimeType('image/jpeg');
  //     break;
  //   default:
  //     console.error('Unsupported file type:', fileExtension);
  //     return null;  // It's a good practice to handle unsupported types
  // }

  // const base64Index = uri.indexOf('base64,') + 'base64,'.length;
  // const base64Data = uri.substring(base64Index);
  
  // if (!base64Data) {
  //   console.error('Error: Invalid image data.');
  //   Alert.alert('Error', 'Invalid image data. Please select a proper image.');
  //   return null;
  // }

  // return {
  //   inlineData: {
  //     data: base64Data,
  //     mimeType,
  //   },
  // };
//}

// function fileToGenerativePart(uri, mimeType) {
//   const base64Data = uri.split(",")[1];
//   if (!base64Data) {
//     console.error('Error: Invalid image data.');
//     Alert.alert('Error', 'Invalid image data. Please select a proper image.');
//     return null;
//   }
//   return {
//     inlineData: {
//       data: base64Data,
//       mimeType,
//     },
//   };
// }

const getFilenameFromUri = (uri) => {
  if (uri) {
    const uriParts = uri.split('/');
    return uriParts[uriParts.length - 1];
  }
  return '';
};

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="PlantIdentification" component={PlantIdentificationScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Classify Image" onPress={handleClassifyImage} />
      {classificationResult && <Text>{classificationResult}</Text>}
    </View>
    </View>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'lightblue',
    alignItems: 'center',
  },
});
