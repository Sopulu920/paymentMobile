import { Provider } from "react-redux";
import { store } from "./redux/store";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from "./screens/Home/index";
import Profile from './screens/Profile';
import Login from './screens/Login/Login';
import SignUp from "./screens/SignUp/SignUp"

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tab Navigator for Home & Profile
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color }) => {
          let icon = route.name === "Home" ? "home" : "user";
          return <FontAwesome5 name={icon} size={size} color={color} solid />;
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={Home} />
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
