class Loading {
  constructor(options) {
    this.queueNum = 0;
    options = this._options = options || {};
    if (!options.title) {
      options.title = "请等待...";
    }
  }
  start() {
    if (this._options.sync) {
      this.queueNum += 1;
    }
    this._start();
    return this;
  }
  _start() {
    wx.showLoading({
      title: this._options.title,
      mask: true
    });
  }
  stop(force) {
    if (this._options.sync) {
      this.queueNum -= 1;
    }
    if (this.queueNum <= 0 || force) {
      this.queueNum = 0;
      this._stop();
    }
    return this;
  }
  _stop() {
    wx.hideLoading();
  }
}
export default Loading;
