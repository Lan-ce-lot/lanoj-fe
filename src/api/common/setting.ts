/**
 * @FileName: Setting
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/3 14:30
 */
import {BaseModel} from "../../models/BaseModel";
import request from "../../utils/request";

export interface IProfile extends BaseModel {
  username?: string;
  introduction?: string;
  realName?: string;
  number?: string;
  phone?: string;
}

export interface IPassword extends BaseModel {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export interface IEmail extends BaseModel {
  password: string;
  email: string;
}


export const updateUserProfile = (data: IProfile) => {
  return request({
    method: 'put',
    url: '/user',
    data
  })
}

export const updateUserPassword = (data: IPassword) => {
  return request({
    method: 'put',
    url: '/user/password',
    data
  })
}
export const updateUserEmail = (data: IEmail) => {
  return request({
    method: 'put',
    url: '/user/email',
    data
  })
}
