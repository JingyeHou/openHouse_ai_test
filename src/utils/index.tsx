import * as api from './api'
import * as constant from './constant'
import axios from "axios";

const moneyFormatter = (money: number) => money.toFixed(2).replace(constant.REG_MONEY, '$&,')
const fetchURL = (url: string) => axios.get(url);
const getAverage = (arr: number[]) => arr.reduce((a: number, b: number) => a + b, 0) / (arr.length ? arr.length : 1)
export {
  api,
  constant,
  moneyFormatter,
  fetchURL,
  getAverage,
}