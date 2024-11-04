import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import { UserContext } from "../navigation/UserContext"; // Importa el contexto
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Feather from '@expo/vector-icons/Feather';
const { width, height } = Dimensions.get("window");

const PdfViewer = ({ route }) => {
  const { analisis } = useContext(UserContext); // Acceder a los análisis desde el contexto
  const analisisId = route.params.analisisId;
  const idInterno = route.params.idInterno;
  const [pdfURL, setPdfURL] = useState("");

  const [loading, setLoading] = useState(false); // Estado de carga

  useEffect(() => {
    // Buscar el objeto de análisis que coincida con el analisisId
    const details = analisis.find((doc) => doc.analisisId === analisisId);

    if (details) {
      // Buscar el análisis que tenga el mismo idInterno
      const foundPdfURL = Object.values(details.text).find(
        (item) => item.id === idInterno
      )?.pdfURL; //Con ?.pdfURL accedemos al pdfURL del análisis que coincida, o undefined si no se encuentra.
      setPdfURL(foundPdfURL);
    }
  }, [analisisId, idInterno, analisis]);

  const [error, setError] = useState(null);

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "error") {
        console.error("Error en WebView:", data.message);
        setError(`${data.message}\n${data.stack}`);
      }
    } catch (error) {
      console.error("Error al parsear el mensaje:", error);
    }
  };

  const googleDocsViewer = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    pdfURL
  )}`;

  //para descargar el archivo
  const downloadFile = async () => {
    setLoading(true); // Activar el estado de carga

    try {
      const fileUri = `${FileSystem.documentDirectory}resultados.pdf`;
      const downloadResumable = FileSystem.createDownloadResumable(
        pdfURL, // URL del archivo que quieres descargar
        fileUri
      );

      const { uri } = await downloadResumable.downloadAsync();

      // Verifica si el dispositivo soporta la función de compartir
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert(
          "Error",
          "La funcionalidad de compartir no está disponible en este dispositivo"
        );
        setLoading(false); // Desactivar el estado de carga

        return;
      }

      // Abre la ventana de compartir con el archivo descargado
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo descargar el archivo");
    } finally {
      setLoading(false); // Asegura que se desactiva el estado de carga al finalizar
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#0073c6"
            style={styles.indicator}
          />
        </View>
      ) : (
        <>
          <WebView
            source={{ uri: googleDocsViewer }}
            originWhitelist={["*"]}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.error("WebView error:", nativeEvent);
              setError(nativeEvent.description);
            }}
            onMessage={handleMessage}
          />
          <Pressable
            style={styles.buttonDescargar}
            onPress={() => downloadFile()}
          >
            <Feather name="download" size={24} color="#ffffff" />
            <Text style={styles.textoButton}>COMPARTIR</Text>
          </Pressable>
        </>
      )}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: "red",
    padding: 10,
  },

  buttonDescargar: {
    backgroundColor: "#0073c6",
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.02,
    borderRadius: width * 0.02,
    alignItems: "center",
    shadowColor: "#0073c6",
    shadowOffset: { width: 0, height: height * 0.002 },
    shadowOpacity: 0.2,
    shadowRadius: width * 0.02,
    elevation: 3,
    marginBottom: height * 0.03,
    width: width * 0.30,
    position: "absolute",
    top: 5,
    right: 8,
    flexDirection: "row"
  },
  textoButton: {
    color: "#fff",
    fontSize: width * 0.03,
    fontWeight: "600",
    marginLeft: 4
  },
  
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Fondo semitransparente
  },
  indicator: {
    transform: [{ scale: 1.5 }], // Aumenta el tamaño del indicador
  },
  
});

export default PdfViewer;
