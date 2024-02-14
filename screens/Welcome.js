import React from 'react';
import { Text, Pressable, Image, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#141e30', '#243b55']} style={styles.gradient}>
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>Image d'accueil</Text>
            {/* <Image source={require('../../assets/phone.png')} style={styles.image} /> */}
          </View>
          <Text style={styles.subtitle}>Keep all your client conversations in one place</Text>
          <Text style={styles.description}>
            At legal call we allow you to contact your clients through voice and text without giving out your phone number
          </Text>
          <View>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Sign In')}>
              <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Sign Up')}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    borderRadius: 20,
  },
  content: {
    marginHorizontal: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  title: {
    color: 'white',
    fontSize: 24,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  subtitle: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 6,
  },
  description: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
