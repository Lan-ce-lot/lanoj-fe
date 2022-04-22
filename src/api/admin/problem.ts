/**
 * @FileName: problem
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/27 19:55
 */
import {BaseModel} from "../../models/BaseModel";
import {IPageQuery} from "../../models/Pagination";
import request from "../../utils/request";
import {ITag} from "./tag";


export interface IProblem extends BaseModel {
  name: string;
  timeLimit: number;
  memoryLimit: number;
  cpuTimeLimit: number;
  outputLimit: number;
  content: string;
  inputDescription: string;
  outputDescription: string;
  sampleIn: string;
  sampleOut: string;
  type?: string;
  isPublic?: boolean;
  commonId?: number;
  userId: number;
  username?: string;
  //
  total: number;
  ac: number;
  mle: number;
  tle: number;
  re: number;
  pe: number;
  ce: number;
  wa: number;
  se: number;
  tags: ITag[];
}

export interface IProblemQuery extends IPageQuery {
  id?: number;
  name?: string;
  tag?: string;
  username?: string;
}

export const getProblemList = (params: IProblemQuery) => {
  return request({
      url: '/api/admin/problem',
      method: 'get',
      params
    }
  )
}

export const getProblemDetail = (id: number) => {
  return request({
      url: `/api/admin/problem/${id}`,
      method: 'get',
    }
  )
}
export const deleteProblem = (id: number) => {
  return request({
      url: `/api/admin/problem/${id}`,
      method: 'delete',
    }
  )
}
export const addProblem = (data: IProblem) => {
  return request({
      url: `/api/admin/problem/`,
      method: 'post',
      data
    }
  )
}
export const updateProblem = (data: IProblem) => {
  return request({
      url: `/api/admin/problem/`,
      method: 'put',
      data
    }
  )
}


export const initProblem: IProblem =
  {
    inputDescription: "", outputDescription: "", sampleIn: "", sampleOut: "",
    id: 1,
    name: 'A+B',
    content: 'A+B+?',
    userId: 1,
    tags: [
      {
        id: 1,
        name: '算法',
        color: '#eee',
      },
      {
        id: 2,
        name: 'DP',
        color: '#eee',
      }
    ],
    timeLimit: 1000,
    memoryLimit: 100000,
    cpuTimeLimit: 100000,
    outputLimit: 100000,
    createdAt: new Date(),
    updatedAt: new Date(),
    //
    total: 1,
    ac: 1,
    mle: 1,
    tle: 1,
    re: 1,
    pe: 1,
    ce: 1,
    wa: 1,
    se: 1
  }

