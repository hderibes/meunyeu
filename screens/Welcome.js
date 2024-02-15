import React from 'react';
import { Text, Pressable, View, StyleSheet , ImageBackground, SafeAreaView, Platform, StatusBar} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const image = require('../assets/welcomeBackground.jpg')
function WelcomeScreen({ navigation }) {
  
  return (
    <SafeAreaView style={styles.SafeAreaView}>  
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>     
          <View style={{flex:1.4}}></View>
          <View style={{flex:1}}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Sign In')}>
              <Text style={styles.buttonText}>Se connecter</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Sign Up')}>
              <Text style={styles.buttonText}>S'inscrire</Text>
            </Pressable>
          </View>
         
          </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView:{
    backgroundColor:"#254b7f",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 8,
  },
  buttonText: {
    color: "#254b7f",
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
