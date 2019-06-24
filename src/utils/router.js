/**
 * 导航 API
 */
import { isEmptyObject } from '@/utils';

const concatUrl = (page, query = {}) => {
  const path = `/pages/${page}/main`;
  let queryString = '';
  if (!isEmptyObject(query)) {
    Object.keys(query).forEach((k) => {
      queryString += `&${k}=${query[k]}`;
    });
    queryString = queryString.replace('&', '?');
  }
  return path + queryString;
};


// 适用于非 tab 页
const redirect = (page, query) => {
  const url = concatUrl(page, query);
  wx.redirectTo({ url });
};

const push = (page, query) => {
  const pageStack = global.getCurrentPages();

  if (pageStack.length > 5) {
    redirect(page, query);
    return;
  }

  const pageIndex = pageStack.findIndex((p) => {
    const [, pageName] = p.route.split('/');
    return pageName === page;
  });

  // console.log('pageIndex', pageIndex, query);
  if (pageIndex > -1 && isEmptyObject(query)) {
    const delta = pageStack.length - 1 - pageIndex;
    wx.navigateBack({ delta });
  } else {
    const url = concatUrl(page, query);
    wx.navigateTo({ url });
  }
  const url = concatUrl(page, query);
  wx.navigateTo({ url });
};

const tab = (page, query) => {
  const url = concatUrl(page, query);
  wx.switchTab({ url, fail: e => console.log(e) });
};

const replace = (page, query) => {
  const url = concatUrl(page, query);
  wx.reLaunch({ url });
};

const go = (delta) => {
  wx.navigateBack({ delta });
};

export default {
  push,
  tab,
  replace,
  go,
  redirect,
};