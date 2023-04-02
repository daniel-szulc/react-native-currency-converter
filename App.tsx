/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import Constants from 'expo-constants';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  Image,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {FAB} from 'react-native-elements';
import {Header} from '@rneui/themed';
import {
  DarkTheme,
  useTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Ionicons} from '@expo/vector-icons';
import {Icon} from 'react-native-elements';
import {IconButton} from '@react-native-material/core';

type SectionProps = PropsWithChildren<{
  title: string;
}>;
import {Appearance} from 'react-native';
import {Colors} from './theme';

const Stack = createNativeStackNavigator();

const App = () => {
  const clickHandler = () => {
    //function to handle click on floating Action Button
    alert('Floating Button Clicked');
  };

  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const [theme, setTheme] = useState(Appearance.getColorScheme());

  const colors = useTheme().colors;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme]?.themeColor,
    },
    titleStyle: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      color: Colors[theme]?.white,
      padding: 10,
    },
    textStyle: {
      fontSize: 16,
      color: Colors[theme]?.white,
      textAlign: 'center',
      padding: 10,
    },
    touchableOpacityStyle: {
      position: 'absolute',
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      bottom: 30,
      backgroundColor: Colors[theme]?.primary,
      borderRadius: 30,
    },
    floatingButtonStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
      //backgroundColor:'black'
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: 120,
    },
  });

  function HomeScreen() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.titleStyle}>
              Example of React Native Floating Action Button
            </Text>
            <Text style={styles.textStyle}>
              Click on Action Button to see Alert
            </Text>
            <Text style={styles.titleStyle}>
              Example of React Native Floating Action Button
            </Text>
            <Text style={styles.textStyle}>
              Click on Action Button to see Alert
            </Text>
            <Text style={styles.titleStyle}>
              Example of React Native Floating Action Button
            </Text>

            <Text style={styles.textStyle}>
              Click on Action Button to see Alert
            </Text>
            <Text style={styles.textStyle}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
            <Text style={styles.textStyle}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </ScrollView>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={clickHandler}
            style={styles.touchableOpacityStyle}>
            <MaterialCommunityIcons name="web-plus" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: 'Currency Converter',
            headerRight: () => (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <IconButton
                  icon={props => (
                    <Ionicons
                      name="settings-sharp"
                      size={24}
                      color={Colors[theme]?.white}
                    />
                  )}
                  color="primary"
                />
                <IconButton
                  onPress={switchTheme}
                  icon={props => (
                    <MaterialCommunityIcons
                      name="theme-light-dark"
                      size={24}
                      color={Colors[theme]?.white}
                    />
                  )}
                  color="primary"
                />
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
