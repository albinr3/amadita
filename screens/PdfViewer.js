import React, { useState, useRef } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const PdfViewer = () => {
  const [pdfUrl, setPdfUrl] = useState('https://tmpfiles.org/14594865/0259121153030394-2024-10-20t23-07-06.867z.pdf');
  const [error, setError] = useState(null);
  const webViewRef = useRef(null);

  const loadAnotherPdf = () => {
    setPdfUrl('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf');
    setError(null);
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      <title>PDF Viewer</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.min.js"></script>
      <style>
        body { 
          margin: 0; 
          padding: 0; 
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          overflow: hidden;
        }
        #canvasContainer { 
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          height: 100vh;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
        }
        #zoomContainer {
          position: relative;
          transform-origin: 0 0;
        }
        canvas { 
          display: block;
          margin-bottom: 20px;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
      </style>
    </head>
    <body>
      <div id="canvasContainer">
        <div id="zoomContainer"></div>
      </div>
      <script>
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';
        
        let currentScale = 1;
        let startDist = 0;
        let isPinching = false;
        const ZOOM_SPEED = 0.005;
        const MIN_SCALE = 0.5;
        const MAX_SCALE = 3;
        const RENDER_SCALE = 2; // Factor de escala para mejorar la calidad de renderizado

        const loadPdf = async () => {
          try {
            console.log('Iniciando carga del PDF:', '${pdfUrl}');
            const loadingTask = pdfjsLib.getDocument('${pdfUrl}');
            const pdf = await loadingTask.promise;
            console.log('PDF cargado, número de páginas:', pdf.numPages);

            const zoomContainer = document.getElementById('zoomContainer');
            const canvasContainer = document.getElementById('canvasContainer');
            
            // Obtener las dimensiones del primer página
            const firstPage = await pdf.getPage(1);
            const viewport = firstPage.getViewport({ scale: 1 });

            // Calcular la escala inicial para ajustar el ancho de la página al contenedor
            const containerWidth = canvasContainer.clientWidth;
            const initialScale = (containerWidth / viewport.width) * 1; // Ligero ajuste para dejar un margen
            currentScale = initialScale;

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
              const page = await pdf.getPage(pageNum);
              console.log('Página ' + pageNum + ' cargada');
              
              const scaledViewport = page.getViewport({ scale: initialScale * RENDER_SCALE });

              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');

              canvas.height = scaledViewport.height;
              canvas.width = scaledViewport.width;
              canvas.style.width = (scaledViewport.width / RENDER_SCALE) + 'px';
              canvas.style.height = (scaledViewport.height / RENDER_SCALE) + 'px';

              const renderContext = {
                canvasContext: context,
                viewport: scaledViewport
              };
              
              await page.render(renderContext);
              console.log('Página ' + pageNum + ' renderizada');
              
              zoomContainer.appendChild(canvas);
            }

            applyZoom();
            setupZoom();
          } catch (error) {
            console.error('Error al cargar el PDF:', error);
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', message: error.message, stack: error.stack }));
          }
        };

        const setupZoom = () => {
          const container = document.getElementById('canvasContainer');
          
          container.addEventListener('touchstart', handleTouchStart, { passive: false });
          container.addEventListener('touchmove', handleTouchMove, { passive: false });
          container.addEventListener('touchend', handleTouchEnd, { passive: false });
          container.addEventListener('wheel', handleWheel, { passive: false });
        };

        const handleTouchStart = (e) => {
          if (e.touches.length === 2) {
            e.preventDefault();
            startDist = getDistance(e.touches[0], e.touches[1]);
            isPinching = true;
          }
        };

        const handleTouchMove = (e) => {
          if (isPinching && e.touches.length === 2) {
            e.preventDefault();
            const currentDist = getDistance(e.touches[0], e.touches[1]);
            const delta = currentDist - startDist;
            zoom(delta * ZOOM_SPEED);
            startDist = currentDist;
          }
        };

        const handleTouchEnd = (e) => {
          isPinching = false;
        };

        const handleWheel = (e) => {
          e.preventDefault();
          zoom(e.deltaY * -0.01);
        };

        const getDistance = (touch1, touch2) => {
          return Math.hypot(touch1.pageX - touch2.pageX, touch1.pageY - touch2.pageY);
        };

        const zoom = (delta) => {
          currentScale = Math.min(Math.max(currentScale + delta, MIN_SCALE), MAX_SCALE);
          applyZoom();
        };

        const applyZoom = () => {
          const zoomContainer = document.getElementById('zoomContainer');
          zoomContainer.style.transform = 'scale(' + (currentScale / RENDER_SCALE) + ')';
        };
        
        loadPdf();
      </script>
    </body>
    </html>
  `;

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'error') {
        console.error('Error en WebView:', data.message);
        setError(`${data.message}\n${data.stack}`);
      }
    } catch (error) {
      console.error('Error al parsear el mensaje:', error);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={false}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error:', nativeEvent);
          setError(nativeEvent.description);
        }}
        onMessage={handleMessage}
      />
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      <Button title="Cargar otro PDF" onPress={loadAnotherPdf} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    padding: 10,
  },
});

export default PdfViewer;