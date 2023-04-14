import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from "expo-font";


export default function App() {

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        OpenSans_Regular: require("./assets/fonts/OpenSans-Regular.ttf"),
        OpenSans_Medium: require("./assets/fonts/OpenSans-Medium.ttf"),
        OpenSans_SemiBold: require("./assets/fonts/OpenSans-SemiBold.ttf"),
        OpenSans_Bold: require("./assets/fonts/OpenSans-Bold.ttf"),
        OpenSans_ExtraBold: require("./assets/fonts/OpenSans-ExtraBold.ttf"),
      });
    }
    loadFont();
  })

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
