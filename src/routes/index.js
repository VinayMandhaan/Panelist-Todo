import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox, Dimensions } from 'react-native'; import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SigninScreen from "../screens/auth/login";
import Task from '../screens/task';
import Project from '../screens/project';
import Users from '../screens/users';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Task" component={Task} options={{ headerShown: false }} />
            <Tab.Screen name="Project" component={Project} options={{ headerShown: false }} />
            <Tab.Screen name="User" component={Users} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}


const Routes = () => {
    const navigationRef = useNavigationContainerRef()

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SigninScreen" component={SigninScreen} options={{ headerShown: false }} />
                <Stack.Screen name="HomeScreen" component={MyTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default Routes

