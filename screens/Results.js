import { StyleSheet, View, Text, Pressable, FlatList, Dimensions } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useContext, useState, useCallback } from "react";
import { UserContext } from "../navigation/UserContext"; // Importa el contexto
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
import Entypo from '@expo/vector-icons/Entypo';

const { width, height } = Dimensions.get("window");

function Results({ navigation }) {
  //route?.params?.user || rest.user.dataUser;
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext); // Acceder al usuario desde el contexto
  const { analisis, setAnalisis } = useContext(UserContext); // Acceder al análisis desde el contexto
  const [cantidadAnalisisIn, setCantidadAnalisisIn] = useState("")

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
      setCantidadAnalisisIn(Object.keys(nuevosAnalisis[0].text).length)
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
    // Divide la fecha en día, mes y año
    const [day, month, year] = dateStr.split("/");
  
    // Crea la fecha especificando directamente los componentes
    const date = new Date(year, month - 1, day); // Meses son 0-indexados en JavaScript
  
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  
    // Formatea la fecha en español
    let formattedDate = new Intl.DateTimeFormat("es-ES", options).format(date);
  
    // Capitaliza la primera letra
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  
    return formattedDate;
  };
  

  const renderItem = ({ item: analisisInn }) => {
    return (
      <View style={styles.container}>
        <View style={styles.viewLogo}>
          <View style={styles.viewCirclelogo}>
            <Entypo name="text-document" style={styles.icon}/>
          </View>
        </View>
        <View style={styles.viewTexts}>
          <Text style={styles.fecha}>{formatearFecha(analisisInn.fecha)}</Text>
          <Text style={styles.textCantidad}>Cant. de pruebas: {cantidadAnalisisIn}</Text>
          <View style={styles.viewBtn}>
            <Text style={styles.textId}>ID: 18466089</Text>
            <Pressable
              style={styles.buttonVerResultados}
              onPress={() => navigation.navigate("Analisis", {analisisId : analisisInn.analisisId})}
            >
              <Text style={styles.verResultados}>VER RESULTADOS</Text>
            </Pressable>
          </View>
          
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
    paddingVertical: height * 0.03,
    backgroundColor: "white",
    paddingHorizontal: 10,
    alignItems: "center"
  },
  viewLogo: {
    width: 81,
    alignItems: "left",
    height: 68,
    justifyContent: "center",
  },
  viewCirclelogo: {
    width: 68,
    height: 68,
    backgroundColor: "#0073c613",
    borderRadius: 100,
    justifyContent: "center",
  },
  icon: {
    color: "#0073c6",
    fontSize: 40,
    alignSelf: "center",
  },
  viewTexts: {
    
    flex: 1,
    
    alignItems: "flex-start",
    
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
  textCantidad: {
    fontFamily: "Roboto_400Regular",
    color: "#121212",
    fontSize: 16,
    marginTop: 4
  },
  buttonVerResultados: {
    width: 130,
    height: 34,
    borderWidth: 1,
    borderColor: "rgba(211,210,210,1)",
    borderStyle: "solid",
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  verResultados: {
    fontFamily: "Roboto_700Bold",
    color: "#0073c6",
    fontSize: 14,
    textAlign: "center",
    alignSelf: "center",
  },
  viewBtn: {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
    justifyContent: "space-between"
  }
});

export default Results;
