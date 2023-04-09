import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext, ThemeType } from "./ThemeContext";
import { Colors } from "../theme";
import { useTheme } from "@react-navigation/native";
import { Currency, CurrencyType } from "./Currency";
import CurrencyElementBase from "./CurrencyElementBase";


interface Props {
  currency: Currency;
  onPress: (param: Currency) => void;
}

const CurrencyElement: React.FC<Props> = ({ currency, onPress }) => {

  const { theme } = useContext<ThemeType>(ThemeContext);

  const styles = StyleSheet.create({

    currencyValue:{
      color: Colors[theme]?.primaryText,

      fontSize: 16
    },




  });

      const roundDecimalValue = currency.type===CurrencyType.Crypto ? 10000 : 100;


  return (
    <CurrencyElementBase currency={currency} onPress={onPress}>
      <Text style={styles.currencyValue}>{currency.symbol + Math.round(currency.convertedResult * roundDecimalValue) / roundDecimalValue}</Text>
    </CurrencyElementBase>

  );


};

export default CurrencyElement;


