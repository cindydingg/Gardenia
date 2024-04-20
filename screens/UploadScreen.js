// import { useState, useEffect } from 'react';
// import { Text, View, TouchableOpacity, Image, StyleSheet
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// export default function JournalPage(){
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [viewImage, setViewImage] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status: cameraStatus } = await ImagePicker.getCameraPermissionsAsync(); // Fix typo and syntax error
//       if (cameraStatus !== 'granted') {
//         const newCameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        
//         if (newCameraStatus.status !== 'granted') {
//           alert('We need camera and camera roll permissions to make this work.');
//         }
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     const result = await ImagePicker.launchCameraAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.All,
//     allowsEditing: true,
//     aspect: [4, 3],
//     quality: 1,
//   });

//   if (!result.canceled) {
//     setSelectedImage(result.assets[0].uri);
//   }
//   };

// const getFilenameFromUri = (uri) => {
//   if (uri) {
//     const uriParts = uri.split('/');
//     return uriParts[uriParts.length - 1];
//   }
//   return '';
// };

// const handleFilenamePress = () => {
//   setViewImage(!viewImage);
// };

//   return (
//     <View style={styles.container}>
//       <Text>Gardenia!</Text>
//       <View>
//           <TouchableOpacity
//             style={{
//               minWidth: '80%', minHeight: 40, borderRadius: 2, backgroundColor: 'lightgrey', alignItems: 'center', justifyContent: 'center', marginTop: 10,
//             }}
//             onPress={pickImage}
//           >
//             <Text>+ add attachment</Text>
//           </TouchableOpacity>
//           {selectedImage !== null ? (
//             <>
//               <TouchableOpacity onPress={handleFilenamePress}>
//                 <Text>{getFilenameFromUri(selectedImage)}</Text>
//               </TouchableOpacity>
//               {viewImage && (
//                 <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
//               )}
//             </>
//           ) : null}
//     </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Button } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(key="AIzaSyABO4W2bUHvP5BZkeGDe_5js5Z_aVx5TF4");

const ButtonComponent = ({ text, onPress }) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const UploadScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [capturedImageUri, setCapturedImageUri] = useState(null); // New state 
  const cameraRef = useRef(null);

  const [classificationResult, setClassificationResult] = useState(null);
  const [mimeType, setMimeType] = useState('image/jpeg')

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted' && mediaLibraryStatus.status === 'granted');
    })();
  }, []);

  const handleCapture = async () => {
    console.log('hi!!!!!');
    if (!cameraReady || !cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync(options={
        base64: true,
        quality: 0.5
      });
      setCapturedImageUri(`data:image/jpeg;base64,${photo.base64}`);
      //console.log("Base64 Data: ", photo.base64);
    } catch (error) {
      // Alert.alert()
      Alert.alert("Error", "Failed to take photo: " + error.message);
    }
  };

  const handleCancel = () => {
    setCapturedImageUri(null);
  }

  const handleToIdentify = async () => {
    try {
      if (capturedImageUri) {
        const asset = await MediaLibrary.createAssetAsync(capturedImageUri); 
        Alert.alert("Photo saved", "Your photo was successfully saved in your media library.");
        navigation.navigate('PlantIdentification');
      } else {
        Alert.alert("No Image", "You haven't captured any image yet.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save photo: " + error.message);
    }
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
    console.log("URI Provided to API: ", capturedImageUri);
    const imageUri = capturedImageUri; 
    const result = await classifyPlantImage(capturedImageUri);
    setClassificationResult(result);
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
    // const base64Marker = ';base64,';
    // const base64Index = uri.indexOf(base64Marker) + base64Marker.length;
  
    // if (base64Index === base64Marker.length - 1) {
    //   console.error('Error: URI does not contain base64 data.');
    //   Alert.alert('Error', 'Invalid image URI. Please ensure it contains base64 encoded data.');
    //   return null;
    // }
  
    // const base64Data = uri.substring(base64Index);
    // if (!base64Data) {
    //   console.error('Error: Invalid image data.');
    //   Alert.alert('Error', 'Invalid image data. Please select a proper image.');
    //   return null;
    // }
  
    // // Deduce mimeType from URI
    // const mimeType = uri.startsWith('data:image/jpeg') ? 'image/jpeg' : 'image/png';
  
    // return {
    //   inlineData: {
    //     data: uri,
    //     mimeType,
    //   },
    // };
    
  }
  
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

  const getFilenameFromUri = (uri) => {
    if (uri) {
      const uriParts = uri.split('/');
      return uriParts[uriParts.length - 1];
    }
    return '';
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Scan Your Species</Text>
      </View>
      {capturedImageUri && ( // Render the captured image if URI is available
        <Image source={{ uri: capturedImageUri }} style={styles.previewContainer} />
      )}
      {!capturedImageUri && 
      <Camera
        ref={cameraRef}
        style={styles.previewContainer}
        onCameraReady={() => setCameraReady(true)}
      />
      }
      <View style={styles.buttonsContainer}>
        <ButtonComponent
          text="Cancel"
          onPress={handleCancel}
        />
        <ButtonComponent
          text="Take Photo"
          onPress={handleCapture}

        />
        <ButtonComponent
          text="Identify!"
          onPress={handleToIdentify}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Classify Image" onPress={handleClassifyImage} />
      {classificationResult && <Text>{classificationResult}</Text>}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 28,
  },
  headerContainer: {
    marginTop: 43,
  },
  headerText: {
    color: "#219653",
    textAlign: "center",
    fontSize: 28,
    fontFamily: "Poppins, sans-serif",
  },
  previewContainer: {
    flex: 1,
    width: "100%",
    height: 471,
    marginTop: 30,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 47,
    alignSelf: "stretch",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#6FCF97",
    borderRadius: 40,
    marginHorizontal: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Poppins, sans-serif",
  },
  button: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'lightblue',
    alignItems: 'center',
  },
});

export default UploadScreen;