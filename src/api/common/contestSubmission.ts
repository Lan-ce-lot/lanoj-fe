/**
 * @FileName: contestSubmission
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/4 15:08
 */

import request from "../../utils/request";
import {ISubmissionQuery} from "./submission";
export interface IContestSubmissionQuery extends ISubmissionQuery {
  contestId: number;
}
export const getContestSubmissionList = (params: IContestSubmissionQuery) => {
  return request({
      method: 'get',
      url: '/submission/contest',
      params
    }
  )
}
