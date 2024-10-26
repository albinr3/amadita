import React, { useState, useEffect } from "react"; 
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SkeletonLoading from 'expo-skeleton-loading'
import { FIREBASE_DB } from "../firebaseConfig";
import { collection, setDoc,  doc, addDoc } from "firebase/firestore";
import { getDocs, query, where } from "firebase/firestore";

const Pruebas = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTests, setFilteredTests] = useState([]);
  const [loading, setLoading] = useState(true);

const [pruebas, setPruebas] = useState([]);

 // Función para obtener los análisis del usuario
//  const fetchPruebas = async () => {
//   const pruebasCollection = collection(FIREBASE_DB, "pruebas");
//   const q = query(
//     pruebasCollection  );

//   try {
//     // Ejecuta la consulta
//     const querySnapshot = await getDocs(q);

//     // Revisa si se encontraron documentos
//     if (querySnapshot.empty) {
//       console.log("No se encontró ningún análisis con ese usuario.");
//       return;
//     }

//     const nuevasPruebas = [];
//     querySnapshot.forEach((doc) => {
//       nuevasPruebas.push(doc.data());
//     });
// console.log(nuevasPruebas)
//     setPruebas(nuevasPruebas); // Reemplaza el estado de analisis en lugar de concatenarlo
//   } catch (error) {
//     console.error("Error al obtener los análisis: ", error);
//   } finally {
//     setLoading(false); // Asegúrate de que el estado de loading se actualice al final
//   }
// };


// // useEffect para obtener los análisis cuando el componente se monta
// useEffect(() => {

//   // Si el usuario está presente en el contexto, busca sus análisis
//   fetchPruebas();

// }, []); // Se ejecuta cuando 'user' cambie

  const labTests = [
    { id: "1", name: "Hemograma completo" },
    { id: "2", name: "Glucosa en sangre" },
    { id: "3", name: "Prueba de colesterol total" },
    { id: "4", name: "Triglicéridos" },
    { id: "5", name: "Prueba de función hepática" },
    { id: "6", name: "Nitrógeno ureico en sangre (BUN)" },
    { id: "7", name: "Creatinina sérica" },
    { id: "8", name: "Ácido úrico" },
    { id: "9", name: "Electrolitos en sangre (sodio, potasio)" },
    { id: "10", name: "Hormona Tiroestimulante (TSH)" },
    { id: "11", name: "Prueba de función renal" },
    { id: "12", name: "Proteína C reactiva (PCR)" },
    { id: "13", name: "Velocidad de sedimentación globular (VSG)" },
    { id: "14", name: "Antígeno prostático específico (PSA)" },
    { id: "15", name: "Prueba de embarazo (hCG)" },
    { id: "16", name: "Prueba de hepatitis B" },
    { id: "17", name: "Prueba de hepatitis C" },
    { id: "18", name: "Prueba de VIH" },
    { id: "19", name: "Perfil lipídico completo" },
    { id: "20", name: "Hemoglobina A1c" },
    { id: "21", name: "Prueba de coagulación" },
    { id: "22", name: "Gammagrafía" },
    { id: "23", name: "Test de alérgenos" },
    { id: "24", name: "Vitamina D" },
    { id: "25", name: "Hierro en sangre" },
    { id: "26", name: "Test de intolerancia a la lactosa" },
    { id: "27", name: "Prueba de función pulmonar" },
    { id: "28", name: "Células madre en sangre" },
    { id: "29", name: "Orina completa" },
    { id: "30", name: "Prueba de cultivo de garganta" },
    { id: "31", name: "Perfil tiroideo completo" },
    { id: "32", name: "Examen de esputo" },
    { id: "33", name: "Prueba de función cardíaca" },
    { id: "34", name: "Prueba de anticuerpos COVID-19" },
    { id: "35", name: "Examen de heces" },
  ];

  

  const subirData = async (list) => {
    list.forEach(async (test) => {
      try {
        await setDoc(doc(FIREBASE_DB, "pruebas", test.id), {
          id: test.id,
          nombre: test.name
        });
        console.log(`Documento agregado: ${test.name}`);
      } catch (error) {
        console.error("Error al agregar documento:", error);
      }
    });
  };

  // const subirData = async (list) => {
  //   list.forEach(async (test) => {
  //     try {
  //       await setDoc(doc(FIREBASE_DB, "pruebas", test.id), {
  //         id: test.id,
  //         name: test.name
  //       });
  //       console.log(`Documento agregado: ${test.name}`);
  //     } catch (error) {
  //       console.error("Error al agregar documento:", error);
  //     }
  //   });
  // };

  // Simulamos un delay para el skeleton loader
  useEffect(() => {
    setTimeout(() => {
      setFilteredTests(labTests);
      setLoading(false);
    }, 2000); // Simula el tiempo de carga
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = pruebas.filter((test) =>
        test.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTests(filtered);
    } else {
      setFilteredTests(pruebas);
    }
  };

  const renderTestItem = ({ item }) => (
    <TouchableOpacity style={styles.testItem}>
      <Text style={styles.testItemText}>{item.name}</Text>
      
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={()=>subirData(labTests)}><Text>Click aqui</Text></Pressable>
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
  },
  testItemText: {
    fontSize: 16,
    color: "black",
  },
});

export default Pruebas;
