import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox, Dimensions } from 'react-native';
import SigninScreen from "../screens/auth/login";


const Stack = createStackNavigator();


const Routes = () => {
    const navigationRef = useNavigationContainerRef()

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SigninScreen" component={SigninScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default Routes


