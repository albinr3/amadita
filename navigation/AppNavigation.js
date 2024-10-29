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
import { StatusBar } from "react-native";

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

import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import Solicitud from "../screens/Solicitud";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator para pantallas adicionales
const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Pruebas" component={Pruebas} />
    <Stack.Screen
      name="LocationsMap"
      component={LocationsMap}
      options={{ headerTitle: "Sucursales" }}
    />
    <Stack.Screen name="Analisis" component={Analisis} />
    <Stack.Screen
      name="Results"
      component={Results}
      options={{ headerTitle: "Resultados" }}
    />
    <Stack.Screen
      name="PdfViewer"
      component={PdfViewer}
      options={{ headerTitle: "Visor de Análisis" }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{ headerTitle: "Editar Perfil" }}
    />

    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ title: "Perfil", headerShown: true }}
    />

    <Stack.Screen
      name="Facturar"
      component={Facturar}
      options={{ title: "Facturas", headerShown: true }}
    />

<Stack.Screen
      name="Solicitud"
      component={Solicitud}
      options={{ title: "Solicitud", headerShown: true }}
    />
    <Stack.Screen name="Test" component={Test} />
  </Stack.Navigator>
);

// Drawer Navigator principal
const AppNavigation = () => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (userData) => {
      if (userData) {
        const usersCollection = collection(FIREBASE_DB, "users");
        const q = query(
          usersCollection,
          where("dataUser.email", "==", userData.email)
        );

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

  if (loading) {
    return <></>;
  }
  const CustomDrawerContent = (props) => {
    const functionSignOut = () => {
      signOut(FIREBASE_AUTH)
        .then(() => {
          // Sign-out successful.
          console.log("Sign out successful");
          //props.navigation.jumpTo("Login");
          setUser(null);
          props.navigation.closeDrawer();
        })
        .catch((error) => {
          // An error happened.
          console.error("Sign-out error:", error);
        });
    };

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Cerrar sesión"
          onPress={functionSignOut} // Ejecuta el cierre de sesión al presionar
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black" translucent={true} />

      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />} // Drawer personalizado
        screenOptions={{
          drawerStyle: {
            marginTop: StatusBar.currentHeight, // Margen superior igual a la altura del StatusBar
            paddingTop: 10, // Espacio adicional si deseas separarlo más
          },
          headerShown: false,
        }}
        initialRouteName={user ? "MainStack" : "Login"}
      >
        {/* Si el usuario está autenticado, mostrar el stack con Drawer */}
        {user ? (
          <>
            <Drawer.Screen
              name="MainStack"
              component={MainStack}
              options={{ title: "Inicio" }}
            />
          </>
        ) : (
          // Si el usuario no está autenticado, mostrar Login y Registro
          <>
            <Drawer.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="RegistrationScreen"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
