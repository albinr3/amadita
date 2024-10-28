import {
  TextInput,
  View,
  Dimensions,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import React, { useState, useContext } from "react";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import CalendarPicker from "react-native-calendar-picker";
import { UserContext } from "../navigation/UserContext";
const { width, height } = Dimensions.get("window");

const EditProfile = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useContext(UserContext); // Acceder al usuario desde el contexto

  const onDateChange = (date) => {
    setSelectedStartDate(date);
    setModalVisible(false); // Cerrar el modal al seleccionar la fecha
  };

  const startDate = selectedStartDate ? selectedStartDate.toString() : "";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
  // Extraer día, mes y año
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  
  // Crear un array con los nombres de los meses
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  
  // Obtener el nombre del mes
  const month = monthNames[date.getMonth()];
  
  return `${day} de ${month} del año ${year}`;
  };

  console.log("edit    ", user)

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.viewNombres}>
        <TextInput placeholder="Nombre" style={styles.input} value={user ? user.Nombre : ""}/>
        <TextInput placeholder="Primer Apellido" style={styles.input} value={user ? user.Apellido : ""}/>
        <TextInput placeholder="Segundo Apellido" style={styles.input} />
      </View>

      {/* Modal para seleccionar fecha */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CalendarPicker
              onDateChange={onDateChange}
              width={width * 0.9}
              scrollable={true}
              initialView={"years"}
            />

            <Pressable title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <View style={styles.viewGenero}>
        <Pressable
          style={[
            styles.buttonMale,
            selectedGender === "male" && styles.buttonSelected,
          ]}
          onPress={() => setSelectedGender("male")}
        >
          <FontAwesomeIcon name="male" style={styles.iconMale} />
          <FontAwesomeIcon name="circle-o" style={styles.iconUnCheck} />

          {selectedGender === "male" && (
            <FontAwesomeIcon name="check-circle" style={styles.iconCheck} />
          )}
        </Pressable>

        <Pressable
          style={[
            styles.buttonFemale,
            selectedGender === "female" && styles.buttonSelected,
          ]}
          onPress={() => setSelectedGender("female")}
        >
          <FontAwesomeIcon name="female" style={styles.iconFemale} />
          <FontAwesomeIcon name="circle-o" style={styles.iconUnCheck} />

          {selectedGender === "female" && (
            <FontAwesomeIcon name="check-circle" style={styles.iconCheck} />
          )}
        </Pressable>
      </View>

      <View style={styles.viewOtrosDatos}>
        <TextInput
          onPress={() => setModalVisible(true)}
          placeholder="Fecha de Nacimiento Ej: 10/12/1999"
          style={styles.input}
          value={startDate ? formatDate(startDate) : ""}
        />

        <TextInput placeholder="Cedula" style={styles.input} />
        <TextInput placeholder="Telefono" style={styles.input} />
        <TextInput placeholder="Provincia" style={styles.input} />
        <TextInput placeholder="Ciudad" style={styles.input} />
        <TextInput placeholder="Direccion" style={styles.input} />
        <TextInput placeholder="Correo Electronico" style={styles.input} />
      </View>

      <Pressable style={styles.buttonGuardar}>
        <Text style={styles.textoButton}>ACTUALIZAR PERFIL</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  viewNombres: {
    marginBottom: height * 0.025,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: height * 0.011,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.015,
    borderRadius: width * 0.02,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: height * 0.001 },
    shadowOpacity: 0.1,
    shadowRadius: width * 0.01,
    elevation: 1,
    fontSize: width < 380 ? 14 : 16,
  },
  viewGenero: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.025,
  },
  buttonMale: {
    flex: 1,
    alignItems: "center",
    paddingVertical: height * 0.016,
    borderRadius: width * 0.02,
    marginHorizontal: width * 0.012,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#e0f7fa",
  },
  buttonFemale: {
    flex: 1,
    alignItems: "center",
    paddingVertical: height * 0.016,
    borderRadius: width * 0.02,
    marginHorizontal: width * 0.012,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#fce4ec",
  },
  iconFemale: {
    color: "#d81b60",
    fontSize: width < 380 ? 50 : 60,
  },
  iconMale: {
    color: "#00796b",
    fontSize: width < 380 ? 50 : 60,
  },
  buttonSelected: {
    borderColor: "rgba(0, 122, 255,1)",
  },
  iconCheck: {
    color: "rgba(0, 122, 255,1)",
    fontSize: width * 0.055,
    position: "absolute",
    top: height * 0.01,
    right: width * 0.02,
  },
  iconUnCheck: {
    color: "gray",
    fontSize: width * 0.055,
    position: "absolute",
    top: height * 0.01,
    right: width * 0.02,
  },
  viewOtrosDatos: {
    marginBottom: height * 0.025,
  },
  buttonGuardar: {
    backgroundColor: "rgba(255,0,70,1)",
    paddingVertical: height * 0.02,
    borderRadius: width * 0.02,
    alignItems: "center",
    shadowColor: "rgba(255,0,70,1)",
    shadowOffset: { width: 0, height: height * 0.002 },
    shadowOpacity: 0.2,
    shadowRadius: width * 0.02,
    elevation: 3,
    marginBottom: height * 0.03,
    width: "100%",
  },
  textoButton: {
    color: "#fff",
    fontSize: width < 380 ? 14 : 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default EditProfile;
