import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Profile!</Text>
      <Button title="add to garden" onPress={() => navigation.navigate('PlantIdentification')} />
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

export default Profile;