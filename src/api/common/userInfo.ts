/**
 * @FileName: userInfo
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/19 12:23
 */
import request from "../../utils/request";

export interface IUserQuery {
  id?: number;
  username?: number;
}


export const getUserInfo = () => {
  return request.get(
    '/user/detail',
  )
}

export const getOtherUserInfo = (params: IUserQuery) => {
  return request({
      url: '/user/detail',
      method: 'get',
      params
    }
  )
}


/**
 * 用户绘图
 */
export const getUserSubmissionResult = (params: { id: number }) => {
  return request({
      url: '/user/judge/result',
      method: 'get',
      params
    }
  )
}


/**
 * 用户ac题目
 */
export const getUserAcceptProblems = (id: number) => {
  return request({
      url: `/user/ac/problem/${id}`,
      method: 'get',
    }
  )
}

/**
 * 用户try题目
 */
export const getUserTryProblems = (id: number) => {
  return request({
      url: `/user/try/problem/${id}`,
      method: 'get',
    }
  )
}
