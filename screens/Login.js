import React, { useState } from "react";
import {
  Image,
  ActivityIndicator,
  Text,
  TextInput,
  Pressable,
  View,
} from "react-native";
//import { KeyboardAdwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet } from 'react-native'
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onFooterLinkPress = () => {
    navigation.navigate("RegistrationScreen");
  };

  const onLoginPress = async () => {
    // Activate loading animation
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      // Signed in

      navigation.navigate("Home");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("User and password are incorrect or user does not exist");
      console.error("Error when logging in", error);
    } finally {
      // Desactivar la animación de carga, ya sea que haya tenido éxito o no
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/icon.png")} />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#aaa"
        onChangeText={(text) => setEmail(text)}
        value={email}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaa"
        secureTextEntry
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      {/* Display loading indicator or registration button based on isLoading state */}
      {isLoading ? (
        <ActivityIndicator size="large" color="rgba(253,72,122,1)" />
      ) : (
        <Pressable style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </Pressable>
      )}
      <View style={styles.footerView}>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text onPress={onFooterLinkPress} style={styles.footerLink}>
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  title: {
  
  },
  logo: {
    
    height: 120,
    width: 210,
    alignSelf: "center",
    margin: 30
  },
  input: {
    height: 48,
    width: "80%",
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    
    paddingLeft: 16
  },
  button: {
    backgroundColor: 'rgba(253,72,122,1)',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    width: "80%",
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d'
  },
  footerLink: {
    color: 'rgba(253,72,122,1)',
    fontWeight: 'bold',
    fontSize: 16
  }
})