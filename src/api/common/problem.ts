import request from "../../utils/request";

/**
 * @FileName: problem
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/14 17:08
 */
export interface ProblemQuery {
  currentPage?:number;
  limit?:number;
  keyword?:string;
  type?:string;
}
export const getProblems = (query:ProblemQuery) => {
  return request({
    url:'/problem/get-problem-list',
    params:query
  }
  )
}

export const getProblem = (id:number) => {
  return request.get(
    `/problem/${id}`
  )
}
