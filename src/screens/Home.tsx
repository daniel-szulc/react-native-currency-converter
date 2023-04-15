import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import CurrencyElement from "../components/CurrencyElement";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Colors } from "../theme";
import { ThemeContext, ThemeType } from "../theme/ThemeContext";
import i18n from "i18next";
import { IconButton } from "@react-native-material/core";
import { Currency } from "../components/Currency";
import { getLocalData, setData, updateData } from "../data/SaveData";
import InputValueModal from "../components/InputValueModal";
import DefaultData from "../data/DefaultData";
import DisplaySize from "../data/DisplaySize";
import { options } from "axios";
import i18next from "i18next";
import InfoDialog from "../components/InfoDialog";
import Calculator from "../components/Calculator";



export function formatLastUpdate(lastUpdate: string | undefined): string {
  if(!lastUpdate)
    return "";
  const date = new Date(lastUpdate);
  return i18n.t("Last update") + ": " + date.toLocaleString() ;
}

class Home extends React.Component {

  static contextType = ThemeContext;

  constructor(props) {
    super(props);

    this.state = {
      data: DefaultData,
      refreshing: false,
      calculatorVisible: true,
      isGoingBack: false,
   /*   tempSelected: undefined,*/
      dialogAsk: {
        isActive: false,
        title: "",
        description: "",
        onAccept: undefined
      }
    };
  }


  updateHeader(){

    const { navigation } = this.props;
    const { theme } = this.context;

    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <IconButton
            onPress={() => navigation.navigate("Settings", {settings: this.state.data.settings})}
            icon={(props) => (
              <Ionicons

                name="settings-sharp"
                size={24}
                color={Colors[theme]?.white}
              />
            )}
          />
        </View>
      )
    });
  }

  loadData = async() =>
  {
    const localData = await getLocalData();

    await this.setState({ data: localData });
    const {changeTheme} = this.context;
    changeTheme(localData.settings.theme)
    i18n.changeLanguage(localData.settings.language)
    this.fetchData();
  }

  componentDidMount() {

    const { navigation } = this.props;
    const { theme } = this.context;



    navigation.setOptions({
      headerTitle: i18n.t("currencyConverter"),
    });



    this.updateHeader();

    this.loadData();

    navigation.addListener('focus', async () => {
      const newData = await getLocalData();
      if(newData) {
        await this.setState((prevState) => ({
          data: { ...prevState.data, selectedCurrencies: newData.selectedCurrencies, settings: newData.settings }
        }));
       this.convertValue(this.state.data.providedAmount)
      }
    });



}

componentDidUpdate(prevProps, prevState) {

  if (prevState.providedAmount !== this.state.providedAmount || prevState.data.selectedCurrency !== this.state.data.selectedCurrency) {

    this.convertValue(this.state.data.providedAmount);
  }

  this.updateHeader();

}


  fetchData = async () => {

    try {

      const newData = await updateData(this.state.data);
      this.setState({ data: newData, refreshing: false });
      this.convertValue(this.state.data.providedAmount);
    } catch (error) {
      console.error(error);
    }
  };

  saveData = () => {
    setData(this.state.data);
  }




/*/!*    setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });*!/
  };*/

  removeCurrency = (selectedCurrency) => {

    const new_selected = [...this.state.data.selectedCurrencies];

    const index =  this.state.data.selectedCurrencies.findIndex(currency => currency.name === selectedCurrency);
    if (index !== -1) {
      new_selected.splice(index, 1);
    }

    this.setState((prevState) =>(
      {
        data: {
          ...prevState.data,
          selectedCurrencies: new_selected
        },
        dialogAsk:{
          isActive: false}}), () => this.saveData());
  }

  cancelDialogAsk = () => {
    this.setState(
      {
        dialogAsk:{
          isActive: false}})
  }

  removeCurrencyAsk = (selectedCurrency) => {

    this.setState(
      {
        dialogAsk:{
          isActive: true,
          title: i18n.t("Remove") + " " + selectedCurrency.full_name,
          description: i18n.t("Are you sure you want to delete") + " " + selectedCurrency.full_name + " (" + selectedCurrency.name + ") " + i18n.t("from quick access?"),
          onAccept: () => this.removeCurrency(selectedCurrency.name)
        }
      }
    )
  }

  hideCalculator = () => {
    this.setState({
      calculatorVisible: false
    })
  }

  handleCalculatorView = (value: string) => {

    this.setState(prevState => ({
      data: {
        ...prevState.data,

        selectedCurrencies: prevState.data.selectedCurrencies.map(item => {
          if (item.name ===  this.state.data.selectedCurrency.name){
            return {
              ...item,
              convertedResult: value
            };
          }
          return item;
        })
      }
    }));
  };

  selectCurrency = (selectedCurrency) => {
    if (!selectedCurrency) return;

    this.setState(prevState => ({
      calculatorVisible: true,
      data: {
        ...prevState.data,
        selectedCurrency: selectedCurrency
      }
    }));

  };

