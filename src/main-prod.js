import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
// import './plugins/element.js'
import TreeTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'

Vue.config.productionTip = false
// 引入mock
import './utils/mock'

// 富文本
Vue.use(VueQuillEditor /* { default global options } */)

import axios from './utils/axiosConfig'
Vue.prototype.$axios = axios

// 全局过滤器格式化时间
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.component('tree-table', TreeTable)
new Vue({
  router,
  // store,
  render: (h) => h(App)
}).$mount('#app')