import request from "../../utils/request";
import {IJudgerQuery} from "./judger";

/**
 * @FileName: home
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/14 11:18
 */
export interface IHomeCount {
  userNumber: number;
  problemNumber: number;
  submissionNumber: number;
  judgerNumber: number;
  classNumber: number;
  articleNumber: number;
  contestNumber: number;
}

export const getHomeCount = () => {
  return request({
      url: '/api/admin/home/count',
      method: 'get',
    }
  )
}

export const getAllSubmissionResult = () => {
  return request({
      url: '/api/admin/home/judge/result',
      method: 'get',
    }
  )
}
