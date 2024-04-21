import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Button } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';

const ButtonComponent = ({ text, onPress }) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const UploadScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [capturedImageUri, setCapturedImageUri] = useState(null); // New state 
  const [imgBase64, setImgBase64] = useState(null);
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
      const photo = await cameraRef.current.takePictureAsync(options={
        base64: true,
        quality: 0.5
      });
      setCapturedImageUri(photo.uri);
      setImgBase64(`data:image/jpeg;base64,${photo.base64}`);
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
    //await classifyPlantImage();
    // if (capturedImageUri) {
    //   try {
    //     await MediaLibrary.createAssetAsync(capturedImageUri);
    //     Alert.alert("Photo saved", "Your photo was successfully saved in your media library.");
    //   } catch (error) {
    //     Alert.alert("Error", "Failed to save photo: " + error.message);
    //   }
    // } else {
    //   Alert.alert("No Image", "You haven't captured any image yet.");
    // }
    try {
      //saves to library
      if (capturedImageUri) {
        const asset = await MediaLibrary.createAssetAsync(capturedImageUri); 
        Alert.alert("Photo saved", "Your photo was successfully saved in your media library.");
        //pass classificationResult to next screen
       // In your UploadScreen's handleToIdentify or a similar function
      navigation.navigate('Plant Identity', { imgBase64: imgBase64 });

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

// // useEffect that triggers navigation when the result is ready
// useEffect(() => {
//   if (classificationResult) {
//       handleToIdentify();
//   }
// }, [classificationResult]); // Only re-run the effect if classificationResult changes

// const handleBoth = async () => {
//   await handleClassifyImage();
// };


  const handleBoth = async () => {
    await handleClassifyImage(); 
    if (classificationResult) { // Check if there is a result from classification
        handleToIdentify(); // Then, handle identification and navigation if classification was successful
    } 
//     // else {
//     //     Alert.alert("Classification Error", "Unable to classify the image.");
//     // }
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
      {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Classify Image" onPress={handleClassifyImage} />
      {classificationResult && <Text>{classificationResult}</Text>}
    </View> */}
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
  },
  button: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'lightblue',
    alignItems: 'center',
  },
});

export default UploadScreen;