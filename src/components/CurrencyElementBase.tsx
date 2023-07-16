import React from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../theme/ThemeContext";
import { Colors } from "../theme";

import DisplaySize from "../data/DisplaySize";


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

    if (prevProps.currency.name !== this.props.currency.name) {

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
        backgroundColor: Colors[theme]?.darkCommon,
        marginHorizontal: 10,
        marginTop: DisplaySize[this.props.displaySize].space,
        marginBottom: DisplaySize[this.props.displaySize].space,
        padding: 10,
        paddingVertical: DisplaySize[this.props.displaySize].padding,
        borderRadius: 10,
      },
      text:{
        fontSize: DisplaySize[this.props.displaySize].fontSize,
      },
      currencyName: {
        color: Colors[theme]?.darkWhite
      },
      currencyFullName: {
        color: Colors[theme]?.white,
        fontWeight: "bold"
      },
      currencyNameView: {
        flex: 2,
        paddingHorizontal: 10,
        marginVertical: -1,
        textAlign: "left",
      },
      flag: {
        width: DisplaySize[this.props.displaySize].flagSize[this.props.currency.type].width,
        height: DisplaySize[this.props.displaySize].flagSize[this.props.currency.type].height,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: DisplaySize[this.props.displaySize].flagSize[this.props.currency.type].margin,
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
           style={this.styles.flagText}>{this.props.currency.symbol === "" ? this.props.currency.name : this.props.currency.symbol}</Text></View>)
     }
     <View style={this.styles.currencyNameView}>
       {this.props.currency.name ? <Text style={[this.styles.text, this.styles.currencyName]}>{this.props.currency.name}</Text> : null}
       {this.props.currency.full_name ? <Text style={[this.styles.text, this.styles.currencyFullName]}>{this.props.currency.full_name}</Text> : null}
     </View>
       </React.Fragment>
     )
   }


  render() {

    let flag = "https://wise.com/public-resources/assets/flags/rectangle/" + this.props.currency.name.toLowerCase() + ".png";
    if (this.props.currency.imageUrl)
      flag = this.props.currency.imageUrl;

    return (
      (this.props.currency.name !== "" && this.props.currency.convertedResult !== undefined) ?
        (<TouchableOpacity onPress={() => this.props.onPress(this.props.currency)} style={this.styles.container}>
          {this.baseCurrencyView()}
        </TouchableOpacity>) : null

    );


  }
}

export default CurrencyElementBase;


