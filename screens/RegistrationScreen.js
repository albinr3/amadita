import React, { useState, useContext } from 'react'
import { Image, Pressable, Text, TextInput, View, ActivityIndicator} from 'react-native'
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig';
import { collection, setDoc, getDocs, doc} from "firebase/firestore"; 
import { UserContext } from "../navigation/UserContext"; // Importa el contexto


export default function RegistrationScreen({ navigation }) {
  const [Nombre, setNombre] = useState('')
  const [Apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const { setUser} = useContext(UserContext); // Acceder al usuario desde el contexto

  /**
   * Navigates to the Login screen.
   */
  const onFooterLinkPress = () => {
    navigation.navigate('Login')
  }
  
  /**
   * Handles user registration.
   */
  const onRegisterPress = () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    // Activate loading animation
    setIsLoading(true);

    // Create user with email and password using Firebase authentication
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then(async (userCredential) => {
        // User signed up successfully 
        const uid = userCredential.user.uid;
        const dataUser = {
          id: uid,
          email,
          Nombre,
          Apellido
        };

        // Add user data to Firestore database
        const usersRef = collection(FIREBASE_DB, "users");
        const addUser = await setDoc(doc(usersRef, uid), {
          dataUser
        }); 
        console.log("desde Registration: ", dataUser)
        // Navigate to Home screen with user data
        setUser(dataUser)
        //navigation.replace('Home')      
      })
      .catch((error) => {
        console.error("Error al crear usuario", error);
        // ..
      })
      .finally(() => {
        // Desactivar la animación de carga, ya sea que haya tenido éxito o no
        setIsLoading(false);
      });
    
  }

  
  return (
    <View style={styles.container}>
      
        <Image
          style={styles.logo}
          source={require('../assets/icon.png')}
          resizeMode='contain'
        />
        {/* Input fields for user registration */}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setNombre(text)}
          value={Nombre}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setApellido(text)}
          value={Apellido}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
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
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaa"
          secureTextEntry
          placeholder="Confirmar Contraseña"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        {/* Display loading indicator or registration button based on isLoading state */}
        {isLoading ? (
          <ActivityIndicator size="large" color="rgba(253,72,122,1)" />
        ) : (
          <Pressable
            style={styles.button}
            onPress={() => onRegisterPress()}>
            <Text style={styles.buttonTitle}>Crear cuenta</Text>
          </Pressable>
      )}
        
        {/* Footer text with link to Login screen */}
        <View style={styles.footerView}>
          <Text style={styles.footerText}>¿Ya tienes una cuenta? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Inicia Sesion</Text></Text>
        </View>
     
    </View>
  )
}