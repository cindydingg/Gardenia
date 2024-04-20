import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import styles from './AppStyles'; // Make sure the path is correct


const SignUp = ({ navigation }) => {
 return (
   <View style={styles.container}>
     <Text style={styles.headline}>Sign up Page</Text>
     <TextInput
       style={styles.input}
       placeholder="Username"
       placeholderTextColor="#219653"
     />
     <TextInput
       style={styles.input}
       placeholder="Password"
       placeholderTextColor="#219653"
       secureTextEntry={true}
     />
     <Button
       title="sign up"
       onPress={() => navigation.navigate('Profile')}
       color="#6FCF97"
     />
   </View>
 );
};


export default SignUp;