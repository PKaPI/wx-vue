export function authBeforeRes(response) {
  switch (response.status) {
    case 200:
      return response;
    case 302:
      wx.showToast({
        icon: "none",
        mask: true,
        title: res.data.message,
        duration: 3000
      });
      wx.redirectTo({
        url: "/pages/login"
      });
    case 401:
      wx.redirectTo({
        url: "/pages/login"
      });
    case 403:
      wx.redirectTo({
        url: "/pages/login"
      });
    default:
      if (process.env.NODE_ENV !== "production") {
        console.error("Request error: ", response.code, response.message);
      }
      return response;
  }
}
