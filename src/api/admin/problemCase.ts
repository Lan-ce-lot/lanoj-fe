/**
 * @FileName: problemCase
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/8 0:38
 */
import request from "../../utils/request";
import {IPageQuery} from "../../models/Pagination";


// 问题的测试样例
export interface ProblemTestCase {
  id?: number;
  problemId?: number;
  stdIn?: string | null;
  stdOut?: string | null;
  description?: string;
}

// 获取上传凭证
export const getUploadToken = () => {
  return request.get(
    '/api/admin/problem/case/upload/token'
  )
}
// 添加解决方案
export const createSolution = (solution: ProblemTestCase) => {
  return request.post(
    '/api/admin/problem/case/',
    solution
  )
}
// 删除解决方案
export const deleteSolution = (params: { id: number }) => {
  return request({
      method: 'delete',
      url: '/api/admin/problem/case/',
      params
    }
  )
}

export interface ISolutionQuery extends IPageQuery {
  id: number;
}

// 查询一个问题的所有解决方案
export const getSolution = (params: ISolutionQuery) => {
  return request({
      method: 'get',
      url: '/api/admin/problem/case/page',
      params
    }
  )
}
