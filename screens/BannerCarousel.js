import React, { useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Dots from 'react-native-dots-pagination';


const { width } = Dimensions.get('window');
const aspectRatio = 16 / 9; // Para mantener el formato 16:9

// Importa las imágenes locales
const banners = [
  { id: '1', image: require('../assets/images/ban1.jpg') },
  { id: '2', image: require('../assets/images/ban2.jpg') },
  { id: '3', image: require('../assets/images/ban3.jpg') },
];

const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        width={width}
        height={width / aspectRatio}
        data={banners}
        autoPlay
        autoPlayInterval={3000} // Cambia cada 3 segundos
        loop
        onSnapToItem={(index) => setCurrentIndex(index)} // Actualiza el índice al deslizar
        renderItem={({ item }) => (
          <View style={styles.bannerContainer}>
            <Image source={item.image} style={styles.bannerImage} />
          </View>
        )}
      />

      {/* Puntos de paginación */}
      <View style={styles.paginationContainer}>
         <Dots
          length={banners.length}
          active={currentIndex}
          activeColor="#007AFF" // Color del punto activo
          passiveColor="#CCCCCC" // Color de los puntos inactivos
        /> 
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
   flex:1,
   
  },
  bannerContainer: {
    width: width,
    height: width / aspectRatio,
    borderWidth: 1
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paginationContainer: {
    // Ajusta este valor para colocar los puntos más arriba o más abajo
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:10,
 
    
    // Asegúrate de que estén centrados horizontalmente
  },
});

export default BannerCarousel;

