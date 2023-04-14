import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext, ThemeType } from "../theme/ThemeContext";
import { Colors } from "../theme";
import { useTheme } from "@react-navigation/native";
import { Currency, CurrencyType } from "./Currency";
import CurrencyElementBase from "./CurrencyElementBase";
import DisplaySize from "../data/DisplaySize";


class CurrencyElement extends CurrencyElementBase {

  state = {
    ...this.state,

  }

  static context = ThemeContext;

  get styles() {
    const { theme } = this.context;
    return StyleSheet.create(
      Object.assign({},
        super.styles,
        {
          currencyValue: {
            color: Colors[this.context.theme]?.primaryText,
            fontWeight: 'bold',
            fontSize: DisplaySize[this.props.displaySize].fontSizeValue,
          }
        }));
    }

  getAmount(roundDecimalValue) {
    const roundedValue = Math.round(this.props.currency.convertedResult * roundDecimalValue) / roundDecimalValue;
    const [integerPart, decimalPart] = String(roundedValue).split('.');

    return (
      <Text style={this.styles.currencyValue}>

        {this.props.currency.symbol + " " + integerPart}
        <Text style={{color: Colors[this.context.theme].disabled, fontWeight: 'normal'}}>{decimalPart ? "."+decimalPart : null}</Text>
      </Text>
    );
  }


  render() {
   super.render();

    const roundDecimalValue = this.props.currency.type === CurrencyType.Crypto ? 10000 : 100;


    return (
      (this.props.currency.full_name !== "" && this.props.currency.name !== "" && this.props.currency.convertedResult !== undefined) ?
        (<TouchableOpacity onPress={() => this.props.onPress(this.props.currency)} onLongPress={() => this.props.onLongPress(this.props.currency)}  style={this.styles.container}>
          {this.baseCurrencyView()}
          <View style={{flex: 1.3, alignItems: "flex-end"}}>
          {this.getAmount(roundDecimalValue)}
          </View>
        </TouchableOpacity>) : null

    );


  }
}

export default CurrencyElement;


