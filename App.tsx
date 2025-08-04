import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from "./widgets/Home/index";
import Profile from './widgets/Profile';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        // screenOptions={({ route }) => ({
        //   tabBarIcon: ({ color, size }) => {
        //     let iconName: string;

        //     if (route.name === 'Home') {
        //       iconName = 'home';
        //     } else if (route.name === 'Profile') {
        //       iconName = 'user';
        //     }

        //     return <FontAwesome5 name={iconName!} size={size} color={color} solid />;
        //   },
        //   tabBarActiveTintColor: 'green',
        //   tabBarInactiveTintColor: 'gray',
        // })}
        // screenLayout={}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ size, color }) => {
            let icon

            if (route.name === "Home") {
              icon = "home"
            } else if (route.name === "Profile") {
              icon = "user"
            }

            return <FontAwesome5 name={icon} size={size} color={color} solid />
          },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ title: 'Welcome' }} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
