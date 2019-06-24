// wx api Promise 化
const promisify = (fn, options = {}) => new Promise((resolve, reject) => {
  const apiOptions = options;
  apiOptions.complete = res => resolve(res);
  apiOptions.success = res => resolve(res);
  apiOptions.fail = err => reject(err);
  fn(apiOptions);
});

export default promisify;