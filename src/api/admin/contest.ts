/**
 * @FileName: contest
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/30 14:13
 */
import {BaseModel} from "../../models/BaseModel";
import {IPageQuery} from "../../models/Pagination";
import request from "../../utils/request";
import {IProblem, IProblemQuery} from "./problem";
import {IArticle} from "./article";

export interface IContest extends BaseModel {
  name: string;
  creatorId: number;
  creatorName?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  description?: string;
  type?: string;
  // 参赛人数
  personNumber?: number;
  problemNumber?: number;
}

export interface IContestQuery extends IPageQuery {
  name?: string;
  status?: string;
  creatorName?: string;
}

export const addContest = (data: IContest) => {
  console.log(data)
  return request({
      url: `/api/admin/contest/`,
      method: 'post',
      data
    }
  )
}

export const deleteContest = (id: number) => {
  return request({
      url: `/api/admin/contest/${id}`,
      method: 'delete',
    }
  )
}
/**
 *
 * @param data
 */
export const updateContest = (data: IContest) => {
  return request({
      url: `/api/admin/contest/`,
      method: 'put',
      data
    }
  )
}


export interface IContestProblemQuery extends IPageQuery {
  contestId: number;
  id?: number;
}

export const getContestList = (params: IContestQuery) => {
  return request({
      url: '/api/admin/contest',
      method: 'get',
      params
    }
  )
}

export const getContestDetail = (id: number) => {
  return request({
      url: `/api/admin/contest/${id}`,
      method: 'get',
    }
  )
}


export interface IContestProblemListQuery extends IPageQuery {
  contestId: number;
  id?: number;
}

export const getContestProblem = (params: IContestProblemListQuery) => {
  return request({
    url: `/api/admin/contest/problem`,
    method: 'get',
    params
  })
}
export const InitContest: IContest = {
  createdAt: new Date(),
  creatorId: 0,
  creatorName: "l",
  description: "",
  endTime: "",
  id: 0,
  name: "11",
  personNumber: 0,
  problemNumber: 0,
  startTime: "",
  status: "",
  type: "",
  updatedAt: new Date(),
}

