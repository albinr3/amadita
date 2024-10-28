import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { UserContext } from "../navigation/UserContext"; // Importa el contexto
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signOut } from "firebase/auth";


const { width, height } = Dimensions.get("window");

function Profile({ navigation }) {
  const [hasImage, setHasImage] = useState(false);
  const [hasImage2, setHasImage2] = useState(false);
  const [hasImage3, setHasImage3] = useState(false);
  const { user } = useContext(UserContext); // Acceder al usuario desde el contexto


  const functionSignOut = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        // Sign-out successful.
        console.log("Sign out successful");
        navigation.navigate("Login");
      })
      .catch((error) => {
        // An error happened.
        console.error("Sign-out error:", error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewArriba}>
        <View style={styles.viewImagen}>
          <Pressable style={styles.imagen} onPress={() => setHasImage(true)}>
            <View style={styles.icon2Stack}>
              {hasImage ? (
                <Image
                  source={require("../assets/images/IMG_2958.jpg")}
                  resizeMode="cover"
                  style={styles.image2}
                />
              ) : (
                <SimpleLineIconsIcon name="user-follow" style={styles.icon2} />
              )}
            </View>
          </Pressable>
        </View>
        <Text style={styles.textName}>{user.Nombre} {user.Apellido}</Text>
        <Pressable style={styles.buttonCambiar}>
          <Text style={styles.loremIpsum}>CAMBIAR PERFIL DE PACIENTE</Text>
        </Pressable>
        <Pressable
          style={styles.buttonEdit}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.text2}>EDITAR MIS DATOS PERSONALES</Text>
        </Pressable>
      </View>
      <View style={styles.viewAbajo}>
        <View style={styles.viewCedula}>
          <Text style={styles.fotoDeCedula}>Foto de cedula:</Text>
          <Pressable
            style={styles.buttonFotoCedula}
            onPress={() => setHasImage2(true)}
          >
            {hasImage2 ? (
              <Image
                source={require("../assets/images/cedula.jpg")}
                resizeMode="cover"
                style={styles.image2}
              />
            ) : (
              <EntypoIcon name="circle-with-plus" style={styles.icon3} />
            )}
          </Pressable>
        </View>
        <View style={styles.viewSeguro}>
          <Text style={styles.textFotoseguro}>Foto de Seguro Medico:</Text>
          <Pressable
            style={styles.buttonFotoSeguro}
            onPress={() => setHasImage3(true)}
          >
            {hasImage3 ? (
              <Image
                source={require("../assets/images/seguro.jpg")}
                resizeMode="cover"
                style={styles.image2}
              />
            ) : (
              <EntypoIcon name="circle-with-plus" style={styles.icon4} />
            )}
          </Pressable>
        </View>
        <Pressable style={styles.buttonCerrarSesion}
        onPress={() => functionSignOut()}
        >

          <Text style={styles.cerrarSesion}>CERRAR SESION</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  viewArriba: {
    width: "100%",
    padding: width * 0.05,
    borderBottomWidth: 1,
    borderColor: "rgba(229,228,228,1)",
    justifyContent: "space-around",
    alignItems: "center",
  },
  viewImagen: {
    height: height * 0.25,
    alignSelf: "center",
  },
  imagen: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.5) / 2,
    overflow: "hidden",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(217,217,217,1)",
  },
  image2: {
    height: "100%",
    width: "100%",
  },
  icon2: {
    fontSize: width * 0.28,
    color: "rgba(128,128,128,1)",
    alignSelf: "center",
    marginTop: height * 0.02,
    opacity: 100,
  },
  textName: {
    fontFamily: "Roboto_500Medium",
    color: "#121212",
    fontSize: width * 0.06,
    textAlign: "center",
  },
  buttonCambiar: {
    height: height * 0.05,
    width: "95%",
    backgroundColor: "rgba(255,0,70,1)",
    borderRadius: 10,
    justifyContent: "center",
    marginVertical: height * 0.02,
  },
  loremIpsum: {
    fontFamily: "Roboto_500Medium",
    color: "rgba(253,250,250,1)",
    fontSize: width * 0.042,
    textAlign: "center",
  },
  buttonEdit: {
    height: height * 0.05,
    width: "95%",
    backgroundColor: "rgba(255,254,254,1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(200,199,199,1)",
    justifyContent: "center",
  },
  text2: {
    fontFamily: "Roboto_500Medium",
    color: "rgba(249,10,77,1)",
    fontSize: width * 0.042,
    textAlign: "center",
  },
  viewAbajo: {
    padding: width * 0.05,
    backgroundColor: "white",
  },
  viewCedula: {
    marginBottom: height * 0.02,
  },
  fotoDeCedula: {
    fontFamily: "Roboto_400Regular",
    color: "#121212",
    fontSize: width * 0.048,
    marginBottom: height * 0.01,
  },
  buttonFotoCedula: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.2,
    borderWidth: 1,
    borderColor: "rgba(229,228,228,1)",
    borderRadius: 5,
  },
  icon3: {
    color: "rgba(128,128,128,1)",
    fontSize: width * 0.1,
  },
  viewSeguro: {
    marginBottom: height * 0.02,
  },
  textFotoseguro: {
    fontFamily: "Roboto_400Regular",
    color: "#121212",
    fontSize: width * 0.048,
    marginBottom: height * 0.01,
  },
  buttonFotoSeguro: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.2,
    borderWidth: 1,
    borderColor: "rgba(229,228,228,1)",
    borderRadius: 5,
  },
  icon4: {
    color: "rgba(128,128,128,1)",
    fontSize: width * 0.1,
  },
  buttonCerrarSesion: {
    height: height * 0.055,
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(229,228,228,1)",
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: "center",
    marginTop: height * 0.02,
  },
  cerrarSesion: {
    fontFamily: "Roboto_500Medium",
    color: "rgba(255,0,45,1)",
    fontSize: width * 0.04,
    textAlign: "center",
  },
});

export default Profile;
