import AsyncStorage from '@react-native-async-storage/async-storage';
import { Currency } from "../components/Currency";
import { CurrencyService } from "../service/CurrencyService";
import { getLocales } from 'expo-localization';
import DefaultData from "./DefaultData";
import {Data, Settings} from './Data'



const STORAGE_KEY = "@data";

function defaultSelectedCurrency(data: Data){

  const localCurrency = getLocales()[0].currencyCode

  return [
    ...data.currency.filter((currency) => ['USD', 'EUR', 'JPY', 'GBP', localCurrency].includes(currency.name)),
    ...data.crypto.filter((currency) => ['BTC', 'ETH'].includes(currency.name))
  ]

}

export async function updateData(currentData: Data | undefined): Promise<Data | null> {

  const data = currentData ? currentData : DefaultData;
  try {
    const currencyService = new CurrencyService();
      const currencies = await currencyService.getCurrenciesPromise(data.lastUpdate);
      if(currencies) {
        data.currency = currencies.currencies;
        data.lastUpdate = currencies.lastUpdate;
        data.crypto = currencies.cryptoCurrencies;
      }

  } catch (error) {
    console.error(error);
    return null;
  }

  if(data.selectedCurrencies)
  {
    if(data.selectedCurrencies.length>0) {
      data.selectedCurrencies = [...data.currency, ...data.crypto].filter((currency) => {
        return data.selectedCurrencies.some((selectedCurrency) => selectedCurrency.name === currency.name);
      });
    }
    else {
      data.selectedCurrencies = defaultSelectedCurrency(data);
    }
  }
  else {
    data.selectedCurrencies = defaultSelectedCurrency(data);
  }

  if(data.selectedCurrency == undefined)
    data.selectedCurrency =  data.selectedCurrencies[0];



  await setData(data);

  return data;
}


export async function getLocalData(): Promise<Data> {
  let data:Data = DefaultData;
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value !== null) {
      const parsedValue: Partial<Data> = JSON.parse(value);

      data = {
        ...DefaultData,
        ...parsedValue,
        settings: {
          ...DefaultData.settings,
          ...parsedValue.settings,
        },
      };
    }
    else {
    }
  } catch (error) {
    console.error(error);
  }

  return data;
}

export async function setSettingsData(settings: Settings): Promise<void> {
  try {
    let data: Data = await getLocalData();
    data = {...data, settings: settings}
    await setData(data);
  } catch (error) {
    console.error(error);
  }
}

export async function setData(data: Data): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

