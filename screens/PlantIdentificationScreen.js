import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const PlantIdentificationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Plant Identification!</Text>
      <Button title="Go back to Profile" onPress={() => navigation.navigate('Profile')} />
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
});

export default PlantIdentificationScreen;