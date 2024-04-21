import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PlantIdentificationScreen = ({ route, navigation }) => {
  //retrieve classification result passed as a param
  const { result } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your plant has been identified:</Text>
      <Text style={styles.result}>{result || 'No result available'}</Text>
      <View style={styles.buttonContainer} > 
      <Button title="Go Back to Upload" onPress={() => navigation.navigate('Upload')} />
      </View>
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
    backgroundColor: 'lightgray', // Background color for visibility
    justifyContent: 'center',
    borderRadius: 25, // Optional: if you want rounded buttons
  }
});

export default PlantIdentificationScreen;