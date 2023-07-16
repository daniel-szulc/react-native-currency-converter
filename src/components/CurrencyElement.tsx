import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext, ThemeType } from "../theme/ThemeContext";
import { Colors } from "../theme";

import { CurrencyType } from "./Currency";
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
          },
          selectedCurrency: {
            borderWidth: 1,
            borderColor: Colors[theme]?.primary,
            backgroundColor: Colors[theme]?.common,
          }
        }));
    }

  getAmount(roundDecimalValue) {

    if(roundDecimalValue==0)
      roundDecimalValue = this.props.settings.precision
    if(roundDecimalValue==0)
      roundDecimalValue = 100

    let amount = this.props.currency.convertedResult

    if(this.props.selected)
    {
      if(this.props.providedAmount != this.props.currency.convertedResult)
        amount = this.props.providedAmount;
    }



       let [integerPart, decimalPart] = [amount, null]

    if(typeof amount === 'number') {

      const roundedValue = Math.round(amount * roundDecimalValue) / roundDecimalValue;
      [integerPart, decimalPart] = String(roundedValue).split(".");
    }

    return (
      <Text style={this.styles.currencyValue}>

        {this.props.currency.symbol + " " + integerPart}
        <Text style={{color: Colors[this.context.theme].disabled, fontWeight: 'normal'}}>{decimalPart ? "."+decimalPart : null}</Text>
      </Text>
    );
  }


  render() {
   super.render();

    const roundDecimalValue = this.props.currency.type === CurrencyType.Crypto ? this.props.settings.cryptoPrecision : this.props.settings.precision;


    return (

      (this.props.currency.full_name !== "" && this.props.currency.name !== "" && this.props.currency.convertedResult !== undefined) ?
        (<TouchableOpacity onPress={() => this.props.onPress(this.props.currency)} onLongPress={() => this.props.onLongPress(this.props.currency)}  style={[this.styles.container, this.props.selected && this.styles.selectedCurrency]}>
          {this.baseCurrencyView()}
          <View style={{flex: 1.5, alignItems: "flex-end"}}>
          {this.getAmount(roundDecimalValue)}
          </View>
        </TouchableOpacity>) : null

    );


  }
}

export default CurrencyElement;


