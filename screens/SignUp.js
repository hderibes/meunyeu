import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, TextInput, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import logo from "../assets/Logo.png";

import { auth } from '../firebaseConfig';

function SignUpScreen({ navigation }) {
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: ''
  });

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      });
      return;
    }

    try {
      console.log("on try")
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
      console.log(value.email);
      console.log(value.password);
      console.log(value.error);

    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={logo} style={{ width: 100, height: 100, alignSelf: "center" }} />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Icon style={styles.icon} name="email" size={18} color="#254b7f" />
            <TextInput
              placeholder='Email'
              value={value.email}
              style={styles.input}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icon style={styles.icon} name="lock" size={18} color="#254b7f" />
            <TextInput
              placeholder="Mot de passe"
              style={styles.input}
              onChangeText={(text) => setValue({ ...value, password: text })}
              secureTextEntry={true}
            />
          </View>
          <Text style={styles.footerText}>Vous avez déjà un compte ?</Text>
          <Text style={styles.link} onPress={() => navigation.navigate('Sign In')}>Se connecter</Text>
        </View>
      </View>
      <View style={styles.innerContainer}>
        <Pressable style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#254b7f",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer:{
    margin: 16,
    flex: 1/3,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    marginHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    marginBottom: 16,
    width: '100%',
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    paddingLeft: 10,
    backgroundColor: "white",
    marginVertical:15,
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    borderRadius:6,
    backgroundColor: '#fff',
    color: '#424242',
  },
  button: {
    minWidth:'100%',
    backgroundColor: "white",
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 24,
    margin: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "#254b7f",
    fontSize: 16,
    fontWeight:'bold'
  },
  footerText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
    color:'white',
    fontSize:18,
    textDecorationLine: 'underline'
  },
});

export default SignUpScreen;
