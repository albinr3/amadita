import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { StatusBar, Image, StyleSheet, Dimensions } from "react-native";

import Home from "../screens/Home";
import Results from "../screens/Results";
import PdfViewer from "../screens/PdfViewer";
import Analisis from "../screens/Analisis";
import Login from "../screens/Login";
import Test from "../screens/Test";
import RegistrationScreen from "../screens/RegistrationScreen";
import LocationsMap from "../screens/LocationsMap";
import Pruebas from "../screens/Pruebas";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
import { Facturar } from "../screens/Facturar";
import Solicitud from "../screens/Solicitud";
import BannerCarousel from "../screens/BannerCarousel"
import PdfViewer2 from "../screens/PdfViewer2";
import BlogList from "../screens/BlogList";

import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signOut } from "firebase/auth";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const { width, height } = Dimensions.get('window');

// Stack Navigator para pantallas adicionales
const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="Pruebas" component={Pruebas} />
    <Stack.Screen name="LocationsMap" component={LocationsMap} options={{ headerTitle: "Sucursales" }} />
    <Stack.Screen name="Analisis" component={Analisis} />
    <Stack.Screen name="Results" component={Results} options={{ headerTitle: "Resultados" }} />
    <Stack.Screen name="PdfViewer" component={PdfViewer} options={{ headerTitle: "Visor de Análisis" }} />
    <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerTitle: "Editar Perfil", headerShadowVisible: false, headerTitleStyle: {
              color: '#0169b3', // Cambia el color del título
              fontSize: 18 // Puedes agregar otras propiedades, como tamaño de fuente
            }, }} />
    <Stack.Screen name="Profile" component={Profile} options={{ headerTitle: "Perfil", headerShadowVisible: false, headerTitleStyle: {
              color: '#0169b3', // Cambia el color del título
              fontSize: 18 // Puedes agregar otras propiedades, como tamaño de fuente
            }, }} />
    <Stack.Screen name="Facturar" component={Facturar} options={{ title: "Facturas", headerShown: true }} />
    <Stack.Screen name="Solicitud" component={Solicitud} options={{ title: "Solicitud", headerShown: true }} />
    <Stack.Screen name="Test" component={Test} />
    <Stack.Screen name="BannerCarousel" component={BannerCarousel} /> 
    <Stack.Screen name="PdfViewer2" component={PdfViewer2} options={{ headerTitle: "Visor de Análisis" }} />
    <Stack.Screen name="BlogList" component={BlogList} options={{ headerTitle: "Lista de articulos" }} />
  </Stack.Navigator>
);

// Drawer Navigator principal
const AppNavigation = () => {
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => setShowSplash(false), 2000); // Ajusta el tiempo de splash según sea necesario

    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (userData) => {
      if (userData) {
        const usersCollection = collection(FIREBASE_DB, "users");
        const q = query(usersCollection, where("dataUser.email", "==", userData.email));
        
        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => setUser(doc.data().dataUser));
          } else {
            console.log("No se encontró ningún usuario con ese email.");
          }
        } catch (error) {
          console.error("Error al obtener el usuario: ", error);
        }
      } else {
        console.log("No one is logged in");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading || showSplash) {
    return (
      <Image
        style={styles.splashImage}
        source={require('../assets/splash.gif')}
        resizeMode="cover"
      />
    );
  }

  const CustomDrawerContent = (props) => {
    const functionSignOut = () => {
      signOut(FIREBASE_AUTH)
        .then(() => {
          console.log("Sign out successful");
          setUser(null);
          props.navigation.closeDrawer();
        })
        .catch((error) => console.error("Sign-out error:", error));
    };

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Cerrar sesión" onPress={functionSignOut} />
      </DrawerContentScrollView>
    );
  };

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black" translucent={true} />

      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            marginTop: StatusBar.currentHeight,
            paddingTop: 10,
          },
          drawerPosition: "right",
          headerShown: false,
        }}
        initialRouteName={user ? "MainStack" : "Login"}
        
      >
        {user ? (
          <Drawer.Screen name="MainStack" component={MainStack} options={{ title: "Inicio" }} />
        ) : (
          <>
            <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Drawer.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  splashImage: {
    ...StyleSheet.absoluteFillObject,

    width: width,
    height: height,
  },
});

export default AppNavigation;
