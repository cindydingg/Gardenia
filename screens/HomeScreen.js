import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Button = ({ text, onPress }) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Gardenia</Text>
      </View>
      <Button text='Login' onPress={() => navigation.navigate('SignUp', { mode: 'login' })}/>
      <Button text='Create an Account' onPress={() => navigation.navigate('SignUp', { mode: 'signup' })} />
      <TouchableOpacity style={styles.googleButtonContainer} onPress={() => {
        // Here you will integrate Google sign-in functionality
        // Example: signInWithGoogle();
      }}>
        <Image
          resizeMode="contain"
          source={require('../assets/google.webp')}
          style={styles.googleButtonImage}
        />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 480,
    width: "100%",
    margin: "0 auto",
    paddingTop: 80,
    paddingHorizontal: 31,
  },
  headerContainer: {
    marginTop: 65,
    alignSelf: "center",
  },
  headerText: {
    color: "#219653",
    fontSize: 28,
    fontFamily: "Poppins_500Medium",
  },
  buttonContainer: {
    borderRadius: 40,
    backgroundColor: "#6FCF97",
    marginTop: 21,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    paddingHorizontal: 60,
  },
  buttonText: {
    color: "#FFF",
    fontFamily: "Poppins_500Medium",
  },
  googleButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#6FCF97",
    borderRadius: 40,
    padding: 14,
    marginTop: 21,
  },
  googleButtonImage: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  googleButtonText: {
    fontFamily: "Poppins_500Medium",
  },
});

export default HomeScreen;
