import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ThemeContext } from '../theme/ThemeContext';
import Home from "./Home";
import Settings from "./Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CurrencySelector from "./CurrencySelector";
import { Colors } from "../theme";
const Stack = createNativeStackNavigator();
export default function Navigation() {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            animation: 'slide_from_right',
        }}
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
