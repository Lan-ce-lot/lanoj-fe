/*
 * File: request.ts
 * Description: 请求总配置，最终返回一个request对象
 * Created: 2020-7-18 18:00:44
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */
import React from "react";
import axios from 'axios';
import store from "../store";
import {message, Spin} from "antd";
import {TIME_OUT, SERVER_URL, API} from '../config/config';
import {changeLoading} from "../store/actions";
import NProgress from "nprogress";


const service = axios.create({
  timeout: TIME_OUT,
  baseURL: SERVER_URL,
});

/**
 *
 * @description axios请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    // changeLoading(true)
    // NProgress.start()
    store.dispatch(changeLoading(true))


    if (store.getState().user.token) {
      // console.log(store.getState().user.token)
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers!['LANOJ-Token'] = store.getState().user.token
    }
    return config


  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)


service.interceptors.response.use(
  response => {
    store.dispatch(changeLoading(false))
    // NProgress.done()
    const {data: {code, msg, data}} = response
    if (code === 200) {
      if (response.data.code === 200) {
        return response
      } else {
        message.error(msg)
        return Promise.reject(response.data)
      }
      // return response.data
    } else {
      message.error(msg)
      return Promise.reject(response.data)
    }
  },
  error => {
    store.dispatch(changeLoading(false))
    const {response, status} = error.request;

    try {
      if (response) {
        const res = JSON.parse(response);
        message.error(res.msg || res.message || '未知错误')
      } else {
        message.error(error.message)
      }
      // return Promise.reject(error)
    } catch (err: any) {
      return Promise.reject({
        ...error,
        message: err.message
      });
    }
  }
)

export default service;
