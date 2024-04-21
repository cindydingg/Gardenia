import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { db, app, auth } from '../backend/firebaseConfig'; // adjust the path as necessary
import { doc, setDoc } from "firebase/firestore";
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication, navigation }) => {
  return (
    <View style={styles.authContainer}>
       <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

       <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
}

const AuthenticatedScreen = ({ user, handleLogout, navigation }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome, {user.email}!</Text>
      <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
        color="#3498db" // You can change the color as needed
      />
    </View>
  );
};

const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out successfully!');
    // Optionally handle any state updates or navigations post-logout
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export default HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  console.log("DB:", db);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

const createUserDocument = async (user) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      profilePic: null,
      points: 0,
      images: [],
      level: 0,
    });
    console.log('New user document created successfully:', user.uid);
  } catch (error) {
    console.error('Error creating user document: ', error);
  }
};

const handleAuthentication = async () => {
  try {
    if (user) {
      // If user is already authenticated, log out
      console.log('User logged out successfully!');
      await signOut(auth);
    } else {
      // Sign in or sign up
      if (isLogin) {
        // Sign in
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully!');
      } else {
        // Sign up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created successfully!');
        // After successful sign-up, create user document
        await createUserDocument(userCredential.user);

      }
    }
  } catch (error) {
    console.error('Authentication error:', error.message);
  }
};

return (
  <ScrollView contentContainerStyle={styles.container}>
    {user ? (
      <AuthenticatedScreen user={user} handleLogout={handleLogout} navigation={navigation} />
    ) : (
      <AuthScreen
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        handleAuthentication={handleAuthentication}
      />
    )}
  </ScrollView>
);
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
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
    fontFamily: "Poppins",
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
// const Button = ({ text, onPress }) => (
//   <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
//     <Text style={styles.buttonText}>{text}</Text>
//   </TouchableOpacity>
// );

// const HomeScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerText}>Gardenia</Text>
//       </View>
//       <Button text='Login' onPress={() => navigation.navigate('SignUp', { mode: 'login' })}/>
//       <Button text='Create an Account' onPress={() => navigation.navigate('SignUp', { mode: 'signup' })} />
//       <TouchableOpacity style={styles.googleButtonContainer} onPress={() => {
//         // Here you will integrate Google sign-in functionality
//         // Example: signInWithGoogle();
//       }}>
//         <Image
//           resizeMode="contain"
//           source={require('../assets/google.webp')}
//           style={styles.googleButtonImage}
//         />
//         <Text style={styles.googleButtonText}>Continue with Google</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     maxWidth: 480,
//     width: "100%",
//     margin: "0 auto",
//     paddingTop: 80,
//     paddingHorizontal: 31,
//   },
//   headerContainer: {
//     marginTop: 65,
//     alignSelf: "center",
//   },
//   headerText: {
//     color: "#219653",
//     fontSize: 28,
//     fontFamily: "Poppins_500Medium",
//   },
  // buttonContainer: {
  //   borderRadius: 40,
  //   backgroundColor: "#6FCF97",
  //   marginTop: 21,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingVertical: 17,
  //   paddingHorizontal: 60,
  // },
  // buttonText: {
  //   color: "#FFF",
  //   fontFamily: "Poppins_500Medium",
  // },
//   googleButtonContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFF",
//     borderWidth: 1,
//     borderColor: "#6FCF97",
//     borderRadius: 40,
//     padding: 14,
//     marginTop: 21,
//   },
//   googleButtonImage: {
//     marginRight: 10,
//     width: 24,
//     height: 24,
//   },
//   googleButtonText: {
//     fontFamily: "Poppins_500Medium",
//   },
// });

// export default HomeScreen;
