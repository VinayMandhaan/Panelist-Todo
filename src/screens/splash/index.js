import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as Font from "expo-font";


const Splash = () => {
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        OpenSans_Regular: require("../../../assets/fonts/OpenSans-Regular.ttf"),
        OpenSans_Medium: require("../../../assets/fonts/OpenSans-Medium.ttf"),
        OpenSans_SemiBold: require("../../../assets/fonts/OpenSans-SemiBold.ttf"),
        OpenSans_Bold: require("../../../assets/fonts/OpenSans-Bold.ttf"),
        OpenSans_ExtraBold: require("../../../assets/fonts/OpenSans-ExtraBold.ttf"),
      });
    }
    loadFont();
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color={'black'} size={24} />
    </View>
  )
}

export default Splash
