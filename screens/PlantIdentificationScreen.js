import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const UploadScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Upload Screen!</Text>
      <Button title="Identify!" onPress={() => navigation.navigate('PlantIdentification')} />
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

export default UploadScreen;