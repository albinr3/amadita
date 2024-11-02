import React, { useState, useContext, useEffect} from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";
import { UserContext } from '../navigation/UserContext'; // Importa el contexto

const PdfViewer2 = ({route}) => {

const [pdfURL, setPdfURL] = useState("https://firebasestorage.googleapis.com/v0/b/amadita2-5cc54.appspot.com/o/0259121153030394_2.pdf?alt=media&token=5633d573-fce6-45dd-9d46-4fb5b904ae78")



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

export default PdfViewer2;
