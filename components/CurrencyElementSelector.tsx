import React, { useContext, useEffect, useState } from "react";
import {  Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CurrencyElementBase, { Props as BaseProps } from "./CurrencyElementBase";
import Checkbox from 'expo-checkbox';


class CurrencyElementSelector extends CurrencyElementBase {

  state = {
    ...this.state,
    isSelected: false
  }

  selectCurrency() {
    const selection = !this.state.isSelected;

    this.setState({
      isSelected: selection
    })
     this.props.onPress(this.props.currency.name, selection);
  }


  componentDidMount() {
    super.componentDidMount();
    this.setState({isSelected: this.props.stateSelection})
  }

/*  componentDidUpdate(prevProps) {

  }*/


  styles = StyleSheet.create(
    Object.assign({},
      this.styles,
      {
        checkboxContainer: {
          flexDirection: "row",
          marginBottom: 20
        },
        checkbox: {
          alignSelf: "center"
        },
        label: {
          margin: 8
        }
      })
  );


  render() {
    super.render();

      return (
        (this.props.currency.full_name !== "" && this.props.currency.name !== "" && this.props.currency.convertedResult !== undefined) ?
          (<TouchableOpacity onPress={() =>  this.selectCurrency()} style={this.styles.container}>
            {this.baseCurrencyView()}
            <Checkbox
              value={this.state.isSelected}
              onValueChange={() =>  this.selectCurrency()}
              style={this.styles.checkbox}
            />
          </TouchableOpacity>) : null

      );


    }
}

export default CurrencyElementSelector;


