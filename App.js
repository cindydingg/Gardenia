import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import UploadScreen from './screens/UploadScreen';
import GardenScreen from './screens/GardenScreen';
import React, { useEffect } from "react";
import { getStorage, ref } from "firebase/storage";
import LevelUpScreen from './screens/LevelUpScreen2';

import PlantIdentificationScreen from './screens/PlantIdentificationScreen';
import LocationScreen from './screens/LocationScreen';
import GameScreen from './screens/GameScreen';  // Assuming you have a GameScreen.js
const Stack = createNativeStackNavigator();
import { StatusBar } from 'expo-status-bar';

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

const App = () => {

  return (
    <View style={styles.container}>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Upload" component={UploadScreen} />
      <Stack.Screen name="PlantIdentification" component={PlantIdentificationScreen} />
      <Stack.Screen name="LevelUpScreen" component={LevelUpScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="Garden" component={GardenScreen} />
    </Stack.Navigator>
    </NavigationContainer>
      <StatusBar style="auto" />
      {/* <Text>Gardenia!</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexWrap: "wrap",
    backgroundColor: '#E4F6F3',
    
  },

});
export default App;

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Gardenia!</Text>
//       <StatusBar style="auto" />
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
