/**
 * 存储
 */
import promisify from './promisify';

// 异步存储数据
const set = (key, data) => promisify(wx.setStorage, { key, data });

// 异步获取数据
const get = key => promisify(wx.getStorage, { key });

// 异步清除数据
const remove = key => promisify(wx.removeStorage, { key });

// 清空缓存
const clear = () => wx.clearStorage();

export default {
  set,
  get,
  remove,
  clear,
};