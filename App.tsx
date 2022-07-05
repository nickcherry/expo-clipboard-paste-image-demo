import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';

export default function App() {
  const [imageUri, setImageUri] = useState<string>();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button
        title="Does clipboard have an image?"
        onPress={async () => {
          const hasImage = await Clipboard.hasImageAsync();

          if (hasImage) {
            Alert.alert('Image found!');
            const clipboardImage = await Clipboard.getImageAsync({
              format: 'png',
            });

            if (clipboardImage) {
              setImageUri(clipboardImage.data);
            }
          } else {
            Alert.alert('No image found :(');
            setImageUri(undefined);
          }
        }}
      />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    aspectRatio: 1,
    marginTop: 20,
    width: 200,
  },
});
