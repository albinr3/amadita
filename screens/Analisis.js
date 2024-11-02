import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../navigation/UserContext"; // Importa el contexto
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

function Analisis({ navigation, route, ...props }) {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext); // Acceder al usuario desde el contexto
  const { analisis } = useContext(UserContext); // Acceder al análisis desde el contexto
  const analisisId = route.params.analisisId

  const details = analisis.filter(doc => doc.analisisId === analisisId)[0];
  //console.log("details en ventana analisis ", details)
  // Comprobar que details y details.text están definidos
  if (!details || !details.text) {
    return (
      <View style={styles.screen}>
        <Text>No se encontraron análisis.</Text>
      </View>
    );
  }
// Convertir el objeto `text` a un array de valores
const analisisArray = Object.values(details.text);

  console.log("analisisId en ventana analisis ", analisisArray)
  const renderItem = ({ item: analisisInn }) => {
    return (
      <>
        
        <Pressable
          onPress={() => navigation.navigate("PdfViewer", {analisisId : analisisId, idInterno: analisisInn.id})}
          style={styles.containerPrueba}
        >
          <View style={styles.botonPrueba}>
            <Text style={styles.textoPrueba}>{analisisInn.text}</Text>
          </View>
          <View style={styles.viewLogo}>
            <FontAwesome5 name="eye" size={24} style={styles.icon}/>
          </View>
        </Pressable>
        </>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.containerText}>
          <Text>Pruebas</Text>
        </View>
      <FlatList 
        data={analisisArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
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
    color: "#0073c6",
    fontSize: 35,
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
