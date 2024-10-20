import { StyleSheet, View, Text, Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function Analisis({ navigation }) {
  return (
    <View style={styles.screen}>
      <View style={styles.containerText}>
        <Text>Pruebas</Text>
      </View>
      <View style={styles.containerPrueba}>
        <Pressable
          onPress={() => navigation.navigate("PdfViewer")}
          style={styles.botonPrueba}
        >
          <Text style={styles.textoPrueba}>
            COPROLOGICO, HEMOGRAMA, SGOT
          </Text>
        </Pressable>
        <View style={styles.viewLogo}>
          <Icon name="arrow-right-circle-outline" style={styles.icon}></Icon>
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
