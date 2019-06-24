# mpvue-demo

> A Mpvue project
# 文档结构
```
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── dist
│   └── wx
│       ├── app.js
│       ├── app.json
│       ├── app.wxss
│       ├── common
│       ├── components
│       ├── pages
│       └── static
├── index.html
├── package.json
├── package.swan.json
├── project.config.json
├── project.swan.json
├── src
│   ├── App.vue
│   ├── api
│   ├── app.json
│   ├── components
│   │   └── card.vue
│   ├── consts
│   ├── main.js
│   ├── pages
│   │   ├── counter
│   │   ├── index
│   │   └── logs
│   └── utils
│       ├── gloading.js
│       ├── http.js
│       ├── index.js
│       ├── interceptor.js
│       ├── promisify.js
│       ├── router.js
│       ├── storage.js
│       ├── tool.js
│       └── wx.js
├── static
│   ├── images
│   │   └── user.png
│   ├── mock
│   │   └── nav.json
│   └── tabs
│       ├── home-active.png
│       ├── home.png
│       ├── orders-active.png
│       └── orders.png
├── tree.md
└── yarn.lock
```

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```
