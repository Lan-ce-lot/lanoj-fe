/**
 * @FileName: contestProblem
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/4 11:58
 */
import {BaseModel} from "../../models/BaseModel";
import request from "../../utils/request";
import {IPageQuery} from "../../models/Pagination";


export interface IContestProblem extends BaseModel {
  serialNumber: number;

  problemId: number;
  name: string;
  timeLimit: number;
  memoryLimit: number;
  cpuTimeLimit: number;
  outputLimit: number;
  content: string;
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
  myStatus: number;
}

export interface IContestProblemQuery extends IPageQuery {
  id?: number;
  userId: number;
  contestId: number;
}


export const getContestProblemList = (params: IContestProblemQuery) => {
  return request({
    url: "/api/contest/problem",
    method: 'get',
    params
  })
}
export const getContestProblemDetail = (params: IContestProblemQuery) => {
  return request({
    url: `/api/contest/problem/${params.id}`,
    method: 'get',
    params
  })
}


export const initContestProblem:IContestProblem = {
  ac: 0,
  ce: 0,
  content: "",
  cpuTimeLimit: 0,
  memoryLimit: 0,
  mle: 0,
  myStatus: 0,
  name: "1",
  outputLimit: 0,
  pe: 0,
  problemId: 0,
  re: 0,
  se: 0,
  serialNumber: 0,
  timeLimit: 0,
  tle: 0,
  total: 0,
  userId: 0,
  wa: 0
}
