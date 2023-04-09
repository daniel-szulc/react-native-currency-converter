import React, { useContext, useEffect, useState } from "react";
import {  Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext, ThemeType } from "./ThemeContext";
import { Colors } from "../theme";
import { useTheme } from "@react-navigation/native";
import { Currency, CurrencyType } from "./Currency";
import CurrencyElementBase from "./CurrencyElementBase";
import Checkbox from 'expo-checkbox';


interface Props {
  currency: Currency;
  onPress: (params: any) => void;
  stateSelection: boolean;
}

const CurrencyElementSelector: React.FC<Props> = ({ currency, onPress, stateSelection}) => {

  const { theme } = useContext<ThemeType>(ThemeContext);

  const [isSelected, setSelection] = useState(stateSelection);



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: 'center',
    },
    label: {
      margin: 8,
    },
  });

   function selectCurrency() {
     const selection = !isSelected;
     setSelection(selection);
     onPress(currency, selection);
/*    const selection = !isSelected;
    setSelection(selection);
    onPress(currency, selection);*/
  }

  return (
    <CurrencyElementBase currency={currency} onPress={selectCurrency}>
      <Checkbox
        value={isSelected}
        onValueChange={() =>  selectCurrency()}
        style={styles.checkbox}
      />
    </CurrencyElementBase>

  );


};

export default CurrencyElementSelector;


