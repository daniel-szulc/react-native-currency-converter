import { Currency } from "../components/Currency";

interface Settings {
  theme: string;
  language: string;
  size: string;
  precision: number,
  cryptoPrecision: number

}

interface Data {
  currency: Currency[];
  crypto: Currency[];
  selectedCurrencies: Currency[];
  lastUpdate: string;
  providedAmount: number;
  selectedCurrency: Currency | undefined;
  settings: Settings
}

export {Data, Settings}


