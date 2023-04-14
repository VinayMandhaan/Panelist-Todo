import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from "expo-font";
import Routes from './src/routes';
import store from './src/store';
import Toast from 'react-native-toast-message';
import { loadUser } from './src/actions/auth';
import { Provider } from 'react-redux';
import Splash from './src/screens/splash';


export default function App() {
  const [displaySplash, setDisplaySplash] = useState(true)

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  useEffect(() => {
    renderSplash()
  }, [])

  const renderSplash = () => {
    setTimeout(() => {
      setDisplaySplash(false)
    }, 4000);
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
