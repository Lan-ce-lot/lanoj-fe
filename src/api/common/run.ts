/**
 * @FileName: run
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/13 16:50
 */
import axios from "axios";
import {HOST_URL, SERVER_URL, TIME_OUT} from "../../config/config";
import store from "../../store";
import {changeLoading} from "../../store/actions";
import {message} from "antd";

export interface IRunCode {
  submissionCode: string;
  language: string;
  stdIn: string;
}

const service = axios.create({
  timeout: 8000,
  baseURL: HOST_URL,
});
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    // changeLoading(true)
    // NProgress.start()
    store.dispatch(changeLoading(true))


    if (store.getState().user.token) {
      console.log(store.getState().user.token)
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
export const remoteRunCode = (data: IRunCode) => {
  return service({
    url: "/run",
    method: "post",
    data
  })
}
