import React, { useEffect } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { auth } from "../firebaseConfig";
import logo from "../assets/Logo.png";
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
} from "react-native";
// Dans votre composant ou fichier d'application

import { signInWithEmailAndPassword } from "firebase/auth";


function SignInScreen({ navigation }) {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
        
      });
      console.log(value);
      console.log(auth);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={logo} style={{ width: 100, height: 100, alignSelf: "center" }}/>
      </View>
      <View style={styles.innerContainer}>
        <View>
          <View style={styles.inputWrapper}>
            <Icon style={styles.icon} name="email" size={18} color="#254b7f" />
            <TextInput
              placeholder="Email"
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
        </View>

        <Text style={styles.signupText}>Vous n'avez pas de compte ? {" "}</Text>
          <Text style={{color:'white', fontSize:18, textDecorationLine: 'underline'}} onPress={() => navigation.navigate("Sign Up")}>
            Créer un compte
          </Text>
      </View>
      <View style={styles.innerContainer}>
        <Pressable style={styles.button} onPress={signIn}>
          <Text style={styles.buttonText}>Se connecter</Text>
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
  innerContainer: {
    margin: 16,
    flex: 1/3,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
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
    minWidth:150,
    borderRadius:6,
    padding: 10,
    backgroundColor: "#fff",
    color: "#424242",
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
  signupText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
});

export default SignInScreen;