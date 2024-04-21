import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const GameScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Game Page!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
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


export default GameScreen;
