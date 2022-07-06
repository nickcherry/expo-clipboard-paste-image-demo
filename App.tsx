import { StatusBar } from 'expo-status-bar';
import { AppState, StyleSheet, Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useState, useEffect, useCallback } from 'react';

interface ClipboardState {
  hasString: boolean;
  string: string | null;
  hasUrl: boolean;
  url: string | null;
  hasImage: boolean;
  imageUri: string | null;
}

const formatValue = (value: string | boolean) => {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  return value || '–';
};

export default function App() {
  const [clipboardState, setClipboardState] = useState<ClipboardState>();

  const updateClipboardState = useCallback(async () => {
    const hasString = await Clipboard.hasStringAsync();
    const string = await Clipboard.getStringAsync();

    const hasUrl = await Clipboard.hasUrlAsync();
    const url = await Clipboard.getUrlAsync();

    const hasImage = await Clipboard.hasImageAsync();
    const imageResult = await Clipboard.getImageAsync({ format: 'jpeg' });

    setClipboardState({
      hasString,
      string,
      hasUrl,
      url,
      hasImage,
      imageUri: imageResult ? imageResult.data : null,
    });
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (status) => {
      if (status === 'active') {
        updateClipboardState();
      }
    });

    updateClipboardState();

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {Object.entries(clipboardState || {}).map(([key, value]) => (
        <View style={styles.dataRow}>
          <Text style={styles.dataRowLabel}>{key}</Text>
          <Text style={styles.dataRowValue} numberOfLines={1}>
            {formatValue(value)}
          </Text>
        </View>
      ))}
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
  dataRow: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  dataRowLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dataRowValue: {
    textAlign: 'center',
  },
});
