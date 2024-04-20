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
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';

const ButtonComponent = ({ text, onPress }) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const PlantIdentification = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted' && mediaLibraryStatus.status === 'granted');
    })();
  }, []);

  const handleCapture = async () => {
    if (!cameraReady || !cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(photo.uri); 
      Alert.alert("Photo saved", "Your photo was successfully saved in your media library.");
    } catch (error) {
      Alert.alert("Error", "Failed to save photo: " + error.message);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Scan Your Species</Text>
      </View>
      <Camera
        ref={cameraRef}
        style={styles.previewContainer}
        onCameraReady={() => setCameraReady(true)}
      />
      <View style={styles.buttonsContainer}>
        <ButtonComponent
          text="Cancel"
          onPress={() => Alert.alert("Cancel Pressed")}
        />
        <ButtonComponent
          text="Take Photo"
          onPress={handleCapture}
        />
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
});

export default PlantIdentification;