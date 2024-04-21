import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const plants = [
  { id: 1, name: 'Gardenia', date: 'April 20, 2024', image: require('../assets/gardenia.jpg') },
  { id: 2, name: 'Japanese Maple Tree', date: 'April 21, 2024', image: require('../assets/japmaple.jpg') },
  { id: 3, name: 'Dandelion', date: 'April 22, 2024', image: require('../assets/dandelion.jpeg') },
  { id: 4, name: 'Wisteria', date: 'April 23, 2024', image: require('../assets/wisteria.jpg') },
  { id: 5, name: 'Orchid', date: 'April 24, 2024', image: require('../assets/orchid.jpg') },
  { id: 6, name: 'Lily', date: 'April 25, 2024', image: require('../assets/lily.jpg') },
];

const GardenScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {plants.map((plant) => (
          <View key={plant.id} style={styles.card}>
            <Image source={plant.image} style={styles.image} />
            <Text style={styles.name}>{plant.name}</Text>
            <Text style={styles.date}>{plant.date}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: '45%', // roughly two cards per row
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});

export default GardenScreen;

