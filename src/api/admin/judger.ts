/**
 * @FileName: judger
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/2 22:01
 */
import {BaseModel} from "../../models/BaseModel";
import request from "../../utils/request";
import {IProblemQuery} from "./problem";
import {IPageQuery} from "../../models/Pagination";


export interface IJudger extends BaseModel {
  name: string;
  baseUrl: string;
  port: number;
  isActive: boolean;
  condition?:{
    cpuCoreAmount?: number;
    cpuCostPercentage?: number;
    maxWorkingAmount?: number;
    memoryCostPercentage?: number;
    queueAmount?: number;
    resolutionPath?: string;
    scriptPath?: string;
    workPath?: string;
    workingAmount?: number;
  }
}

export interface IJudgerQuery extends IPageQuery {
  name?: string;
}


export const getJudgerList = (params: IJudgerQuery) => {
  return request({
      url: '/api/admin/judger',
      method: 'get',
      params
    }
  )
}
export const getJudgerDetail = (id: number) => {
  return request({
      url: `/api/admin/judger/${id}`,
      method: 'get',
    }
  )
}
export const deleteJudger = (id: number) => {
  return request({
      url: `/api/admin/judger/${id}`,
      method: 'delete',
    }
  )
}
export const addJudger = (data: IJudger) => {
  return request({
      url: `/api/admin/judger/`,
      method: 'post',
      data
    }
  )
}
export const updateJudger = (data: IJudger) => {
  return request({
      url: `/api/admin/judger/`,
      method: 'put',
      data
    }
  )
}

