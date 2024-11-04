import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SkeletonLoading from "expo-skeleton-loading";
import { FIREBASE_DB } from "../firebaseConfig";
import { collection, } from "firebase/firestore";
import { getDocs, query, } from "firebase/firestore";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Pruebas = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTests, setFilteredTests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pruebas, setPruebas] = useState([]);

  // Función para obtener las pruebas del laboratorio
  const fetchPruebas = async () => {
    const pruebasCollection = collection(FIREBASE_DB, "pruebas");
    const q = query(pruebasCollection);

    try {
      // Ejecuta la consulta
      const querySnapshot = await getDocs(q);

      // Revisa si se encontraron documentos
      if (querySnapshot.empty) {
        console.log("No se encontró ningún análisis con ese usuario.");
        return;
      }

      const nuevasPruebas = [];
      querySnapshot.forEach((doc) => {
        nuevasPruebas.push(doc.data());
      });

      setPruebas(nuevasPruebas);
    } catch (error) {
      console.error("Error al obtener los análisis: ", error);
    } finally {
      setLoading(false); // Asegúrate de que el estado de loading se actualice al final
    }
  };

  // useEffect para obtener las pruebas cuando el componente se monta
  useEffect(() => {
    fetchPruebas();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = pruebas.filter((test) =>
        test.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTests(filtered);
    } else {
      setFilteredTests(pruebas);
    }
  };

  const renderTestItem = ({ item }) => (
    <Pressable style={styles.testItem}>
      <MaterialCommunityIcons name="test-tube" 
      style={item.tipo === "orina" ? styles.iconOrina : item.tipo === "coprologico" ? styles.iconCoprologico : styles.iconHemograma} />
      <Text style={styles.testItemText}>{item.nombre}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Escribe el nombre de la prueba"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {loading ? (
        <SkeletonLoading background="#d3d3d3" highlight="#f5f5f5">
          <View style={styles.skeletonContainer}>
            {[...Array(13)].map((_, index) => (
              <View key={index} style={styles.skeletonItem}>
                <View style={styles.skeletonIcon} />
                <View style={styles.skeletonTextContainer}>
                  <View style={styles.skeletonTextLine} />
                  <View style={styles.skeletonTextLineShort} />
                </View>
              </View>
            ))}
          </View>
        </SkeletonLoading>
      ) : (
        <FlatList
          data={searchQuery ? filteredTests : pruebas}
          renderItem={renderTestItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  skeletonContainer: {
    marginBottom: 20,
  },
  skeletonItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  skeletonIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#d3d3d3", // Color más claro
    borderRadius: 20,
    marginRight: 10,
  },
  skeletonTextContainer: {
    flex: 1,
  },
  skeletonTextLine: {
    height: 10,
    backgroundColor: "#d3d3d3", // Color más claro
    borderRadius: 5,
    marginBottom: 5,
  },
  skeletonTextLineShort: {
    height: 8,
    backgroundColor: "#d3d3d3", // Color más claro
    borderRadius: 5,
    width: "50%",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  testItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
    flexDirection: "row"
  },
  testItemText: {
    fontSize: 16,
    color: "black",
    
    flexShrink: 1
  },
  iconOrina: {
    color: "#fdfb6b",
    fontSize: 25,
    alignSelf: "center",
  },
  iconCoprologico: {
    color: "#c65c00",
    fontSize: 25,
    alignSelf: "center",
  },
  iconHemograma: {
    color: "#ff1919",
    fontSize: 25,
    alignSelf: "center",
  },
});

export default Pruebas;
