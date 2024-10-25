import React, { useState, useContext} from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";
import { UserContext } from '../navigation/UserContext'; // Importa el contexto

const PdfViewer = ({route}) => {
  const { analisis } = useContext(UserContext); // Acceder a los analisis desde el contexto
  const analisisId = route.params.analisisId

  const details = analisis.filter(doc => doc.analisisId === analisisId)[0];

  // Convertir el objeto `text` a un array de valores

  console.log("desde pdfviewer ", analisis)
  console.log("desde pdfviewer2 ", details)
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
    details.pdfURL
  )}`;
  return (
    <View style={styles.container}>
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
});

export default PdfViewer;
