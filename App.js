import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import StartScreen from "./screens/StartScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import AllGroupsScreen from "./screens/AllGroupsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ManageGroupScreen from "./screens/ManageGroupScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { ThemeProvider } from "./store/theme-context"
import IconButton from "./components/ui/IconButton";
import GroupsContextProvider from "./store/groups-context";
import GroupScreen from "./screens/GroupScreen";
import { View, StatusBar } from "react-native";
import GroupMembersScreen from "./screens/GroupMembersScreen";
import AddMemberScreen from "./screens/AddMemberScreen";
import ManageTasksScreen from "./screens/ManageTasksScreen";
import TaskScreen from "./screens/TaskScreen";
import { useTheme } from "./store/theme-context";

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

function AuthStack() {

  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedBottomTab() {
  const { colors } = useTheme();

  return (
    <BottomTabs.Navigator
      sceneContainerStyle={{ backgroundColor: colors.background50 }}
      screenOptions={{
        headerStyle: { backgroundColor: colors.background500 },
        headerTintColor: "red",
        tabBarStyle: { backgroundColor: colors.bgTabBar900},
        tabBarActiveTintColor: colors.icons100,
        tabBarShowLabel: true,
      }}
    >
      <BottomTabs.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            if(focused) {
              return <Ionicons 
                size={25} 
                name="home-sharp"
                color={colors.icons100} 
              />
            }
            return <Ionicons size={25} color={colors.iconFocused400} name="home-outline"/>
          },
        }}
      />
      <BottomTabs.Screen
        name="Groups"
        component={AllGroupsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            if(focused) {
            return <Ionicons 
                size={25} 
                name="people"
                color={colors.icons100} 
              />
            }
          return <Ionicons size={25} color={colors.iconFocused400} name="people-outline"/>
        }
      }} 
      />
      <BottomTabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            if(focused) {
            return <Ionicons 
                size={25} 
                name="settings"
                color={colors.icons100} 
              />
            }
            return <Ionicons size={25} color={colors.iconFocused400} name="settings-outline"/>
          }
        }}
      />
    </BottomTabs.Navigator>
  );
}

function AuthenticatedStack() {

  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.background900 },
        headerTintColor: "white",
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ManageTasksScreen"
        component={ManageTasksScreen}
        options={{
          presentation: "modal",
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Add Member"
        component={AddMemberScreen}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GroupMembersScreen"
        component={GroupMembersScreen}
        options={{
          presentation: "modal",
          headerShown: true,
          headerRight: ({ tintColor }) => (
            <View style={{ flexDirection: "row" }}>
              <IconButton icon={"exit-outline"} color={tintColor} size={24} />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="GroupScreen"
        component={GroupScreen}
        options={({ route, navigation }) => ({
          presentation: "modal",
        })}
      />
      <Stack.Screen
        name="TaskScreen"
        component={TaskScreen}
        options={() => ({
          presentation: "modal",
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
  const [isReady, setIsReady] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
      async function prepare() {
      try {
        await Font.loadAsync({
          "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
          "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <ThemeProvider>
        <GroupsContextProvider onLayout={onLayoutRootView}>
          <AuthContextProvider>
            
            <Root />
          </AuthContextProvider>
        </GroupsContextProvider>
      </ThemeProvider>
    </>
  );
}
