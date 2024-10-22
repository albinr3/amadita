import { FIREBASE_STORAGE } from "../firebaseConfig";
import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { ref, getDownloadURL } from 'firebase/storage';


export default function Test() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      const storageRef = ref(FIREBASE_STORAGE, '/0259121153030394-2024-10-20T23-07-06.867Z.pdf');  // Nombre y ruta del archivo
      try {
        const url = await getDownloadURL(storageRef);
        setImageUrl(url);  // Guarda la URL en el estado
      } catch (error) {
        console.log('Error al obtener la URL de la imagen:', error);
      }
    };

    fetchImageUrl();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 200, height: 200 }}
        />
      ) : (
        <Text>Cargando imagen...</Text>
      )}
    </View>
  );
}
