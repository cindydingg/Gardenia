import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Page - Gardenia!</Text>
      <Button title="Go to Sign Up" onPress={() => navigation.navigate('SignUp')} />
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

export default HomeScreen;