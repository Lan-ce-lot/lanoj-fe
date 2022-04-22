/**
 * @FileName: tag
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/27 19:58
 */
import {BaseModel} from "../../models/BaseModel";
import {IPageQuery} from "../../models/Pagination";
import request from "../../utils/request";

export interface ITag extends BaseModel {
  name: string;
  color?: string;
  problemNumber?: number;
  [propName: string]: any;
}


export interface ITagQuery extends IPageQuery {
  // id?:number;
  name?: string;
}


export const getTagList = (params: ITagQuery) => {

  return request({
      url: '/api/admin/tag',
      method: 'get',
      params
    }
  )
}
export const deleteTag = (id: number) => {

  return request({
      url: `/api/admin/tag/${id}`,
      method: 'delete',
    }
  )
}
export const addTag = (data: ITag) => {
  return request({
      url: `/api/admin/tag/`,
      method: 'post',
      data
    }
  )
}
export const updateTag = (data: ITag) => {
  return request({
      url: `/api/admin/tag/`,
      method: 'put',
      data
    }
  )
}
