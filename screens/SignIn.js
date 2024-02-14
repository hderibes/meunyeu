import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
} from "react-native";
// Dans votre composant ou fichier d'application

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

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
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* <Image
          source={logo}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        /> */}
        <Text style={styles.title}>Sign In</Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icon style={styles.icon} name="email" size={18} color="gray" />
            <TextInput
              placeholder="Email"
              value={value.email}
              style={styles.input}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icon style={styles.icon} name="lock" size={18} color="gray" />
            <TextInput
              placeholder="Password"
              style={styles.input}
              onChangeText={(text) => setValue({ ...value, password: text })}
              secureTextEntry={true}
            />
          </View>
        </View>

        <Pressable style={styles.button} onPress={signIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>

        <Text style={styles.signupText}>
          Don't Have an account?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate("Sign Up")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    marginHorizontal: 16,
    height: "5/6",
    justifyContent: "center",
    alignItems: "center",
    spacing: 6,
  },
  title: {
    fontFamily: "font-title",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  inputContainer: {
    spacing: 6,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ccc",
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    color: "#424242",
  },
  button: {
    backgroundColor: "#background",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "font-main",
    fontSize: 16,
  },
  signupLink: {
    color: "blue",
  },
});
