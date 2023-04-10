import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext, ThemeType } from "./ThemeContext";
import { Colors } from "../theme";
import { useTheme } from "@react-navigation/native";
import { Currency, CurrencyType } from "./Currency";
import CurrencyElement from "./CurrencyElement";

/*interface Props {
  currency: Currency;
  onPress: (param: Currency) => void;
}*/

class CurrencyElementBase extends React.PureComponent {

state = {
      imageExists: true,
      imageSource: { uri: "https://wise.com/public-resources/assets/flags/rectangle/" + this.props.currency.name.toLowerCase() + ".png" },
      loading: true,
      theme: 'light'
    }

  static contextType = ThemeContext;


  componentDidMount(){

    const {theme} = this.context;

    this.setState(
      {
        theme: theme
      }
    )

    this.fetchImage();
  }

  componentDidUpdate(prevProps) {

    if (prevProps.currency !== this.props.currency) {

      this.setState(
        {
          imageSource: { uri: "https://wise.com/public-resources/assets/flags/rectangle/" + this.props.currency.name.toLowerCase() + ".png" }
        }
      )
      this.fetchImage();
    }
  }

   fetchImage = async () => {
     const { currency } = this.props;

     try {
       const response = await fetch(currency.imageUrl || this.state.imageSource.uri);
       if (response.status === 200) {
         this.setState({ imageSource: { uri: currency.imageUrl || this.state.imageSource.uri }, loading: false, imageExists: true });
       } else {
         this.setState({ loading: false, imageExists: false });
       }
     } catch (error) {
       console.log('Error loading image:', error);
       this.setState({ loading: false, imageExists: false });
     }
  };

  get styles() {
    const { theme } = this.context;

    return StyleSheet.create({
      container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors[theme]?.lightThemeColor,
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        paddingVertical: 8,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 1,
          height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3

      },
      currencyName: {

        color: Colors[theme]?.darkWhite
      },
      currencyFullName: {
        color: Colors[theme]?.white,
        fontWeight: "bold"
      },
      currencyNameView: {
        flex: 1,
        paddingHorizontal: 10,
        marginVertical: -1,
        textAlign: "left"
      },
      currencyValue: {
        color: Colors[theme]?.primaryText,
        fontSize: 16
      },
      flag: {
        width: this.props.currency.type === CurrencyType.Crypto ? 36 : 42,
        height: this.props.currency.type === CurrencyType.Crypto ? 36 : 28,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: this.props.currency.type === CurrencyType.Crypto ? 3 : 0,
        borderColor: Colors[theme]?.darkWhite,
        borderWidth: this.state.imageExists ? undefined : 0.5
      },
      flagText: {
        alignSelf: "center",
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical: "center",
        color: Colors[theme]?.white
      },
      flagView: {
        margin: 2,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1
      }

    });
  }

   baseCurrencyView(){
     return (
       <React.Fragment>
     {
       this.state.imageExists ? (<Image source={this.state.imageSource} style={this.styles.flag} />) : (
         <View style={this.styles.flag}><Text
           style={this.styles.flagText}>{this.props.currency.symbol === "" ? "?" : this.props.currency.symbol}</Text></View>)
     }
     <View style={this.styles.currencyNameView}>
       {this.props.currency.name ? <Text style={this.styles.currencyName}>{this.props.currency.name}</Text> : null}
       {this.props.currency.full_name ? <Text style={this.styles.currencyFullName}>{this.props.currency.full_name}</Text> : null}
     </View>
       </React.Fragment>
     )
   }


  render() {

    let flag = "https://wise.com/public-resources/assets/flags/rectangle/" + this.props.currency.name.toLowerCase() + ".png";
    if (this.props.currency.imageUrl)
      flag = this.props.currency.imageUrl;

    return (
      (this.props.currency.full_name !== "" && this.props.currency.name !== "" && this.props.currency.convertedResult !== undefined) ?
        (<TouchableOpacity onPress={() => this.props.onPress(this.props.currency)} style={this.styles.container}>
          {this.baseCurrencyView()}
        </TouchableOpacity>) : null

    );


  }
}

export default CurrencyElementBase;


