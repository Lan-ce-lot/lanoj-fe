/**
 * @FileName: contestProblem
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/1 16:56
 */
import {BaseModel} from "../../models/BaseModel";
import request from "../../utils/request";
import {IContestQuery} from "./contest";

export interface IContestProblem extends BaseModel {
  problemId: number;
  contestId: number;
  serialNumber?: number;
}

export const addContestProblem = (data: IContestProblem[]) => {
  return request({
    url: `/api/admin/contest/problem`,
    method: 'post',
    data
  })
}

export interface IDeleteParams {
  contestId: number;
  problemId: number;
}

export const deleteContestProblem = (params: IDeleteParams) => {
  return request({
    url: `/api/admin/contest/problem/${params.contestId}/${params.problemId}`,
    method: 'delete',
  })
}
