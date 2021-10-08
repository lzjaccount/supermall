import axios from "axios";
//axios的封装
export function request(config) {
    //创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })
    //拦截器
    //拦截请求
    instance.interceptors.request.use(config => {
        //对请求或者请求配置信息进行处理后
        return config
    }, err => {
        return err
    })
    //拦截响应
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        return err
    })
    //发送请求intance(config)可以调用then和catch方法，所以他是一个promise对象
    return instance(config)
}