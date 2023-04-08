import axios from 'axios';
import { Currency } from './Currency';
import { CURRENCIES } from './mock-currency';

interface CurrencyServiceProps {
  currencies: Currency[];
  lastUpdate: string;
}

export class CurrencyService {
  private currencies: Currency[] = [];
  private lastUpdate = "";

  public getCurrencies() {
    return this.currencies;
  }

  public getLastUpdate() {
    return this.lastUpdate;
  }

  public async getCurrenciesPromise(lastUpdate?: string ): Promise<CurrencyServiceProps | undefined>  {
    if (this.currencies.length === 0) {
      try {
        const response = await axios.get<any>('https://open.er-api.com/v6/latest/USD');

        this.lastUpdate = response.data.time_last_update_utc;

        if(this.lastUpdate === lastUpdate)
          return undefined;

        for (const [key, value] of Object.entries(response.data.rates)) {
          const currency: Currency = { rate: value, full_name: '', name: key, symbol: '', convertedResult: value };
          if(currency.rate && currency.name )
          this.currencies.push(currency);
        }

        const countriesResponse = await axios.get<any>('https://restcountries.com/v3.1/all?fields=currencies');
        countriesResponse.data.forEach((currency: any) => {
          const name = Object.keys(currency.currencies)[0];
          const index = this.currencies.findIndex((element) => element.name === name);
          if (index !== -1) {
            this.currencies[index] = {
              ...this.currencies[index],
              full_name: currency.currencies[name].name,
              symbol: currency.currencies[name].symbol,
            };
          }
        });
        return { currencies: this.currencies, lastUpdate: this.lastUpdate };
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        throw new Error(error);
      }
    } else {
      return { currencies: this.currencies, lastUpdate: this.lastUpdate };
    }
  }
}
