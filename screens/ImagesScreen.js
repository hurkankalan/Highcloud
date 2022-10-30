import React, { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

const ImagesScreen = () => {
  const [imagesURI, setImagesURI] = useState([]);

  useEffect(() => {
    (async () => {
      const images = await FileSystem.readDirectoryAsync(
        FileSystem.cacheDirectory + "ImageManipulator"
      );
      setImagesURI(images);
    })();
  }, []);

  return imagesURI.length > 0 ? (
    <FlatList
      data={imagesURI}
      keyExtractor={(imageURI) => imageURI}
      renderItem={(itemData) => {
        return (
          <Image
            style={styles.images}
            source={{
              uri: `${FileSystem.cacheDirectory}ImageManipulator/${itemData.item}`,
            }}
          />
        );
      }}
    />
  ) : (
    <View style={styles.emptyFolder}>
      <Text>Aucun fichier à afficher dans la galerie.</Text>
    </View>
  );
};

export default ImagesScreen;

const styles = StyleSheet.create({
  images: {
    resizeMode: "cover",
    height: 500,
  },
  emptyFolder: {
    flex: 1,
    displat: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
