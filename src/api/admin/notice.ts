/**
 * @FileName: notice
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/16 22:49
 */
import {BaseModel} from "../../models/BaseModel";
import request from "../../utils/request";
import {IJudger, IJudgerQuery} from "./judger";
import {IPageQuery} from "../../models/Pagination";

export interface INotice extends BaseModel {
  title: string;
  content: string;
  userId: number;
  username?: string;
}

export interface INoticeQuery extends IPageQuery {
  name:string;
}

export const getNoticeList = (params: INoticeQuery) => {
  return request({
      url: '/api/admin/notice/page',
      method: 'get',
      params
    }
  )
}
export const getNoticeDetail = (id: number) => {
  return request({
      url: `/api/admin/notice/${id}`,
      method: 'get',
    }
  )
}
export const deleteNotice = (id: number) => {
  return request({
      url: `/api/admin/notice/${id}`,
      method: 'delete',
    }
  )
}
export const addNotice = (data: INotice) => {
  return request({
      url: `/api/admin/notice/`,
      method: 'post',
      data
    }
  )
}
export const updateNotice = (data: INotice) => {
  return request({
      url: `/api/admin/notice/`,
      method: 'put',
      data
    }
  )
}
