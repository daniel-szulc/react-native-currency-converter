import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CurrencyElement from "./CurrencyElement";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Colors } from "../theme";
import { ThemeContext, ThemeType } from "./ThemeContext";
import i18n from "i18next";
import { IconButton } from "@react-native-material/core";

function Settings({navigation}) {

  const clickHandler = () => {
    //function to handle click on floating Action Button
    alert('Floating Button Clicked');
  };

  const { theme, toggleTheme } = useContext(ThemeContext);


  React.useEffect(() => {
    navigation.setOptions(({
      headerTitle: i18n.t('Settings'),
      headerRight: () => (
        <View
          style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <IconButton
            onPress={toggleTheme}
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
      )}));
  }, [navigation, theme]);

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.textStyle}>Settings here!</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );

}

export default Settings;
