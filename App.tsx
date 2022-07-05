import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="Does clipboard have an image?"
        onPress={async () => {
          const hasImage = await Clipboard.hasImageAsync();
          Alert.alert(hasImage ? 'Image found!' : 'No image found :(');
        }}
      />
      <StatusBar style="auto" />
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
});
