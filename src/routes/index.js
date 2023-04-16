import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox, Dimensions } from 'react-native'; import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SigninScreen from "../screens/auth/login";
import Task from '../screens/task';
import Project from '../screens/project';
import Users from '../screens/users';
import SignupScreen from '../screens/auth/register';
import { useSelector } from 'react-redux';
import Shared from '../screens/shared';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Task" component={Task} options={{ headerShown: false }} />
            <Tab.Screen name="Project" component={Project} options={{ headerShown: false }} />
            <Tab.Screen name="User" component={Users} options={{ headerShown: false }} />
            <Tab.Screen name='Shared' component={Shared} options={{headerShown:false}} />
        </Tab.Navigator>
    );
}


const Routes = () => {
    let userToken = useSelector(state => state.auth.isAuthenticated);
    const navigationRef = useNavigationContainerRef()

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    !userToken ? (
                        <>
                            <Stack.Screen name="SigninScreen" component={SigninScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
                        </>
                    ) : (
                        <Stack.Screen name="HomeScreen" component={MyTabs} options={{ headerShown: false }} />
                    )
                }

            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default Routes


