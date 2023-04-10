import AsyncStorage from '@react-native-async-storage/async-storage';
import { Currency } from "./Currency";
import { CurrencyService } from "./CurrencyService";
import { getLocales } from 'expo-localization';
import { da } from "date-fns/locale";
import { useEffect } from "react";


export interface Data {
  currency: Currency[];
  crypto: Currency[];
  selectedCurrencies: Currency[];
  theme: string;
  lastUpdate: string;
  providedAmount: number;
  selectedCurrency: Currency | undefined;
}



export const defaultData: Data = {
  currency: [],
  crypto: [],
  selectedCurrencies: [],
  theme: "light",
  lastUpdate: "",
  providedAmount: 1,
  selectedCurrency: undefined
};

const STORAGE_KEY = "@data";

function defaultSelectedCurrency(data: Data){

  const localCurrency = getLocales()[0].currencyCode

  return [
    ...data.currency.filter((currency) => ['USD', 'EUR', localCurrency].includes(currency.name)),
    ...data.crypto.filter((currency) => ['BTC', 'ETC'].includes(currency.name))
  ]

  return [
    ...data.currency.filter((currency) => ['USD', 'EUR', 'JPY', 'GBP', 'CAD', 'CHF', 'AUD', localCurrency].includes(currency.name)),
    ...data.crypto.filter((currency) => ['BTC', 'VOXEL', 'RPL', 'HOPR', 'BSV', 'BCH', 'ETC'].includes(currency.name))
  ]
}

export async function updateData(currentData: Data | undefined): Promise<Data> {

  const data = currentData ? currentData : defaultData;
  try {
    const currencyService = new CurrencyService();
    try {
      const currencies = await currencyService.getCurrenciesPromise(data.lastUpdate);
      if(currencies) {
        data.currency = currencies.currencies;
        data.lastUpdate = currencies.lastUpdate;
        data.crypto = currencies.cryptoCurrencies;
      }
    } catch (error) {
      console.error(error);
    }

  } catch (error) {
    console.error(error);
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


export async function getSelectedCurrencies(): Promise<Currency[]> {
  const data = await getLocalData();
  return data.selectedCurrencies;
}

export async function getLocalData(): Promise<Data> {
  let data = defaultData;
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value !== null) {
      data = JSON.parse(value);
    }
  } catch (error) {
    console.error(error);
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

