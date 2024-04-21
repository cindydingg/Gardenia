import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

const LevelUpScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);

  return (
    // <View style={styles.container}>
    <View style>
      {/* <Text style={styles.headline}>Level Up!</Text> */}
      <Text>Level Up!</Text>

      <Button
        title="Continue"
        onPress={() => navigation.navigate('Profile')}
        color="#6FCF97"
      />
    </View>
  );
};



// import React from 'react';
// import { StyleSheet, Text, View, Button, Image } from 'react-native';

// const LevelUpScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.levelHeader}>Level 2</Text>
//       <View style={styles.gardenExpansionNotice}>
//         <Text style={styles.gardenText}>Your garden has expanded</Text>
//       </View>
//       {/* <Image source={require('./path-to-level-image.png')} style={styles.levelImage} /> */}
//       <Image source={require('../assets/lily.png')} style={styles.callaLilyImage} />
//       <Text style={styles.callaLiliesText}>Calla Lilies Rarity: High</Text>
//       <Text style={styles.plusTen}>+ 10</Text>
//       {/* <Image source={require('./path-to-additional-image.png')} style={styles.additionalImage} /> */}
//       <Button 
//         title="Continue" 
//         onPress={() => navigation.navigate('Profile')}
//         color="#6FCF97"
//         style={styles.continueButton}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   levelHeader: {
//     fontFamily: 'Poppins',
//     fontSize: 25,
//     lineHeight: 38,
//     color: '#FFFFFF',
//     position: 'absolute',
//     top: 176, // Approximation based on your CSS
//   },
//   gardenExpansionNotice: {
//     position: 'absolute',
//     width: 175,
//     height: 59,
//     top: 251,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   gardenText: {
//     fontFamily: 'Montserrat',
//     fontSize: 19,
//     lineHeight: 23,
//     textAlign: 'center',
//     color: '#426B1F',
//   },
//   levelImage: {
//     width: 86,
//     height: 90,
//     position: 'absolute',
//     top: 148,
//     left: 38,
//   },
//   callaLilyImage: {
//     width: 103,
//     height: 214,
//     position: 'absolute',
//     top: 309,
//     left: 143,
//   },
//   callaLiliesText: {
//     width: 377,
//     height: 56,
//     position: 'absolute',
//     top: 560,
//     textAlign: 'center',
//     fontFamily: 'Montserrat',
//     fontSize: 19,
//     lineHeight: 23,
//     color: '#426B1F',
//   },
//   plusTen: {
//     width: 48,
//     height: 36,
//     position: 'absolute',
//     top: 627,
//     left: 136,
//     fontFamily: 'Poppins',
//     fontSize: 24,
//     lineHeight: 36,
//     color: '#426B1F',
//   },
//   additionalImage: {
//     width: 52,
//     height: 47,
//     position: 'absolute',
//     left: 189,
//     top: 616,
//   },
//   continueButton: {
//     borderRadius: 40,
//     borderWidth: 1,
//     borderColor: '#FFFFFF',
//     overflow: 'hidden',
//   },
// });

export default LevelUpScreen;
