import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const LocationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Location Page!</Text>
      <Button title="Go to Game" onPress={() => navigation.navigate('Game')} />
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

export default LocationScreen;
