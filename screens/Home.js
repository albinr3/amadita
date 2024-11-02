import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { UserContext } from "../navigation/UserContext"; // Importa el contexto
import Carousel from "react-native-reanimated-carousel";
import Dots from "react-native-dots-pagination";

//banner
const { width, height } = Dimensions.get("window");
const aspectRatio = 16 / 9; // Para mantener el formato 16:9

export default function Home({ navigation }) {
  const { user, setUser } = useContext(UserContext); // Acceder al usuario desde el contexto
  SplashScreen.preventAutoHideAsync();

  // Importa las imágenes del banner
  const banners = [
    { id: "1", image: require("../assets/images/ban1.jpg") },
    { id: "2", image: require("../assets/images/ban2.jpg") },
    { id: "3", image: require("../assets/images/ban3.jpg") },
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
          autoPlayInterval={4000} // Cambia cada 4 segundos
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

  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_500Medium,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  //setUser(props.user.dataUser)
  //props.route?.params?.user || props.user.dataUser
  //si viene de Registration utilizara la primera y si viene de AppNavigation(de estar logueado) usara la segunda
  console.log("desde home: ", user);

  const functionSignOut = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        // Sign-out successful.
        console.log("Sign out successful");
        //navigation.navigate("Login");
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
        console.error("Sign-out error:", error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.configIconRow}>
        <Image
          source={require("../assets/images/logo.png")}
          contentFit="cover"
          style={styles.logo}
        ></Image>
        <Pressable onPress={() => navigation.toggleDrawer()}>
          <Feather name="settings" style={styles.configIcon}></Feather>
        </Pressable>

        {/* <Feather name="bell" style={styles.notificationIcon}></Feather> */}
      </View>
      {/* fin header */}

      <View style={styles.rect2}>
        <BannerCarousel />
        {/* <View style={styles.viewSaludo}>
          <View style={styles.holaSofiaStack}>
            <Text style={styles.holaSofia}>Hola {user.Nombre}</Text>
            <Text style={styles.text}>En que te podemos ayudar?</Text>
          </View>
        </View> */}
        <View style={styles.viewBotones}>
          
          <Pressable
            style={styles.buttonResultados}
            onPress={() => navigation.navigate("Results")}
          >
            <FontAwesome name="newspaper-o" style={styles.icon2}></FontAwesome>
            <Text style={[styles.textButton, {fontSize: 22}]}>Resultados</Text>
          </Pressable>
          <Pressable
            style={styles.buttonFacturar}
            onPress={() => navigation.navigate("Facturar")}
          >
            <FontAwesome name="money" style={styles.icon3}></FontAwesome>
            <Text style={[styles.textButton, {fontSize: 22}]}>Facturar</Text>
          </Pressable>
          <Pressable
            style={styles.buttonPrueba}
            onPress={() => navigation.navigate("Pruebas")}
          >
            <FontAwesome name="bug" style={styles.iconPrueba}></FontAwesome>
            <Text style={styles.textButton}>Pruebas</Text>
          </Pressable>
          
          <Pressable
            style={styles.buttonPerfil}
            onPress={() => navigation.navigate("Profile")}
          >
            <FontAwesome name="user" style={styles.icon4}></FontAwesome>
            <Text style={styles.textButton}>Perfil</Text>
          </Pressable>
          <Pressable
            style={styles.buttonSucursales}
            onPress={() => navigation.navigate("BannerCarousel")}
          >
            <FontAwesome name="map-marker" style={styles.iconMap}></FontAwesome>
            <Text style={styles.textButton}>Sucursales</Text>
          </Pressable>
          <Pressable
            style={styles.buttonPerfil}
            onPress={() => navigation.navigate("Profile")}
          >
            <MaterialCommunityIcons
              name="image-album"
              style={styles.icon4}
            ></MaterialCommunityIcons>
            <Text style={styles.textButton}>Blog</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// Declara el estilo base 'button' fuera de StyleSheet.create
const button = {
  width: "1%",
  height: 105,
  borderRadius: 10,
  marginBottom: 5,
  alignItems: "center",
  justifyContent: "center",
  flexBasis: "40%"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(253,252,252,1)",
  },
  configIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
  },
  logo: {
    width: 80,
    height: 80,
  },
  notificationIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 32,
    marginLeft: 62,
    marginTop: 50,
  },
  configIconRow: {
    marginTop: 28,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white"
  },
  rect2: {
    width: "100%",
    marginTop: 1,
  },
  viewSaludo: {
    height: height * 0.14,
    marginTop: 71,
  },
  holaSofia: {
    position: "absolute",
    fontFamily: "Roboto_400Regular",
    color: "#121212",
    textAlign: "center",
    fontSize: 24,
    top: 0,
    left: 0,
    right: 0,
  },
  text: {
    position: "absolute",
    fontFamily: "Roboto_700Bold",
    color: "#121212",
    textAlign: "center",
    fontSize: 22,
    left: 0,
    top: 28,
    right: 0,
  },
  holaSofiaStack: {
    height: 54,
    marginTop: 22,
  },
  viewBotones: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginTop: 20,
    paddingHorizontal:5
  },

  buttonSucursales: {
    ...button,
    backgroundColor: "#DB5B3A",
    
  },

  textButton: {
    fontFamily: "Roboto_500Medium",
    color: "rgba(251,248,248,1)",
    fontSize: 18,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 0,
  },

  iconMap: {
    color: "rgba(255,255,255,1)",
    fontSize: 38,
  },
  buttonResultados: {
    ...button,
    backgroundColor: "#0073c6",
    width: 140,
    height: 140,
    flexBasis: "47%"
  },

  icon2: {
    color: "rgba(255,255,255,1)",
    fontSize: 48,
  },
  buttonPrueba: {
    ...button,
    backgroundColor: "#DB5B3A",
  },

  iconPrueba: {
    color: "rgba(255,255,255,1)",
    fontSize: 38,
  },
  buttonFacturar: {
    ...button,
    backgroundColor: "#0073c6",
    width: 140,
    height: 140,
    flexBasis: "47%"
  },
  icon3: {
    color: "rgba(255,255,255,1)",
    fontSize: 48,
  },
  buttonPerfil: {
    ...button,
    backgroundColor: "#DB5B3A",
  },

  icon4: {
    color: "rgba(255,255,255,1)",
    fontSize: 38,
  },

  carouselContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: width / aspectRatio,
  },
  bannerContainer: {
    width: width,
    height: width / aspectRatio,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    contentFit: "cover",
  },
  paginationContainer: {
    // Ajusta este valor para colocar los puntos más arriba o más abajo
    width: "100%",
  },
});
