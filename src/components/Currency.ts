import { Image } from "react-native";

export enum CurrencyType{
  Currency = "currency",
  Crypto = "crypto"
}

export interface Currency {
  rate: number;
  full_name: string;
  name: string;
  symbol: string;
  convertedResult: number | string;
  imageUrl: string;
  type: CurrencyType;
}

