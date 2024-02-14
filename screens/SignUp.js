import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, TextInput, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

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
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* <Image source={logo} style={{ width: 100, height: 100, alignSelf: "center" }} /> */}
        <Text style={styles.title}>
          Sign Up
        </Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Icon style={styles.icon} name="email" size={18} color="gray" />
            <TextInput
              placeholder='Email'
              value={value.email}
              style={styles.input}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon style={styles.icon} name="lock" size={18} color="gray" />
            <TextInput
              placeholder="Password"
              style={styles.input}
              onChangeText={(text) => setValue({ ...value, password: text })}
              secureTextEntry={true}
            />
          </View>
        </View>
        <Pressable style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
        <Text style={styles.footerText}>
          Have an account? <Text style={styles.link} onPress={() => navigation.navigate('Sign In')}>Sign In</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    marginHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  form: {
    marginBottom: 16,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'gray',
    marginBottom: 16,
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
    backgroundColor: '#fff',
    color: '#424242',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
