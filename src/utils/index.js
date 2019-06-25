export function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// 小于 10，补 0, 返回字符串
export const patchZero = digit => (digit >= 10 ? digit : `0${digit}`);

export const parseInt = (variable, hex = 10) => global.parseInt(variable, hex);

export const toFixed = variable => Number(variable).toFixed(2);

export const parseFloat = variable => global.parseFloat(variable);

// 减法，浮点数扩大 100 倍处理
export const subtraction = (a, b) => ((a * 100) - (b * 100)) / 100;

export const isEmptyObject = object => object !== undefined && Object.keys(object).length === 0;

export const isEmptyArray = array => array.length === 0;

export const isArray = value => Object.prototype.toString.call(value) === '[object Array]';
