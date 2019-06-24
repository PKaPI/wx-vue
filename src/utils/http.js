import Loading from "./gloading";
import { authBeforeRes } from './interceptor';
const gloading = new Loading({ sync: true });

// headers['x-auth-token'] = wx.getStorageSync('x-auth-token');

class api {
    get(url, params) { 
        let options = { method: 'GET' }
        let req_url = params ? this.buildUrl(url, params) : url;
        return this.request(req_url, options)
      }
    
      post(url, data) { 
        let options = { method: 'POST', headers: { "content-type": "application/json;charset=UTF-8" } }
        if (data) options.body = JSON.stringify(data)
        return this.request(url, options)
      }
      delete(url, params) { 
        let options = { method: 'DELETE' }
        let req_url = params ? this.buildUrl(url, params) : url;
        return this.request(req_url, options)
      }
    
      put(url, data) {
        let options = { method: 'PUT' }
        if (data) options.body = JSON.stringify(data)
        return this.request(url, options)
      }
    
      postForm(url, data, flag) {
        let options = { method: 'POST' }
        if (data) options.body = flag ? this.buildFormData(data) : new FormData(data);
        return this.request(url, options)
      }
      head(url) {
        let options = { method: 'Head' }
        return this.request(url, options)
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
      postBlob(url, data){
        let options = {
          method: 'POST',
          responseType: 'blob',
          headers: {
            "Content-type": "application/json;charset=UTF-8",
          }
        }
        if (data) options.body = JSON.stringify(data)
        return this.streamRequest(url, options)
      }
      request(url, options) {
    return new Promise((resolve, reject) => {
      gloading.start();
      wx.request({
        url: url,
        ...options,
        success(res) {
          gloading.stop();
          authBeforeRes(res);
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            wx.showToast({
              title: `网络层错误 ${res.statusCode}`,
              icon: "none"
            });
          }
        },
        fail(e) {
          wx.showToast({
            title: "网络连接失败",
            icon: "none"
          });
          reject(e);
        },
        complete() {
          gloading.stop();
        }
      });
    });
  }
}
export default api;
