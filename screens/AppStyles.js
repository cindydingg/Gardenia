import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';

async function loadFonts() {
  await Font.loadAsync({
    // 'Poppins': require('../assets/Poppins-Regular.ttf'),
    // 'Poppins-Bold': require('./assets/Poppins-Bold.ttf'),
  });
}

export default StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#FFFFFF', // Full background color
   alignItems: 'center',
   justifyContent: 'center',
   padding: 20,
   marginBottom: 0,
 },
 headline: {
   fontSize: 28,
   color: '#219653',
   marginBottom: 50,
  //   
   fontWeight: '500',
 },
 input: {
   height: 50,
   width: '90%',
   marginVertical: 10,
   borderWidth: 1,
   padding: 10,
   borderColor: '#C4C4C4',
   borderRadius: 40,
   backgroundColor: '#FFFFFF',
   color: '#000000',
    
   fontSize: 14,
 },
 image: {
   width: 300,
   height: 300,
   marginTop: 20,
 },


});
