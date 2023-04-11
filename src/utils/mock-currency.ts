import { Currency } from '../components/Currency';


export const CURRENCIES: Currency[] = [
  {rate: 1, full_name: 'US Dollar', name: 'USD', symbol: '$', convertedResult: 1},
  {rate: 1.001, full_name: 'Euro', name: 'EUR', symbol: '€', convertedResult: 1.001},
  {rate: 4.725, full_name: 'Polish Zloty', name: 'PLN', symbol: 'zł', convertedResult: 4.725},
  {rate: 7.524, full_name: 'Croatian Kuna', name: 'HRK', symbol: 'kn', convertedResult: 7.524},
  {rate: 0.869, full_name: 'British Pound', name: 'GBP', symbol: '£', convertedResult: 0.869},
  {rate: 143.40, full_name: 'Japanese Yen', name: 'JPY', symbol: '¥', convertedResult: 143.40},
  {rate: 1.32, full_name: 'Canadian Dollar', name: 'CAD', symbol: '$', convertedResult: 1.32},
  {rate: 9987.6543210, full_name: 'TEST Money ąęłóź $#%^& Long Name TEST TEST test Money', name: 'TEST', symbol: '$$$', convertedResult: 9987.6543210},
];

