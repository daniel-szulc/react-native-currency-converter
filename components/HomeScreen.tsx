import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import CurrencyElement from "./CurrencyElement";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Colors } from "../theme";
import { ThemeContext, ThemeType } from "./ThemeContext";
import i18n from "i18next";
import { IconButton } from "@react-native-material/core";
import { Currency } from "./Currency";
import { Data, defaultData, getLocalData, getSelectedCurrencies, updateData } from "./Data";
import InputValueModal from "./InputValueModal";



export function formatLastUpdate(lastUpdate: string | undefined): string {
  if(!lastUpdate)
    return "";
  const date = new Date(lastUpdate);
  return i18n.t("Last update") + ": " + date.toLocaleString() ;
}

class HomeScreen extends React.Component {

  static contextType = ThemeContext;

  constructor(props) {
    super(props);

    this.state = {
      data: defaultData,
      selectedCopy: [],
      refreshing: false,
      modalVisible: false,
      isGoingBack: false
    };
  }

  setSelectedCurrencies = (selectedCurrencies) => {
    this.setState((prevState) => ({
      data: { ...prevState.data, selectedCurrencies }
    }));
  };




  updateHeader(){

    const { navigation } = this.props;
    const { theme } = this.context;

    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <IconButton
            icon={(props) => (
              <Ionicons
                onPress={() => navigation.navigate("Settings")}
                name="settings-sharp"
                size={24}
                color={Colors[theme]?.white}
              />
            )}
            color="primary"
          />
          <IconButton
            onPress={this.toggleTheme}
            icon={(props) => (
              <MaterialCommunityIcons
                name="theme-light-dark"
                size={24}
                color={Colors[theme]?.white}
              />
            )}
            color="primary"
          />
        </View>
      )
    });
  }


  componentDidMount() {

    const { navigation } = this.props;
    const { theme } = this.context;
    navigation.setOptions({
      headerTitle: i18n.t("currencyConverter"),
    });

    this.updateHeader();

    this.fetchData();

    navigation.addListener('focus', async () => {
      const newSelected = await getSelectedCurrencies();
      if(newSelected)
        this.setState((prevState) => ({
          data: { ...prevState.data, selectedCurrencies: newSelected }
        }));
    });


}

componentDidUpdate(prevProps, prevState) {

  if (!this.state.modalVisible && (prevState.providedAmount !== this.state.providedAmount || prevState.data.selectedCurrency !== this.state.data.selectedCurrency)) {

    this.convertValue(this.state.data.providedAmount);
  }

  this.updateHeader();

}


  fetchData = async () => {

    try {
      if (!this.state.data) {
        const localData = await getLocalData();
        this.setState({ data: localData });
      }
      const newData = await updateData(this.state.data);
      this.setState({ data: newData, refreshing: false });
      this.convertValue(this.state.data.providedAmount);
    } catch (error) {
      console.error(error);
    }
  };
  toggleTheme = () => {
    const { toggleTheme } = this.context;
    toggleTheme();
  };




  selectCurrency = (selectedCurrency) => {
    if (!selectedCurrency) return;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
      selectedCurrency: selectedCurrency},
      modalVisible: true }));
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };


  convertValue = (value: number) => {
    const { selectedCurrencies } = this.state.data;

    if (selectedCurrencies) {
      const updatedCurrencies = selectedCurrencies.map(currency => {
        const rateBase = currency.rate / this.state.data.selectedCurrency?.rate;
        const result = value * rateBase;
        return {
          ...currency,
          convertedResult: result
        }
      });
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          selectedCurrencies: updatedCurrencies,
          providedAmount: value
        }
      }));
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.fetchData();
    });
  };

  render() {
    const { theme } = this.context;

    const { modalVisible } = this.state;



    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: Colors[theme]?.themeColor
      },
      titleStyle: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: Colors[theme]?.white,
        padding: 10
      },
      textStyle: {
        fontSize: 16,
        color: Colors[theme]?.white,
        textAlign: "center",
        padding: 10
      },
      touchableOpacityStyle: {
        position: "absolute",
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        bottom: 30,
        backgroundColor: Colors[theme]?.primary,
        borderRadius: 30
      },
      floatingButtonStyle: {
        resizeMode: "contain",
        width: 50,
        height: 50
        //backgroundColor:'black'
      },
      iconContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: 120
      }


    });





    return (
      <SafeAreaView style={styles.container}>

        <InputValueModal selectedCurrency={this.state.data.selectedCurrency} modalVisible={modalVisible}
                         setModalVisible={this.setModalVisible} convertValue={this.convertValue} />

        <View style={styles.container}>
          <ScrollView style={{ paddingVertical: 5 }}
                      refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
          >
            {
              this.state.data?.selectedCurrencies.map((currency) =>
                <CurrencyElement onPress={this.selectCurrency} currency={currency} />
              )
            }
            <Text style={{
              alignSelf: "flex-end",
              margin: 5,
              marginHorizontal: 10,
              color: Colors[theme]?.darkWhite
            }}>{formatLastUpdate(this.state.data?.lastUpdate)}</Text>
          </ScrollView>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.props.navigation.navigate("Selector", {
              data: this.state.data,
              setSelectedCurrencies: this.setSelectedCurrencies
            })}
            style={styles.touchableOpacityStyle}>
            <MaterialCommunityIcons name="web-plus" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );

  }
}

export default HomeScreen;
