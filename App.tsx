import { Provider } from "react-redux";
import { store } from "./redux/store";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from "./screens/Home/index";
import Profile from './screens/Profile';
import Login from './screens/Login/Login';
import SignUp from "./screens/SignUp/SignUp";
import History from "./screens/Transaction";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tab Navigator for Home & Profile
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color }) => {
          let icon;

          if (route.name === "Home") {
            icon = "home";
          } else if (route.name === "Profile") {
            icon = "user";
          } else if (route.name === "History") {
            icon = "history";
          } return <FontAwesome5 name={icon} size={size} color={color} solid />;
        },
        tabBarActiveTintColor: "#61E838",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          margin: 10,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 5,
          borderRadius: 25,
          backgroundColor: "#FFFFFFCC",
          height: 50,
        },
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (

    <Provider store={store}>

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="MainTabs" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>

    </Provider>

  );
}
