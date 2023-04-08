import AsyncStorage from '@react-native-async-storage/async-storage';
import { Currency } from "./Currency";
import { CurrencyService } from "./CurrencyService";
import { getLocales } from 'expo-localization';


export interface Data {
  currency: Currency[];
  selectedCurrencies: Currency[];
  theme: string;
  lastUpdate: string;

}



export const defaultData: Data = {
  currency: [],
  selectedCurrencies: [],
  theme: "light",
  lastUpdate: "",

};

const STORAGE_KEY = "@data";

export async function getData(): Promise<Data> {
  let data = defaultData;
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value !== null) {
      data = JSON.parse(value);
    }
    const currencyService = new CurrencyService();
    try {
      const currencies = await currencyService.getCurrenciesPromise(data.lastUpdate);
      if(currencies) {
        data.currency = currencies.currencies;
        data.lastUpdate = currencies.lastUpdate;
      }
    } catch (error) {
      console.error(error);
    }

  } catch (error) {
    console.error(error);
  }

  if(data.selectedCurrencies.length == 0)
  {

    const localCurrency = getLocales()[0].currencyCode
    data.selectedCurrencies =  data.currency.filter((currency) => ['USD', 'EUR', 'JPY', 'GBP', 'CAD', 'CHF', 'AUD', localCurrency].includes(currency.name));
  }

  return data;
}

export async function setData(data: Data): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

