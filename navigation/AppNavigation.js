import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { UserContext } from './UserContext'; // Importa el contexto


import Home from "../screens/Home";
import Results from "../screens/Results";
import PdfViewer from "../screens/PdfViewer";
import Analisis from "../screens/Analisis";
import Login from "../screens/Login";
import Test from "../screens/Test";
import RegistrationScreen from "../screens/RegistrationScreen";
import LocationsMap from "../screens/LocationsMap";
import Pruebas from "../screens/Pruebas";

import { collection, getDocs, query, where } from "firebase/firestore"; 
import { FIREBASE_DB } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  // State variables to manage loading and user information
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext); // Acceder al usuario desde el contexto

  // Effect hook to handle user authentication state changes
  useEffect(() => {
    // Subscribe to authentication state changes using Firebase Auth
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (userData) => {
      if (userData) {
        
        const usersCollection = collection(FIREBASE_DB, "users");
        const q = query(usersCollection, where("dataUser.email", "==", userData.email)); 

        try {
          // Ejecuta la consulta
          const querySnapshot = await getDocs(q);
          
          // Revisa si se encontraron documentos
          if (querySnapshot.empty) {
              console.log("No se encontró ningún usuario con ese email.");
              return null;
          }
  
          // Si se encontró, puedes acceder a los datos
          querySnapshot.forEach((doc) => {
              console.log(`from navigation: `, doc.data().dataUser);
              setUser(doc.data().dataUser); // Almacena el usuario si es necesario
          });

          
        } catch (error) {
          console.error("Error al obtener el usuario: ", error);
        }
      } else {
        // If no user data, log that no one is logged in
        console.log("No one is logged in");
      }

      // Set loading to false once authentication state is determined
      setLoading(false);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures that useEffect runs once on mount

  // If still loading, return an empty fragment
  if (loading) {
    return <></>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "Home" : "Login"}
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Pruebas" component={Pruebas}/>
        <Stack.Screen name="LocationsMap" component={LocationsMap}/>
        <Stack.Screen name="Analisis" component={Analisis} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="PdfViewer" component={PdfViewer} />
        
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
