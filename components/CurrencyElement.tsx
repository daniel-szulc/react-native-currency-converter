import React, {useEffect, useState} from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import { useContext } from 'react';
import { ThemeContext, ThemeType } from "./ThemeContext";
import { Colors } from "../theme";
import { useTheme } from "@react-navigation/native";

interface Props {
  flag: string;
  name: string;
  currencyValue: string;
}

const CurrencyElement: React.FC<Props> = ({ flag, name, currencyValue }) => {

  const { theme } = useContext<ThemeType>(ThemeContext);

  const colors = useTheme().colors;


  const styles = StyleSheet.create({

    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors[theme]?.lightThemeColor,
      marginHorizontal: 10,
      marginTop: 10,
      padding: 10,
      borderRadius:10
    },
    currencyName: {
      flex: 1,
      fontWeight: 'bold',
      textAlign: 'center',
      color: Colors[theme]?.white
    },
    currencyValue:{
    color: Colors[theme]?.white
    }

  });


  return (
    <View style={styles.container} >
      <Image source={{ uri: flag }} style={{ width: 50, height: 50, marginRight: 10 }} />
      <Text style={styles.currencyName}>{name}</Text>
      <Text style={styles.currencyValue}>{currencyValue}</Text>
    </View>
  );


};

export default CurrencyElement;


