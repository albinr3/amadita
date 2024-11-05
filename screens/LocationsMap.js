import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Linking, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Location from 'expo-location';


const LocationsMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);

  const locations = [
    {
      id: 1,
      title: 'Moca',
      description: 'Laboratorio Clinico Garcia & Garcia',
      latitude: 19.386947080938835,
      longitude: -70.53089745733665, 
      telefono: "809-578-1310",
      direccion: "Plaza Sunrise, Pdte. Antonio Guzman Fernandez, Moca",
      horarios: "Lunes-viernes: 7:00AM-4:00PM \n Sabados: 7:00AM - 12:00PM"
    },
    {
      id: 2,
      title: 'Villa Progreso',
      description: 'Laboratorio Clinico Garcia & Garcia',
      latitude: 19.477597557811823,  
      longitude: -70.68070845307344,
      telefono: "809-578-1310",
      direccion: "Plaza Sunrise, Pdte. Antonio Guzman Fernandez, Moca",
      horarios: "Lunes-viernes: 7:00AM-4:00PM \n Sabados: 7:00AM - 12:00PM"
    },
    {
      id: 3,
      title: 'Estrella Sadhala',
      description: 'Laboratorio Clinico Garcia & Garcia',
      latitude: 19.438104391542396, 
      longitude: -70.69032149004076,
      telefono: "809-578-1310",
      direccion: "Plaza Sunrise, Pdte. Antonio Guzman Fernandez, Moca",
      horarios: "Lunes-viernes: 7:00AM-4:00PM \n Sabados: 7:00AM - 12:00PM"
    },
  ];

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermissionGranted(true);
      } else {
        Alert.alert('Permiso denegado', 'Se requiere permiso de ubicación para mostrar el mapa.');
      }
    };
    
    requestLocationPermission();
  }, []);

  const handleMarkerPress = (location) => {
    setSelectedLocation(location);
  };

  const handlePhonePress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      {locationPermissionGranted ? (
        <MapView
        provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 19.386947080938835,
            longitude: -70.53089745733665, 
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              onPress={() => handleMarkerPress(location)}
            />
          ))}
        </MapView>
      ) : (
        <Text style={styles.permissionText}>Esperando permiso de ubicación...</Text>
      )}

      {selectedLocation && (
        <View style={styles.infoWindow}>
          <Text style={styles.title}>{selectedLocation.title}</Text>
          <Text style={styles.description}>{selectedLocation.description}</Text>
          
          <View style={styles.row}>
            <Icon name="location-on" size={24} color="#ff6347" />
            <Text style={styles.text}>{selectedLocation.direccion}</Text>
          </View>

          {selectedLocation.telefono && (
            <View style={styles.row}>
              <Icon name="phone" size={24} color="#00bfff" />
              <Pressable onPress={() => handlePhonePress(selectedLocation.telefono)}>
                <Text style={styles.phoneText}>{selectedLocation.telefono}</Text>
              </Pressable>
            </View>
          )}

          {selectedLocation.horarios && (
            <View style={styles.row}>
              <Icon name="schedule" size={24} color="#4caf50" />
              <Text style={styles.text}>{selectedLocation.horarios}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '80%',
  },
  permissionText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  infoWindow: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: '#555',
  },
  phoneText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#007aff',
    textDecorationLine: 'underline',
  },
});

export default LocationsMap;
