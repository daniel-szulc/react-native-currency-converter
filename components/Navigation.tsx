import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext';
import HomeScreen from "./HomeScreen";
import Settings from "./Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CurrencySelector from "./CurrencySelector";
const Stack = createNativeStackNavigator();
export default function Navigation() {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Selector"
          component={CurrencySelector}
          options={{ animation: 'slide_from_left' }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ animation: 'slide_from_right' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
