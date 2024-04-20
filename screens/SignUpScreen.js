import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const SignUp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Sign up Page!</Text>
      <Button title="sign up" onPress={() => navigation.navigate('Profile')} />
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

export default SignUp;