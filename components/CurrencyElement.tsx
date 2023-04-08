import React, {useEffect, useState} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext } from 'react';
import { ThemeContext, ThemeType } from "./ThemeContext";
import { Colors } from "../theme";
import { useTheme } from "@react-navigation/native";
import Svg, { Path } from 'react-native-svg';
import SvgUri from 'react-native-svg-uri';
import { ImageURISource, ImageRequireSource } from 'react-native';
import { createIconSet } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { Currency } from "./Currency";



interface Props {
  currency: Currency;
  onPress: (param: Currency) => void;
}

const CurrencyElement: React.FC<Props> = ({ currency, onPress }) => {




  const [imageExists, setImageExists] = useState(true);

  const { theme } = useContext<ThemeType>(ThemeContext);

  const colors = useTheme().colors;

  const styles = StyleSheet.create({

    container: {

      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors[theme]?.lightThemeColor,
      marginHorizontal: 10,
      marginTop: 5,
      marginBottom:5,
      padding: 10,
      paddingVertical: 8,
      borderRadius:10,
      shadowColor: "#000",
      shadowOffset: {
        width:1,
        height: 1
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,

    },
    currencyName: {

      color: Colors[theme]?.darkWhite,
    },
    currencyFullName: {
      color: Colors[theme]?.white,
      fontWeight: 'bold',
    },
    currencyNameView: {
      flex: 1,
      paddingHorizontal: 10,
      marginVertical: -1,
      textAlign: 'left',
    },
    currencyValue:{
      color: Colors[theme]?.primaryText,

      fontSize: 16
    },
    flag:{
      width: 42,
      height: 28,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',

      borderColor: Colors[theme]?.darkWhite,
      borderWidth:  imageExists ? undefined : 0.5,
    },
    flagText:{
      alignSelf: "center",
      fontWeight: "bold",
      textAlign: "center",
      textAlignVertical: "center",
      color: Colors[theme]?.white,
    },
    flagView:{
      margin: 2,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.00,

      elevation: 1,
    }

  });

  const flag = "https://wise.com/public-resources/assets/flags/rectangle/"+ currency.name.toLowerCase() +".png"

  const [imageSource, setImageSource] = useState({uri: flag});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchImage = async () => {


        try {
          const response = await fetch(flag);
          if (response.status === 200) {
            setImageSource({uri: flag});
            setLoading(false);
            setImageExists(true);
          } else {
            console.log('Image not found');
            setLoading(false);
            setImageExists(false);
          }

        } catch (error) {
          console.log('Error loading image:', error);
          setLoading(false);
          setImageExists(false);
        }
    };

  fetchImage();
  }, [currency]);

  return (
    (currency.name!=="" || currency.convertedResult!==undefined || loading) ?
      (<TouchableOpacity onPress={() => onPress(currency)}style={styles.container}>
        {imageExists ? (<Image source={imageSource} style={styles.flag}/>) : (<View style={styles.flag}><Text style={styles.flagText}>{currency.symbol==="" ? "?" : currency.symbol}</Text></View>)}
        <View style={styles.currencyNameView}>
          {currency.name ? <Text  style={styles.currencyName}>{currency.name}</Text> : null}
          {currency.full_name ? <Text style={styles.currencyFullName}>{currency.full_name}</Text> : null}
        </View>
    <Text style={styles.currencyValue}>{currency.symbol + Math.round(currency.convertedResult * 100) / 100}</Text>
  </TouchableOpacity >) : null

  );


};

export default CurrencyElement;


