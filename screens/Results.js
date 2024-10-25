import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useContext, useState, useCallback } from "react";
import { UserContext } from "../navigation/UserContext"; // Importa el contexto
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";

function Results({ navigation }) {
  //route?.params?.user || rest.user.dataUser;
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext); // Acceder al usuario desde el contexto
  const { analisis, setAnalisis } = useContext(UserContext); // Acceder al análisis desde el contexto

  // Función para obtener los análisis del usuario
  const fetchUserAnalisis = async (userId) => {
    const analisisCollection = collection(FIREBASE_DB, "analisis");
    const q = query(
      analisisCollection,
      where("analisisData.userId", "==", userId)
    );

    try {
      // Ejecuta la consulta
      const querySnapshot = await getDocs(q);

      // Revisa si se encontraron documentos
      if (querySnapshot.empty) {
        console.log("No se encontró ningún análisis con ese usuario.");
        return;
      }

      const nuevosAnalisis = [];
      querySnapshot.forEach((doc) => {
        console.log(`Análisis obtenido: `, doc.data().analisisData);
        nuevosAnalisis.push(doc.data().analisisData);
      });

      setAnalisis(nuevosAnalisis); // Reemplaza el estado de analisis en lugar de concatenarlo
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
    console.log("ventana Results: no hay nada");
    return <></>; // O puedes usar un indicador de carga como ActivityIndicator
  }

  const formatearFecha = (dateStr) => {
    // Verifica el formato y convierte la fecha si es necesario
    const [day, month, year] = dateStr.split("/"); // Asume formato DD/MM/YYYY
    const formattedDateStr = `${year}-${month}-${day}`; // Formato YYYY-MM-DD

    // Ahora puedes crear el objeto Date de forma segura
    const date = new Date(formattedDateStr);

    // Define las opciones de formato
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    // Formatea la fecha en español
    let formattedDate = new Intl.DateTimeFormat("es-ES", options).format(date);

    // Capitaliza la primera letra de la cadena
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return formattedDate;
  };

  const renderItem = ({ item: analisisInn }) => {
    return (
      <View style={styles.container}>
        <View style={styles.viewLogo}>
          <View style={styles.viewCirclelogo}>
            <Icon name="clipboard-pulse" style={styles.icon}></Icon>
          </View>
        </View>
        <View style={styles.viewTexts}>
          <Text style={styles.fecha}>{formatearFecha(analisisInn.fecha)}</Text>
          <Text style={styles.textId}>ID: 18466089</Text>
          <Pressable
            style={styles.buttonVerResultados}
            onPress={() => navigation.navigate("Analisis", {analisisId : analisisInn.analisisId})}
          >
            <Text style={styles.verResultados}>VER RESULTADOS</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      {analisis && analisis.length > 0 ? (
        <FlatList
          data={analisis}
          renderItem={renderItem}
          keyExtractor={item => item.analisisId}
        />
      ) : (
        <Text>No hay análisis disponibles</Text>
      )}
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
    marginRight: 6,
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
    paddingHorizontal: 4,
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
