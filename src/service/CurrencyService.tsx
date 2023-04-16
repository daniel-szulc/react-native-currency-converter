import axios from "axios";
import { Currency, CurrencyType } from "../components/Currency";
import currenciesDetails from "../utils/common-currencies";


interface CurrencyServiceProps {
  currencies: Currency[];
  cryptoCurrencies: Currency[];
  lastUpdate: string;
}

export class CurrencyService {

  public async getCurrenciesPromise(lastUpdate?: string ): Promise<CurrencyServiceProps | undefined>  {

    const allCurrencies: Currency[] = [];

      try {
        const response = await axios.get<any>( 'https://api.coinbase.com/v2/exchange-rates?currency=USD');



        for (const [key, value] of Object.entries(response.data.data.rates)) {
          const currency: Currency = { rate: value, full_name: '', name: key, symbol: '', convertedResult: value, imageUrl: '', type: CurrencyType.Crypto };
          if(currency.rate && currency.name )
            allCurrencies.push(currency);
        }

        const currencies: Currency[] = [];


        Object.keys(currenciesDetails).forEach((key) => {

          const currency = currenciesDetails[key];

          const index = allCurrencies.findIndex((element) => element.name === currency.code);

          if (index !== -1) {
            allCurrencies[index] = {
              ...allCurrencies[index],
              full_name: currency.name,
              symbol: currency.symbol,
              type: CurrencyType.Currency
            };
            currencies.push(allCurrencies[index]);
            allCurrencies.splice(index, 1);
          }
        })

        const extraCurrenciesDetails = await  axios.get<any> ('https://api.exchangerate.host/symbols');

        for (const [key, value] of Object.entries(extraCurrenciesDetails.data.symbols)) {

          const index = allCurrencies.findIndex((element) => element.name === key);

          if (index !== -1) {
            allCurrencies[index] = {
              ...allCurrencies[index],
              full_name: value.description,
              type: CurrencyType.Currency
            };
          }
          if(allCurrencies[index]) {
            currencies.push(allCurrencies[index]);
            allCurrencies.splice(index, 1);
          }
        }

        const index = currencies.findIndex((element) => element.name === "BTC");
        if (index !== -1) {
            currencies[index].type = CurrencyType.Crypto;
            allCurrencies.push(currencies[index])
            currencies.splice(index,1);
        }


        const cryptoDetails = await axios.get<any>( 'https://www.cryptocompare.com/api/data/coinlist/');


        for (const [key, value] of Object.entries(cryptoDetails.data.Data)) {

          const index = allCurrencies.findIndex((element) => element.name === value.Name);

          if (index !== -1) {
            allCurrencies[index] = {
              ...allCurrencies[index],
              full_name: value.CoinName,
              symbol: value.Symbol,
              imageUrl: cryptoDetails.data.BaseImageUrl + value.ImageUrl,
              type: CurrencyType.Crypto
            };
          }
        }

        lastUpdate = new Date().toISOString();

        return { currencies:  currencies, cryptoCurrencies: allCurrencies, lastUpdate:  lastUpdate };
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        throw new Error(error);
      }
  }
}
