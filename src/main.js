import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from "./store/index"
import toast from "components/common/toast/index"
import Fastclick from "fastclick"
import VueLazyLoad from "vue-lazyload"

//安装我们自己写的插件  调用use方法执行toast里面的install方法
Vue.use(toast)

//决解移动端300ms延迟问题 
Fastclick.attach(document.body)

//图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
