import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import Ionicons from "@expo/vector-icons/Ionicons";

const CameraScreen = () => {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  // useEffect qui, lors de la montée du component sur le dom (render), va checker la permission d'accès à l'appareil photo
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (!hasPermission) {
    return (
      <Text style={styles.alertText}>
        No access and authorization to camera
      </Text>
    );
  }

  // Fonction qui va switch entre la prise de photo par l'optique avant et arrière
  function toggleCameraType() {
    setCameraType(
      cameraType === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    const pictureMetadata = await cameraRef.current.takePictureAsync(); // Acceder à la reference de la caméra pour prendre une photo
    const imageManipulator = await ImageManipulator.manipulateAsync(
      pictureMetadata.uri, // le chemin de l'image à redimensionner
      [{ resize: { width: 800 } }] // tableau d'objets représentant les options de manipulation : plusieurs actions
    );
  }

  return (
    <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
      <View style={styles.cameracontainer}>
        <TouchableOpacity
          style={styles.reverseCamerabutton}
          onPress={toggleCameraType}
          activeOpacity={0.5}
        >
          <Ionicons name="camera-reverse-sharp" size={50} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.1}
          style={styles.takePicturesButtons}
          onPress={takePicture}
        >
          <Ionicons name="radio-button-off-outline" size={100} color="white" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  cameracontainer: {
    display: "flex",
    alignItems: "center",
  },
  reverseCamerabutton: {
    position: "absolute",
    right: 10,
    padding: 10,
  },
  takePicturesButtons: {
    position: "absolute",
    top: 620,
  },
  alertText: {
    textAlign: "center",
  },
});
