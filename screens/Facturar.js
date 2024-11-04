import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export const Facturar = ({ navigation }) => {
  const [facturas, setFacturas] = useState([
    {
      id: "516490",
      title: "Factura  lista",
      analisis: "COPROLOGICO, GLUCOSA, PCR",
      motivo: "",
      fine: true,
    },
    {
      id: "516493",
      title: "Factura  declinada",
      analisis: "COPROLOGICO, GLUCOSA, PCR",
      motivo: "Indicacion medica borrosa",
      fine: false,
    },
    {
      id: "51649790",
      title: "Factura  lista",
      analisis: "COPROLOGICO, GLUCOSA, PCR",
      motivo: "",
      fine: true,
    },
    {
      id: "51621493",
      title: "Factura  declinada",
      analisis: "COPROLOGICO, GLUCOSA, PCR",
      motivo: "Indicacion medica borrosa",
      fine: false,
    },
    {
      id: "51446490",
      title: "Factura  lista",
      analisis: "COPROLOGICO, GLUCOSA, PCR",
      motivo: "",
      fine: true,
    },
    {
      id: "5164493",
      title: "Factura  declinada",
      analisis: "COPROLOGICO, GLUCOSA, PCR",
      motivo: "Indicacion medica borrosa",
      fine: false,
    },
    {
      id: "5164390",
      title: "Factura  lista",
      analisis: "COPROLOGICO, GLUCOSA, PCR",
      motivo: "",
      fine: true,
    },
    {
      id: "5164922",
      title: "Factura  declinada",
      analisis: "COPROLOGICO, GLUCOSA, PCR",
      motivo: "Indicacion medica borrosa",
      fine: false,
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);

  const renderItem = ({ item: facturaInn }) => {
    return (
      <View style={styles.container}>
        <View style={styles.viewLogo}>
          <View style={styles.viewCirclelogo}>
            {facturaInn.fine ? (
              <AntDesign name="check" style={styles.icon}></AntDesign>
            ) : (
              <Feather name="x" style={styles.icon}></Feather>
            )}
          </View>
        </View>
        <View style={styles.viewTexts}>
          <Text style={styles.tipoFactura}>{facturaInn.title}</Text>
          {facturaInn.fine ? (
            <Text style={styles.textAnalisis}>{facturaInn.analisis}</Text>
          ) : (
            <Text style={styles.textAnalisis}>Motivo: {facturaInn.motivo}</Text>
          )}

          <Text style={styles.textId}>ID: {facturaInn.id}</Text>
        </View>
        {facturaInn.fine ? (
          <View style={styles.viewOjo}>
            <Pressable
              style={styles.buttonVerFactura}
              onPress={() => navigation.navigate("PdfViewer2")}
            >
              <AntDesign name="eyeo" size={36} color="#0073c6" />
            </Pressable>
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  };

  const PopupView = () => (
    <View style={styles.containerPopup}>
      <Pressable style={styles.overlay} onPress={() => setShowPopup(false)} />
      <View style={styles.whiteBackground}>
        <Pressable
          style={styles.buttonConSeguro}
          onPress={() => navigation.navigate("Solicitud")}
        >
          <Text style={styles.textButtonPopup}>FACTURAR CON SEGURO</Text>
        </Pressable>
        <Pressable style={styles.buttonSinSeguro}>
          <Text style={styles.textButtonPopup2}>FACTURAR SIN SEGURO</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.screen}>
        {facturas && facturas.length > 0 ? (
          <FlatList
            data={facturas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: height * 0.055 }} // Ajusta el valor según el tamaño del botón
          />
        ) : (
          <View style={styles.viewNohay}>
            <Text style={styles.textNohay}>No hay facturas disponibles</Text>
          </View>
        )}
      </View>
      <Pressable style={styles.buttonNew} onPress={() => setShowPopup(true)}>
        <Text style={styles.textButton}>CREAR SOLICITUD</Text>
      </Pressable>

      {showPopup && <PopupView />}
    </>
  );
};

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
    height: 130,
    backgroundColor: "white",
  },
  viewLogo: {
    width: 67,
    alignSelf: "flex-start",
    alignItems: "center",
    height: 54,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 6,
  },
  viewCirclelogo: {
    width: 53,
    height: 53,
    backgroundColor: "#ecf4fd",
    borderRadius: 100,
    justifyContent: "center",
  },
  icon: {
    color: "#0073c6",
    fontSize: 28,
    alignSelf: "center",
  },
  viewTexts: {
    alignSelf: "stretch",

    justifyContent: "space-evenly",
    alignItems: "flex-start",
    marginBottom: 10,
    marginTop: 10,

  },
  tipoFactura: {
    fontFamily: "Roboto_700Bold",
    color: "#121212ba",
    fontSize: 16,
  },
  textId: {
    fontFamily: "Roboto_400Regular",
    color: "#a09f9f",
    fontSize: 10,
  },
  textAnalisis: {
    fontFamily: "Roboto_400Regular",
    color: "#676767e0",
    fontSize: 14,
  },

  buttonVerFactura: {

    paddingHorizontal: 4,
    alignSelf: "center",
  },

  textVerFactura: {
    fontFamily: "Roboto_700Bold",
    color: "#ffffff",
    fontSize: 13,
    textAlign: "center",
    alignSelf: "center",
  },
  ViewButtons: {
    flexDirection: "row",
  },
  buttonNew: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: "85%",
    height: 40,
    backgroundColor: "#0073c6",
    borderStyle: "solid",
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  textButton: {
    fontFamily: "Roboto_700Bold",
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
  },
  viewNohay: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  textNohay: {
    fontSize: 20,
  },
  containerPopup: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
  },
  whiteBackground: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  buttonConSeguro: {
    width: "85%",
    height: 40,
    backgroundColor: "#0073c6",
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonSinSeguro: {
    width: "85%",
    height: 40,
    backgroundColor: "#ffffff",
    borderColor: "#0073c6",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
  },
  textButtonPopup: {
    fontFamily: "Roboto_700Bold",
    color: "#ffffff",
    fontSize: 13,
    textAlign: "center",
  },
  textButtonPopup2: {
    fontFamily: "Roboto_700Bold",
    color: "#706f6f",
    fontSize: 13,
    textAlign: "center",
  },
  viewOjo: {
    flex: 1,
    justifyContent: "center",
  },
});