/*  selectTempCurrency = (selectedCurrency) => {
    if (!selectedCurrency) return;
    this.setState({
      tempSelected: selectedCurrency
    });
    this.setModalVisible(true);
  };*/

  convertValue = (value: number) => {
    if(isNaN(value)) {
      value = 0;
    }
    const { selectedCurrencies } = this.state.data;
    let  currencyBase = this.state.data.selectedCurrency;

/*    if(this.state.tempSelected) {
      currencyBase = this.state.tempSelected;

      this.setState(prevState => ({
        data: {
          ...prevState.data,
          selectedCurrency: currencyBase}
      }));
    };*/


    if (selectedCurrencies) {
      const updatedCurrencies = selectedCurrencies.map(currency => {
        let result = currency.convertedResult;
        if(currency.name != this.state.data.selectedCurrency.name) {
          const rateBase = currency.rate / currencyBase.rate;
          result = value * rateBase;
        }
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
      }), () => this.saveData());
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.fetchData();
    });
  };

  render() {
    const { theme } = this.context;

 //   const { modalVisible } = this.state;



    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: Colors[theme]?.common
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
      },
      addButton:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: Colors[theme]?.darkThemeColor,
        borderStyle: "dotted",
        marginHorizontal: 10,
        marginTop: DisplaySize[this.state.data.settings.size].space,
        marginBottom: DisplaySize[this.state.data.settings.size].space,
        padding: 10,
        paddingVertical: DisplaySize[this.state.data.settings.size].padding,
        borderRadius: 10,
      },
      addButtonText: {
        color: Colors[theme]?.darkWhite,
        padding: 5
      },


    });





    return (
      <SafeAreaView style={styles.container}>

        <InfoDialog title={this.state.dialogAsk.title} information={this.state.dialogAsk.description} modalVisible={this.state.dialogAsk.isActive} button={{title: i18n.t("Remove"), onPress: this.state.dialogAsk.onAccept}} setModalVisible={this.cancelDialogAsk} />
 {/*       <InputValueModal selectedCurrency={this.state.tempSelected ? this.state.tempSelected : this.state.data.selectedCurrency} modalVisible={modalVisible}
                         setModalVisible={this.setModalVisible} convertValue={this.convertValue} />*/}

        <View style={styles.container}>
          <ScrollView
            style={{flex: 1}}
                      refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} colors={[Colors[theme].primary, Colors[theme].disabled]} progressBackgroundColor={Colors[theme].common} />}
          >
            <View style={{height: DisplaySize[this.state.data.settings.size].space}}/>
            {
              this.state.data?.selectedCurrencies.map((currency) =>
                <CurrencyElement key={currency.name} onPress={this.selectCurrency} onLongPress={this.removeCurrencyAsk} currency={currency} displaySize={this.state.data.settings.size} selected={this.state.data.selectedCurrency.name === currency.name}/>
              )
            }

            <TouchableOpacity onPress={() => this.props.navigation.navigate("Selector", {
              data: this.state.data
            })} style={[styles.addButton]}>
              <Ionicons name="add-circle" size={24} color={Colors[theme].primary} />
              <Text style={[styles.textStyle, styles.addButtonText]}>{i18n.t("Add new")}</Text>
            </TouchableOpacity>
            <Text style={{
              alignSelf: "flex-end",
              margin: 5,
              marginHorizontal: 10,
              color: Colors[theme]?.darkWhite
            }}>{formatLastUpdate(this.state.data?.lastUpdate)}</Text>
            <View style={{height: DisplaySize[this.state.data.settings.size].space}}/>
          </ScrollView>


          {this.state.calculatorVisible && <Calculator handleCalculatorView={this.handleCalculatorView} convertValue={this.convertValue} hideCalculator={this.hideCalculator}/>}

{/*          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.props.navigation.navigate("Selector", {
              data: this.state.data
            })}
            style={styles.touchableOpacityStyle}>
            <MaterialCommunityIcons name="web-plus" size={30} color="white" />
          </TouchableOpacity>*/}
        </View>
      </SafeAreaView>
    );

  }
}

export default Home;
