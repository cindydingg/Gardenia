import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const PlantIdentificationScreen = ({ route, navigation }) => {
  //retrieve classification result passed as a param
  const { result } = route.params;

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

  // Calculate points from the result
  const points = parsePoints(result);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your plant has been identified:</Text>
      <Text style={styles.result}>{result || 'No result available'}</Text>
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