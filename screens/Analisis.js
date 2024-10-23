import { StyleSheet, View, Text, Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { FIREBASE_DB } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useState, useContext, useEffect } from "react";
import { UserContext } from '../navigation/UserContext'; // Importa el contexto


function Analisis({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext); // Acceder al usuario desde el contexto
  const { analisis, setAnalisis } = useContext(UserContext); // Acceder al usuario desde el contexto

  console.log("desde analisis: ", user)
   // Effect hook to handle user authentication state changes
   useEffect(() => {
    // Subscribe to authentication state changes using Firebase Auth
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (userData) => {
      if (userData) {
        console.log("tessttssss: ", userData)
        const usersCollection = collection(FIREBASE_DB, "analisis");
        const q = query(usersCollection, where("analisisData.userId", "==", userData.uid)); 

        try {
          // Ejecuta la consulta
          const querySnapshot = await getDocs(q);
          
          // Revisa si se encontraron documentos
          if (querySnapshot.empty) {
              console.log("No se encontró ningún analisis con ese usuario.");
              return null;
          }
  
          // Si se encontró, puedes acceder a los datos
          querySnapshot.forEach((doc) => {
              console.log(`from navigation: `, doc.data().analisisData);
              setAnalisis(doc.data().analisisData); // Almacena el usuario si es necesario
          });

          
        } catch (error) {
          console.error("Error al obtener el usuario: ", error);
        }
      } else {
        // If no user data, log that no one is logged in
        console.log("No one is logged in");
      }

      // Set loading to false once authentication state is determined
      setLoading(false);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures that useEffect runs once on mount

  // If still loading, return an empty fragment
  if (loading) {
    return <></>;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.containerText}>
        <Text>Pruebas</Text>
      </View>
      <Pressable 
      onPress={() => navigation.navigate("PdfViewer")}
      style={styles.containerPrueba}>
        <View
          style={styles.botonPrueba}
        >
          <Text style={styles.textoPrueba}>
            {analisis.text}
          </Text>
        </View>
        <View style={styles.viewLogo}>
          <Icon name="arrow-right-circle-outline" style={styles.icon}></Icon>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, // Para ocupar toda la pantalla
    backgroundColor: "white", // Fondo blanco para toda la pantalla
  },
  containerPrueba: {
    borderWidth: 1,
    borderColor: "rgba(229,228,228,1)",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 80,
    backgroundColor: "white",
    padding: 6,
    
  },
  viewLogo: {
    width: 81,
    alignItems: "center",
    height: "100%",
    justifyContent:"center"
   
  },
  icon: {
    color: "rgba(255,2,143,1)",
    fontSize: 40,
    alignSelf: "center",
  },
  botonPrueba: {
    alignSelf: "center",
    flex: 1,
  },
  textoPrueba: {
    fontFamily: "Roboto_700Bold",
    color: "#121212",
    fontSize: 16,
  },
  containerText: {
    padding: 10,
    marginBottom: 6,
  },
});

export default Analisis;
