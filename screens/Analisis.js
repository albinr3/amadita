import { StyleSheet, View, Text, Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { FIREBASE_DB } from "../firebaseConfig";
import { useState, useContext, useEffect } from "react";
import { UserContext } from '../navigation/UserContext'; // Importa el contexto


function Analisis({ navigation }) {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext); // Acceder al usuario desde el contexto
  const { analisis, setAnalisis } = useContext(UserContext); // Acceder al análisis desde el contexto

  console.log("desde analisis1: ", user);

  // Función para obtener los análisis del usuario
  const fetchUserAnalisis = async (userId) => {
    const usersCollection = collection(FIREBASE_DB, "analisis");
    const q = query(usersCollection, where("analisisData.userId", "==", userId));

    try {
      // Ejecuta la consulta
      const querySnapshot = await getDocs(q);

      // Revisa si se encontraron documentos
      if (querySnapshot.empty) {
        console.log("No se encontró ningún análisis con ese usuario.");
        return;
      }

      // Si se encontraron, maneja los datos
      querySnapshot.forEach((doc) => {
        console.log(`from analisis: `, doc.data().analisisData);
        setAnalisis(doc.data().analisisData);
      });

    } catch (error) {
      console.error("Error al obtener los análisis: ", error);
    } finally {
      setLoading(false); // Asegúrate de que el estado de loading se actualice al final
    }
  };

  // useEffect para obtener los análisis cuando el componente se monta
  useEffect(() => {
    if (user) {
      // Si el usuario está presente en el contexto, busca sus análisis
      fetchUserAnalisis(user.id);
    }
  }, [user]); // Se ejecuta cuando 'user' cambie

  // Si aún está cargando, muestra un fragmento vacío o un spinner de carga
  if (loading) {
    return <></>; // O puedes usar un indicador de carga como ActivityIndicator
  }

  return (
    <View style={styles.screen}>
      <View style={styles.containerText}>
        <Text>Pruebas</Text>
      </View>
      <Pressable 
        onPress={() => navigation.navigate("PdfViewer")}
        style={styles.containerPrueba}
      >
        <View style={styles.botonPrueba}>
          <Text style={styles.textoPrueba}>
            {analisis.text.analisis1}
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
    flex: 1,
    backgroundColor: "white",
  },
  containerPrueba: {
    borderWidth: 1,
    borderColor: "rgba(229,228,228,1)",
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
    justifyContent: "center",
    height: "100%",
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

export default Analisis
