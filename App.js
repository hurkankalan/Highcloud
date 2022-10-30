import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import CameraScreen from "./screens/CameraScreen";
import ImagesScreen from "./screens/ImagesScreen";
import FeedScreen from "./screens/FeedScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Camera") {
              iconName = focused ? "camera" : "camera-outline";
            } else if (route.name === "Images") {
              iconName = focused ? "image" : "image-outline";
            } else if (route.name === "Feed") {
              iconName = focused ? "share-social" : "share-social-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Camera"
          component={CameraScreen}
          options={{ unmountOnBlur: true }} // Pour que les composants se démontent lorsqu'on change de tab on utilise unmountOnBlur: true
        />
        <Tab.Screen
          name="Images"
          component={ImagesScreen}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{ unmountOnBlur: true }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
