import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const PlantIdentificationScreen = ({ navigation }) => {
  const image = navigation.getParam('image');
  console.log(image);
  return (
    <View style={styles.container}>
      <Text>Upload Screen!</Text>
      <Button title="Identify!" onPress={() => navigation.navigate('Upload')} />
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