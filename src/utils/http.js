import Flyio from 'flyio/dist/npm/wx.js'; // 请求拦截
import Loading from "./gloading";
const gloading = new Loading({ sync: true });

const requestInterceptors = (request) => {
  gloading.start();
  // 添加自定义的一些 http 请求参数等
  // 给所有请求添加自定义header
  // request.headers['token'] = token
  // request.body = qs.stringify(request.body)
  return request;
};
const responseInterceptors = { // 响应拦截
  response: (response) => {
    gloading.stop();
    // 可能是下拉刷新调用接口，那么直接停止下拉刷新动画
    wx.stopPullDownRefresh();
    // 判断 api 返回内容进行异常提示或错误上报等
    return response;
  },
  error: (error) => {
    wx.stopPullDownRefresh();
    // 错误提示和上报等
    const { status, message } = error;

    if (status === 0) {
      // 网络异常
    }

    if (status !== 200) {
      // 请求异常
      wx.redirectTo({
        url: "/pages/login"
      });
    }

    if (message.indexOf('timeout') > -1) {
      // 请求超时
    }
    throw new Error(error);
  },
};
class Reqeust {
  constructor(options) {
    this.options = options;
    this.defaultConfig = {
      baseURL: options.baseURL, // base url
      // timeout: 3000, // timeout milliseconds
      headers: options.headers,
    };

    this.fly = new Flyio();

    this.fly.interceptors.request.use(requestInterceptors);
    this.fly.interceptors.response.use(responseInterceptors.response, responseInterceptors.error);
  }
  get(url, params) { 
    let options = { method: 'GET' }
    let req_url = params ? this.buildUrl(url, params) : url;
    return this.send(req_url, options)
  }

  post(url, data) { 
    let options = { method: 'POST', headers: { "content-type": "application/json;charset=UTF-8" } }
    if (data) options.body = JSON.stringify(data)
    return this.send(url, options)
  }
  delete(url, params) { 
    let options = { method: 'DELETE' }
    let req_url = params ? this.buildUrl(url, params) : url;
    return this.send(req_url, options)
  }
  put(url, data) {
    let options = { method: 'PUT' }
    if (data) options.body = JSON.stringify(data)
    return this.send(url, options)
  }
  postForm(url, data, flag) {
    let options = { method: 'POST' }
    if (data) options.body = flag ? this.buildFormData(data) : new FormData(data);
    return this.send(url, options)
  }
  head(url) {
    let options = { method: 'Head' }
    return this.send(url, options)
  }
  buildUrl(url, params) {
    const ps = []
    if (params) {
      for (let p in params) {
        if (p) {
          ps.push(p + '=' + encodeURIComponent(params[p]));
        }
      }
    }
    return url + '?' + ps.join('&')
  }

  buildFormData(params) {
    if (params) {
      const data = new FormData()
      for (let p in params) {
        if (p) {
          data.append(p, params[p])
        }
      }
      return data;
    }
  }
  send(path, options = {}) {
    const config = Object.assign({}, this.defaultConfig);
    config.baseURL = options.baseURL || this.options.baseURL;
    config.method = options.method || 'GET';
    config.params = options.params || {};
    return this.fly.request(path, options.data, config).then(response => response.data);
  }
}

export default Reqeust;
