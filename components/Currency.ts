import { Image } from "react-native";

export enum CurrencyType{
  Currency,
  Crypto
}

export interface Currency {
  rate: number;
  full_name: string;
  name: string;
  symbol: string;
  convertedResult: number;
  imageUrl: string;
  type: CurrencyType;
}

