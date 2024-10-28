import React, { useState, useContext } from "react";
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
import { UserContext } from '../navigation/UserContext'; // Importa el contexto

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext); // Acceder al usuario desde el contexto

  const onFooterLinkPress = () => {
    navigation.navigate("RegistrationScreen");
  };

  const onLoginPress = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );

      // Actualiza el contexto con los datos del usuario logueado
    // Asegúrate de recoger los datos necesarios para setUser

    // Ahora, debes extraer estos datos.
    const userDoc = await getDoc(doc(FIREBASE_DB, 'users', userCredential.user.uid));
    if (userDoc.exists()) {
      setUser(userDoc.data().dataUser);  // Actualiza el contexto
    }

      navigation.navigate("MainStack");
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          alert("Usuario no encontrado");
          break;
        case 'auth/wrong-password':
          alert("Contraseña incorrecta");
          break;
        default:
          alert("Fallo al iniciar sesion, intentar luego");
      }
      console.error("Error when logging in:", error);
    } finally {
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
        placeholder="Contraseña"
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
          <Text style={styles.buttonTitle}>Iniciar sesion</Text>
        </Pressable>
      )}
      <View style={styles.footerView}>
        <Text style={styles.footerText}>
          ¿No tienes cuenta?{" "}
          <Text onPress={onFooterLinkPress} style={styles.footerLink}>
            Registrarse
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
    marginHorizontal: 30,
    marginTop: 80
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