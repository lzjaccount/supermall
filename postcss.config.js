module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视图的宽度，对应我们设计稿的宽度
      viewportHeight: 667,//视图的高度，对应我们设计稿的高度
      unitPrecision: 5,//指定px转换为视窗单位值的小数位数
      viewportUnit: 'vw',//指定需要转换成的视窗单位 建议使用vw
      selectorBlackList: ['tab-bar', 'tabbar-item'],//指定不需要转换的类,css里面的类
      minPixelValue: 1,//小于或等于1px不转换为视窗单位
      mediaQuery: false,//是否在媒体查询中转换px
      exclude: []//忽略不需要转换的文件文件
    }
  }
}
