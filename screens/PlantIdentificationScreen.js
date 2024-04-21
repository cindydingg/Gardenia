import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const PlantIdentificationScreen = ({ route, navigation }) => {
  //retrieve classification result passed as a param
  const { result } = route.params;

  return (
    <View style={styles.container}>
      <Text>Your plant has been identified:</Text>
      <Text>{result}</Text>  
      <Button title="Go Back to Upload" onPress={() => navigation.navigate('Upload')} />
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