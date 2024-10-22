import React, { useState} from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";

const PdfViewer = () => {
  const [pdfUrl, setPdfUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/amadita-114a6.appspot.com/o/0259121153030394-2024-10-20T23-07-06.867Z.pdf?alt=media&token=83288130-479b-4018-9877-5cdd776154ca"
  );
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
    pdfUrl
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
