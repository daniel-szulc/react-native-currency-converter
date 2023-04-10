import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext, ThemeType } from "./ThemeContext";
import { Colors } from "../theme";
import { useTheme } from "@react-navigation/native";
import { Currency, CurrencyType } from "./Currency";
import CurrencyElementBase from "./CurrencyElementBase";


class CurrencyElement extends CurrencyElementBase {

  state = {
    ...this.state,

  }


  styles = StyleSheet.create(
    Object.assign({},
      this.styles,
      {
        currencyValue: {
          color: Colors[this.props.theme]?.primaryText,

          fontSize: 16
        }
      }));

  render() {
   super.render();

    const roundDecimalValue = this.props.currency.type === CurrencyType.Crypto ? 10000 : 100;


    return (
      (this.props.currency.full_name !== "" && this.props.currency.name !== "" && this.props.currency.convertedResult !== undefined) ?
        (<TouchableOpacity onPress={this.props.onPress} style={this.styles.container}>
          {this.baseCurrencyView()}
            <Text style={this.styles.currencyValue}>{this.props.currency.symbol + Math.round(this.props.currency.convertedResult * roundDecimalValue) / roundDecimalValue}</Text>
        </TouchableOpacity>) : null

    );


  }
}

export default CurrencyElement;


