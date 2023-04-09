import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View
} from "react-native";
import CurrencyElement from "./CurrencyElement";
import { FontAwesome5, FontAwesome  } from '@expo/vector-icons';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Colors } from "../theme";
import { ThemeContext, ThemeType } from "./ThemeContext";
import i18n from "i18next";
import { IconButton } from "@react-native-material/core";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { formatLastUpdate } from "./HomeScreen";
import { Currency } from "./Currency";
import CurrencyElementSelector from "./CurrencyElementSelector";
import { MaterialIcons } from '@expo/vector-icons';
import { setData } from "./Data";



function CurrencySelector({route, navigation}) {

  const { data, setData } = route.params;
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [search, setSearch] = React.useState('');
  const [filteredData, setFilteredData] = React.useState([...data.currency, ...data.crypto]);




  function selectCurrency(selectedCurrency: Currency, select: boolean) {

    console.log("selected Currency: " + selectedCurrency.name + " | select: " + select);

    const new_data = {...data};

    if (select) {
      new_data.selectedCurrencies.push(selectedCurrency);
    } else {
      const index = new_data.selectedCurrencies.findIndex(currency => currency.name === selectedCurrency.name);
      if (index !== -1) {
        new_data.selectedCurrencies.splice(index, 1);
      }
    }

    setData(new_data)
/*    navigation.setParams({
      data: new_data,
    });*/

    //setData(data)
  }



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme]?.themeColor,
    },
    emptyListView: {
      marginVertical: 20,
      flexGrow: 1,
      flexDirection: "column",
      flex: 1,
      alignItems:"center",
      justifyContent: "center",
      textAlign: "center"
    },
    emptyListText:{
      marginTop: 10,
      color: Colors[theme].darkWhite,
      fontSize: 16,
    },
    titleStyle: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      color: Colors[theme]?.white,
      padding: 10,
    },
    textStyle: {
      fontSize: 16,
      color: Colors[theme]?.white,
      textAlign: 'center',
      padding: 10,
    },
    touchableOpacityStyle: {
      position: 'absolute',
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      bottom: 30,
      backgroundColor: Colors[theme]?.primary,
      borderRadius: 30,
    },
    floatingButtonStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: 120,
    },
    searchBar:{
      color: Colors[theme]?.white,

    }
  });

  React.useEffect(() => {
    navigation.setOptions(({
      headerTitle: i18n.t('Add currency'),
      headerSearchBarOptions: {
        onChangeText: (event) => handleSearch(event.nativeEvent.text),
        textColor: Colors[theme]?.white,
        headerIconColor: Colors[theme]?.white,
        placeholder: i18n.t("Search currency"),
      },

    }));
  }, [navigation, theme]);

  const Tab = createBottomTabNavigator();



  function Crypto() {
    return <CurrencyView currencies={data.crypto}/>
  }

  function Traditional() {
   return <CurrencyView currencies={data.currency}/>
  }

  const CurrencyView = ({ currencies }) => {
    return (<View style={styles.container}>
      <FlatList
        data={currencies}
        initialNumToRender={7}
        style={{ flexGrow: 1, paddingVertical: 5, paddingBottom: 30}}
        keyExtractor={item => item.name}
        contentInsetAdjustmentBehavior="automatic"
        ListEmptyComponent = {EmptyList()}
        renderItem={item => renderItemComponent(item)} />
    </View>);
  }

  const EmptyList = () => {
    return(
      <View style={styles.emptyListView}>
        <MaterialIcons name="highlight-off" size={34} color={Colors[theme].darkWhite} />
        <Text style={styles.emptyListText}>{i18n.t("No results found")}</Text>
      </View>
    )
  }

  const handleSearch = text => {

    const formattedQuery = text.toLowerCase();


    const filtered = [...data.currency, ...data.crypto].filter( currency => { return contains(currency, formattedQuery);
    });

    setFilteredData(filtered);
    setSearch(text);
  };

  function contains(currency, query){

    if (currency.name.toLowerCase().includes(query) || currency.full_name.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  }


  const renderItemComponent = (itemData) => {

    const index = data.selectedCurrencies.findIndex(currency => currency.name === itemData.item.name);


    const isSelected = index != -1;

    return (
    <CurrencyElementSelector currency={itemData.item} onPress={selectCurrency} stateSelection={isSelected}/>
  )
  }

  return (
    <SafeAreaView style={styles.container}>

      {search.length==0 ?
      <View style={styles.container}>
          <NavigationContainer
        independent={true}
        theme={theme === 'dark' ? DarkTheme : DefaultTheme}
        >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Cryptocurrency') {
                iconName="bitcoin";
              } else if (route.name === 'Traditional currency') {
                iconName="money-bill";
              }

              // You can return any component that you like here!
              return <FontAwesome5 name={iconName} size={24} color={focused ? Colors[theme].white : Colors[theme].disabled} />
            },
            tabBarActiveTintColor: Colors[theme].white,
            tabBarInactiveTintColor: Colors[theme].disabled,
          })}
        >
          <Tab.Screen name="Traditional currency" component={Traditional} options={{ tabBarLabel: i18n.t('Traditional currency')}} />
          <Tab.Screen name="Cryptocurrency" component={Crypto} options={{ tabBarLabel: i18n.t('Cryptocurrency')}}/>
        </Tab.Navigator>
          </NavigationContainer>


      </View> :  <CurrencyView currencies={filteredData}/>}
    </SafeAreaView>
  );

}

export default CurrencySelector;
