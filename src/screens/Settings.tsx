import { Linking, SafeAreaView, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CurrencyElement from "../components/CurrencyElement";
import { Entypo, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useEffect } from "react";
import { Colors } from "../theme";
import { ThemeContext, ThemeType } from "../theme/ThemeContext";
import i18n from "i18next";

import SettingsComponent from "../components/SettingsComponent";

import DisplaySize from "../data/DisplaySize";
import { setSettingsData } from "../data/SaveData";





const  Settings = ({route, navigation}) => {


  const policyUrl = "https://daniel-szulc.github.io/CurrencyConverter/PrivacyPolicy";
  const rateUrl = "https://play.google.com/store/apps/details?id=com.DanielSzulc.CurrencyConverter";
  const mailUrl = 'mailto:dszulc.dev@gmail.com?subject=CurrencyConverter'
  const { settings } = route.params;
  const shareMessage = i18n.t("ShareText") + " " + rateUrl;
  const [mySettings, setSettings] = React.useState(settings);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const iconSize = 24;
  const getColor = () => {return Colors[theme]?.white}

  const languages: Record<string, string> = {};
  for (const key in i18n.options.resources) {
    languages[key] = i18n.options.resources[key].translation.lang;
  }
  const displaySizes: Record<string, string> = {};
  for (const key in DisplaySize) {
    displaySizes[key] = i18n.t(key)
  }

  const precisions: Record<number, string> = {
     10: '0.1',
     100: '0.01',
     1000: '0.001',
    10000: '0.0001',
    100000: '0.00001',
    1000000: '0.000001',
    10000000: '0.0000001',
  };

  const cryptoPrecisions: Record<number, string> = {
    0: i18n.t('same as traditional currencies'),
    ...precisions
  };

  const changeLanguage = async (lang:string) => {
    if(i18n.language===lang)
      return
    await i18n.changeLanguage(lang)
    await setSettings({...mySettings, language: lang})
  }

  const changeTheme = async() => {
    setSettings({...mySettings, theme: theme === 'dark' ? 'light' : 'dark'})
    toggleTheme();
  }

  const changeDisplaySize = async (size:string) => {
    setSettings({...mySettings, size: size})
  }

  const changeDecimalPrecision = async (precision: number) => {
    setSettings(
      {
        ...mySettings,
        precision :  precision
      }
    )
  }
  const changeDecimalPrecisionCrypto = async (precision: number) => {

    setSettings(
      {
        ...mySettings,
        cryptoPrecision :  precision===0 ? mySettings.precision : precision
      }
    )
  }

  useEffect(() => {
    setSettingsData(mySettings);
  }, [mySettings]);

  const dataSourceInfo = () => {
    return (
      i18n.t("dataSourceInfo-exchange") + "\n\n"
      + i18n.t("dataSourceInfo-currency") + "\n\n"
      + i18n.t("dataSourceInfo-crypto") + "\n\n"
      + i18n.t("dataSourceInfo-flags")
    )
  }


  const settingsOptions = [
    {icon: <MaterialCommunityIcons name="theme-light-dark" size={iconSize} color={getColor()}/>, title: 'Theme', subTitle: theme, onPress: changeTheme},
    {icon: <Ionicons name="language" size={iconSize} color={getColor()} />, title: 'Language', subTitle: 'lang', onPress: changeLanguage, selectElements: languages, selected: i18n.language},
    {icon: <MaterialIcons name="table-rows" size={iconSize} color={getColor()} />, title: 'Display size', subTitle: mySettings.size, onPress: changeDisplaySize, selectElements: displaySizes, selected: mySettings.size},
    {icon: <FontAwesome5 name="coins" size={iconSize} color={getColor()} />, title: 'Decimal precision', subTitle: precisions[mySettings.precision], onPress: changeDecimalPrecision, selectElements: precisions, selected: mySettings.precision},
    {icon: <FontAwesome5 name="bitcoin" size={iconSize} color={getColor()} />, title: 'Decimal precision - crypto', subTitle: cryptoPrecisions[mySettings.cryptoPrecision], onPress: changeDecimalPrecisionCrypto, selectElements: cryptoPrecisions, selected: mySettings.cryptoPrecision},
    {icon: <FontAwesome5 name="google-play"size={iconSize} color={getColor()} />, title: 'Rate in Google Play', subTitle: null, onPress: () => {Linking.openURL(rateUrl).catch((err) => console.error('An error occurred', err));}},
    {icon: <Entypo name="share" size={iconSize} color={getColor()} />, title: 'Share', subTitle: null, onPress: () => { Share.share({message: shareMessage}).catch((err) => console.error('An error occurred', err));}},
    {icon: <MaterialIcons name="feedback" size={iconSize} color={getColor()}/>, title: 'Feedback', subTitle: null, onPress: () =>  {}, infoDialog: "sendFeedbackEmail", button: {title: "email", onPress: () => {Linking.openURL(mailUrl).catch((err) => console.error('An error occurred', err));} }},
    {icon: <MaterialIcons name="policy" size={iconSize} color={getColor()}/>, title: 'Privacy Policy', subTitle: null, onPress: () => {Linking.openURL(policyUrl).catch((err) => console.error('An error occurred', err));}},
    {icon: <FontAwesome5 name="database"  size={iconSize} color={getColor()}/>, title: 'Data source', subTitle: null, onPress: () => {}, infoDialog: dataSourceInfo() },


  ];

  React.useEffect(() => {


    navigation.setOptions(({
      headerTitle: i18n.t('Settings')
    }));
  }, [navigation, mySettings.language]);

  const styles = StyleSheet.create({
      option: {
        paddingHorizontal: 20,
        paddingBottom: DisplaySize[mySettings.size].settings.space,
        paddingTop: DisplaySize[mySettings.size].settings.space,
        flexDirection: "row",
        alignItems: "center",
        gap: 20
      },
      title:{
        fontSize: DisplaySize[mySettings.size].settings.title, color: Colors[theme].white
      },
      subtitle: {
        fontSize: DisplaySize[mySettings.size].settings.subTitle, color: Colors[theme].darkWhite, opacity: 0.5, paddingTop: 5
      }

    }
  );

  return (
    <SettingsComponent
      settingsOptions={settingsOptions}
      styles={styles}
    />

  );

}

export default Settings;
