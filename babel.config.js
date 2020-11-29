// 项目发布用到的插件
var prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],

    // 发布用的插件数组
    ...prodPlugins,
    // 路由懒加载
    '@babel/plugin-syntax-dynamic-import'
  ]
}
