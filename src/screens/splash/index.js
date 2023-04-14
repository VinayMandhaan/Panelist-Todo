import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from "expo-font";
import Routes from './src/routes';
import store from './src/store';
import Toast from 'react-native-toast-message';
import { loadUser } from './src/actions/auth';
import { Provider } from 'react-redux';


const Splash = () => {
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
      },[])

      return (
        <View>
            <Text>Loading</Text>
        </View>
      )
}

export default Splash
