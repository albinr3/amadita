import { StyleSheet, View, Text, Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useContext } from "react";
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { FIREBASE_STORAGE } from "../firebaseConfig";
import { UserContext } from '../navigation/UserContext'; // Importa el contexto

function Results({ navigation}) {
  const { user} = useContext(UserContext); // Acceder al usuario desde el contexto
//route?.params?.user || rest.user.dataUser;
  console.log("desde results: ", user)
  // Función para listar todos los archivos y mostrarlos en la consola
  const fetchFiles = async () => {
    const storageRef = ref(FIREBASE_STORAGE, '/');  // Carpeta desde donde quieres listar los archivos

    try {
      const result = await listAll(storageRef);

      // Obtener las URLs de los archivos y mostrarlas en la consola
      result.items.forEach(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        console.log(`Archivo: ${itemRef.name} - URL: ${url}`);
      });
    } catch (error) {
      console.log('Error al listar los archivos:', error);
    }
  };


    
  
    useEffect(() => {
      fetchFiles();// Ejecutar la función cuando el componente se monte
    }, []);
  
   
  
  return (
    <View style={styles.screen}>
    <View style={styles.container}>
      <View style={styles.viewLogo}>
        <View style={styles.viewCirclelogo}>
          <Icon name="clipboard-pulse" style={styles.icon}></Icon>
        </View>
      </View>
      <View style={styles.viewTexts}>
        <Text style={styles.fecha}>Miercoles 29 de noviembre de{"\n"}2023</Text>
        <Text style={styles.textId}>ID: 18466089</Text>
        <Pressable style={styles.buttonVerResultados}
        onPress={()=>navigation.navigate("Analisis", {user})}
        >
          <Text style={styles.verResultados}>VER RESULTADOS</Text>
        </Pressable>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, // Para ocupar toda la pantalla
    backgroundColor: "white", // Fondo blanco para toda la pantalla

  },
  container: {
    borderWidth: 1,
    borderColor: "rgba(229,228,228,1)",
    borderBottomWidth: 1,
    flexDirection: "row",
    width: "100%",
    height: 164,
    backgroundColor: "white",
  },
  viewLogo: {
    width: 81,
    alignSelf: "flex-start",
    alignItems: "center",
    height: 68,
    marginBottom: 24,
    marginTop: 24,
    marginRight: 6
  },
  viewCirclelogo: {
    width: 68,
    height: 68,
    backgroundColor: "rgba(255,226,242,0.55)",
    borderRadius: 100,
    justifyContent: "center",
  },
  icon: {
    color: "rgba(255,2,143,1)",
    fontSize: 40,
    alignSelf: "center",
  },
  viewTexts: {
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    marginTop: 24,
  },
  fecha: {
    fontFamily: "Roboto_700Bold",
    color: "#121212",
    fontSize: 18,
  },
  textId: {
    fontFamily: "Roboto_400Regular",
    color: "#121212",
    fontSize: 16,
  },
  buttonVerResultados: {
    width: 125,
    height: 32,
    borderWidth: 1,
    borderColor: "rgba(211,210,210,1)",
    borderStyle: "solid",
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 4
  },
  verResultados: {
    fontFamily: "Roboto_700Bold",
    color: "rgba(255,2,143,1)",
    fontSize: 13,
    textAlign: "center",
    alignSelf: "center",
  },
});

export default Results;
