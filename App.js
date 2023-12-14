import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import AllGroupsScreen from "./screens/AllGroupsScreen";
import SettingsScreen from "./screens/SetttingsScreen";
import ManageGroupScreen from "./screens/ManageGroupScreen";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import IconButton from "./components/ui/IconButton";
import GroupsContextProvider from "./store/groups-context";
import GroupScreen from "./screens/GroupScreen";
import { View } from "react-native";

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedBottomTab() {
  const authCtx = useContext(AuthContext);
  return (
    <BottomTabs.Navigator
      sceneContainerStyle={{ backgroundColor: Colors.primary100 }}
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: Colors.primary500 },
        tabBarActiveTintColor: Colors.primary100,
        tabBarShowLabel: false,
      }}
    >
      <BottomTabs.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Groups"
        component={AllGroupsScreen}
        options={({ navigation }) => ({
          headerRight: ({ tintColor }) => (
            <IconButton
              icon={"add-circle-outline"}
              color={tintColor}
              size={24}
              onPress={() => {
                navigation.navigate("ManageGroupScreen");
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-circle-outline" size={size} color={color} />
          ),
        })}
      />
      <BottomTabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon={"exit"}
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Teste"
        component={AuthenticatedBottomTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageGroupScreen"
        component={ManageGroupScreen}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="GroupScreen"
        component={GroupScreen}
        options={({ route, navigation }) => ({
          presentation: "modal",
          headerRight: ({ tintColor }) => (
            <View style={{ flexDirection: "row" }}>
              <IconButton
                icon={"create-outline"}
                color={tintColor}
                size={24}
                onPress={() => {
                  navigation.navigate("ManageGroupScreen", {
                    editedGroupId: route.params?.groupId,
                  });
                }}
              />
              <IconButton
                icon={"person-add-outline"}
                color={tintColor}
                size={24}
              />
              <IconButton
                icon={"add-circle-outline"}
                color={tintColor}
                size={24}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [appIsReady, setAppIsReady] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      SplashScreen.preventAutoHideAsync();
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }

    fetchToken();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return <Navigation onLayout={onLayoutRootView} />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <GroupsContextProvider>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </GroupsContextProvider>
    </>
  );
}
