import request from "../../utils/request";
import {IPageQuery} from "../../models/Pagination";

/**
 * @FileName: problem
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/13 23:08
 */

export interface ISubmissionProps {
  userId: number;
  problemId: number;
  problemName?: string;
  username?: string;
  codeContent: string;
  language: string;
  contestId?:number;
  classId?:number;
  judgerName?:string;
}

export interface ISubmissionQuery extends IPageQuery {
  id?: number;
  userId?: number;
  username?: string;
  problemId?: number;
  status?: string;
}

export const addSubmission = (data: ISubmissionProps) => {
  return request.post(
    '/submission',
    data
  )
}
export const getSubmissionList = (params: ISubmissionQuery) => {
  return request({
      method: 'get',
      url: '/submission',
      params
    }
  )
}


