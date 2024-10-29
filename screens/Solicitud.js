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
import DropDownPicker from "react-native-dropdown-picker";
const { width, height } = Dimensions.get("window");
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";

function Solicitud() {
  const [hasImage, setHasImage] = useState(false);
  const [hasImage2, setHasImage2] = useState(false);
  const [hasImage3, setHasImage3] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Fiebre", value: "fiebre" },
    { label: "Nauseas", value: "nauseas" },
  ]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewAbajo}>
        <View style={styles.viewCedula}>
          <Text style={styles.fotoDeCedula}>Indicacion medica: </Text>
          <Pressable
            style={styles.buttonFotoCedula}
            onPress={() => setHasImage(true)}
          >
            {hasImage ? (
              <Image
                source={require("../assets/images/receta.jpg")}
                resizeMode="cover"
                style={styles.image2}
              />
            ) : (
              <EntypoIcon name="circle-with-plus" style={styles.icon3} />
            )}
          </Pressable>
        </View>

        <View style={styles.viewCedula}>
          <Text style={styles.fotoDeCedula}>Foto de cedula: </Text>
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

        <View style={styles.viewSeguro}>
          <Text style={styles.textFotoseguro}>Diagnostico previo:</Text>

          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Seleccione motivo"
            listMode="SCROLLVIEW"
            
          />
        </View>

        <Pressable
          style={styles.buttonCerrarSesion}
          onPress={() => functionSignOut()}
        >
          <Text style={styles.cerrarSesion}>ENVIAR SOLICITUD</Text>
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
  image2: {
    height: "100%",
    width: "100%",
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
    backgroundColor: "#ff005d",
    justifyContent: "center",
    marginTop: height * 0.02,
  },
  cerrarSesion: {
    fontFamily: "Roboto_500Medium",
    color: "#ffffff",
    fontSize: width * 0.04,
    textAlign: "center",
  },
});

export default Solicitud;
