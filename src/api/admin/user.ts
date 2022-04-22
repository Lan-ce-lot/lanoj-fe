/**
 * @FileName: antdUser
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/2/28 14:09
 */

import request from '../../utils/request';
import {IPageQuery} from "../../models/Pagination";
import {BaseModel} from "../../models/BaseModel";

// 获取用户相关信息
export interface IUser extends BaseModel {
  username: string;
  email: string;
  avatar: string;
  status: string;
  introduction?: string;
  articleNumber?: number;
  realName?: string;
  number?: string;
  phone?: string;
  role?: {
    id: number;
    name: string;
  };
}

export interface IUserListQuery extends IPageQuery {
  username?: string;
  role?: string;
  status?: string;
}

/**
 * 获取用户列表
 * @param params
 */
export const getUserList = (params: IUserListQuery) => {
  return request({
      url: '/api/admin/user/get-user-list',
      method: 'get',
      params
    }
  )
}

export interface IUserQuery {
  id?: number;
  username?: string;
}

/**
 * 获取单个用户
 * @param params
 */
export const getUserInfo = (params: IUserQuery) => {
  return request({
      url: '/api/admin/user/get-user-info',
      method: 'get',
      params
    }
  )
}


/**
 * 修改单个用户
 * @param params
 */
export const updateUserInfo = (data: IUser) => {
  return request({
      url: '/api/admin/user/',
      method: 'put',
      data
    }
  )
}
/**
 * 删除单个用户
 * @param id
 */
export const deleteUser = (id: number) => {
  return request({
      url: `/api/admin/user/${id}`,
      method: 'delete',
      // params
    }
  )
}
export const resetUserPassword = (data: { id: number}) => {
  return request({
    url: `/api/admin/user/reset/password`,
    method: 'put',
    data
  })
}

export const initUser: IUser = {
  avatar: "https://joeschmoe.io/api/v1/pgcz",
  email: "1@qq.com", role: {id: 1, name: "Root"}, status: "Normal",
  id: 100,
  username: 'lancel'
}
