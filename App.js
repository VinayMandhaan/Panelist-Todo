import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from "expo-font";
import Routes from './src/routes';
import store from './src/store';
import Toast from 'react-native-toast-message';
import { loadUser } from './src/actions/auth';
import { Provider } from 'react-redux';
import Splash from './src/screens/splash';
import * as Notifications from 'expo-notifications';



export default function App() {
  const [displaySplash, setDisplaySplash] = useState(true)

  async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('You need to enable notifications in your device settings to receive reminders.');
    return;
  }
}

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  useEffect(() => {
    renderSplash()
    registerForPushNotificationsAsync()
  }, [])

  const renderSplash = () => {
    setTimeout(() => {
      setDisplaySplash(false)
    }, 2000);
  }

  if (displaySplash) {
    return (
      <Splash />
    )
  }


  return (
    <Provider store={store}>
      <Routes />
      <Toast />
    </Provider>
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
