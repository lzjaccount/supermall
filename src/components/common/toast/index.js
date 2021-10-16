import Toast from "./Toast.vue"

//自己封装toast插件
const obj = {}
//这个函数的参数默认会传过来vue
obj.install = function (Vue) {
    //1.创建组件构造器
    const toastConstrustor = Vue.extend(Toast)
    //2.new的方式，根据组件构造器创建出来组件对象
    const toast = new toastConstrustor()
    //3.将组件对象手动挂载在某个元素上
    toast.$mount(document.createElement('div'))
    //将模板添加到页面中
    document.body.appendChild(toast.$el)
    //4.在vue原型上添加对象，是的每个组件都可以访问
    Vue.prototype.$toast = toast
}
//导出对象，在入口文件mianjs文件中安装
export default obj