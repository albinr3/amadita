import { StyleSheet, View, Text, Pressable } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

export default function Home({navigation}) {
  SplashScreen.preventAutoHideAsync();

  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_500Medium
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.configIconRow}>
          <Feather name="settings" style={styles.configIcon}></Feather>
          <Image
            source={require("../assets/images/amadita.png")}
            contentFit="contain"
            style={styles.logo}
          ></Image>
          <Feather
            name="bell"
            style={styles.notificationIcon}
          ></Feather>
        </View>
      </View>
      <View style={styles.rect2}>
        <View style={styles.viewSaludo}>
          <View style={styles.holaSofiaStack}>
            <Text style={styles.holaSofia}>Hola Sofia</Text>
            <Text style={styles.text}>En que te podemos ayudar?</Text>
          </View>
        </View>
        <View style={styles.viewBotones}>
          <Pressable style={styles.buttonSucursales}>
          <FontAwesome
              name="map-marker"
              style={styles.iconMap}
            ></FontAwesome>
            <Text style={styles.sucursales}>Sucursales</Text>
            
          </Pressable>
          <Pressable 
          style={styles.buttonResultados}
          onPress={()=>navigation.navigate("Results")}
          >
            
            <FontAwesome
              name="newspaper-o"
              style={styles.icon2}
            ></FontAwesome>
            <Text style={styles.resultados}>Resultados</Text>
          </Pressable>
          <Pressable style={styles.buttonPrueba}>
            
            <FontAwesome
              name="bug"
              style={styles.iconPrueba}
            ></FontAwesome>
            <Text style={styles.pruebas}>Pruebas</Text>
          </Pressable>
          <Pressable style={styles.buttonFacturar}>
            
            <FontAwesome
              name="money"
              style={styles.icon3}
            ></FontAwesome>
            <Text style={styles.facturar}>Facturar</Text>
          </Pressable>
          <Pressable style={styles.buttonPerfil}>
            
            <FontAwesome name="user" style={styles.icon4}></FontAwesome>
            <Text style={styles.perfil}>Perfil</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(253,252,252,1)",
  },
  header: {
    height: 80,
    backgroundColor: "rgba(253,252,252,1)",
    flexDirection: "row",
    marginTop: 39
  },
  configIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 32,
    marginTop: 50
  },
  logo: {
    width: 140,
    height: 140,
    marginLeft: 69
  },
  notificationIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 32,
    marginLeft: 62,
    marginTop: 50
  },
  configIconRow: {
    height: 140,
    flexDirection: "row",
    flex: 1,
    marginRight: 24,
    marginLeft: 16,
    marginTop: -31
  },
  rect2: {
    width: 375,
    height: 692,
    marginTop: 1
  },
  viewSaludo: {
    height: 100,
    marginTop: 71
  },
  holaSofia: {
    position: "absolute",
    fontFamily: "Roboto_400Regular",
    color: "#121212",
    textAlign: "center",
    fontSize: 24,
    top: 0,
    left: 0,
    right: 0
  },
  text: {
    position: "absolute",
    fontFamily: "Roboto_700Bold",
    color: "#121212",
    textAlign: "center",
    fontSize: 22,
    left: 0,
    top: 28,
    right: 0
  },
  holaSofiaStack: {
    height: 54,
    marginTop: 22
  },
  viewBotones: {
    height: 519,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginTop: 3
  },
  buttonSucursales: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(72,95,253,1)",
    borderRadius: 81,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  sucursales: {
    fontFamily: "Roboto_500Medium",
    color: "rgba(251,248,248,1)",
    fontSize: 20,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 0
    },
  iconMap: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    
  },
  buttonResultados: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(253,72,122,1)",
    borderRadius: 81,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  resultados: {
    fontFamily: "Roboto_500Medium",
    color: "rgba(251,248,248,1)",
    fontSize: 20,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 0
  },
  icon2: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    
  },
  buttonPrueba: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(189,16,224,1)",
    borderRadius: 81,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  pruebas: {
    fontFamily: "Roboto_500Medium",
    color: "rgba(251,248,248,1)",
    fontSize: 20,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 0
  },
  iconPrueba: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    
  },
  buttonFacturar: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(72,194,253,1)",
    borderRadius: 81,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  facturar: {
    fontFamily: "Roboto_500Medium",
    color: "rgba(251,248,248,1)",
    fontSize: 20,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 0
  },
  icon3: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
   
  },
  buttonPerfil: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(253,159,72,1)",
    borderRadius: 81,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  perfil: {
    fontFamily: "Roboto_500Medium",
    color: "rgba(251,248,248,1)",
    fontSize: 20,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 0
  },
  icon4: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
   
  }
});

