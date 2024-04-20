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


   if (!result.cancelled) {
     setImageUri(result.uri);
   }
 };


 return (
   <View style={styles.container}>
     <Text style={styles.headline}>Profile!</Text>
     {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
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
 image: {
   width: 200,
   height: 200,
   borderRadius: 100, // Make the image round
   marginBottom: 20,
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