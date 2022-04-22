/**
 * @FileName: class
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/9 22:05
 */
import {BaseModel} from "../../models/BaseModel";
import {IPageQuery} from "../../models/Pagination";
import {IUser} from "./user";
import request from "../../utils/request";
import {IArticle, IArticleQuery} from "./article";
import {IContest, IContestProblemListQuery} from "./contest";

export interface IClass extends BaseModel {
  name: string;
  description?: string;
  creatorId: number;
  creatorName: string;
  memberNumber: number;
  exerciseNumber: number;
}

export interface IClassQuery extends IPageQuery {
  name?: string;
  creatorId?: string;
}


/**
 * joinClass
 *
 */
export interface IJoinClass extends BaseModel {
  // name: string;
  description?: string;
  creatorId?: number;
  classId: number;
  userId: number;
}

export interface IMember extends IJoinClass, IUser {

}

export interface IJoinClassQuery extends IPageQuery {
  name?: string;
  classId?: number;
  userId?: number;
  realName?: string;
}

/**
 * exercise
 *
 */
export interface IExercise extends BaseModel {
  name: string;
  desc: string;
  creatorId: number;
  classId: number;
  startTime: Date;
  endTime: Date;
  type: string;
  status: string;
  creatorName?: string;
  description?: string;
  // 参赛人数
  personNumber?: number;
  problemNumber?: number;
}

export interface IExerciseQuery extends IPageQuery {
  name?: string;
  classId: number;
  creatorId?: string;
  status?: string;
}

export interface IMemberQuery extends IPageQuery {
  name?: string;
  classId: number;
}

export const initJoinClass: IJoinClass = {
  userId: 0,
  classId: 0,
  createdAt: undefined, creatorId: 0, description: "", id: 0, updatedAt: undefined

}
export const initMember: IMember = {
  userId: 0,
  classId: 0,
  avatar: "",
  createdAt: undefined,
  creatorId: 0,
  description: "",
  email: "",
  id: 0,
  introduction: "",
  role: {id: 0, name: ""},
  status: "",
  updatedAt: undefined,
  username: "1111"
}

export const createClass = (data: IClass) => {
  return request({
      url: `/api/admin/class/`,
      method: 'post',
      data
    }
  )
}
export const deleteClass = (id: number) => {
  return request({
      url: `/api/admin/class/${id}`,
      method: 'delete',
    }
  )
}
export const updateClass = (data: IClass) => {
  return request({
      url: `/api/admin/class/`,
      method: 'put',
      data
    }
  )
}
export const getClassDetail = (id: number) => {
  return request({
      url: `/api/admin/class/${id}`,
      method: 'get',
    }
  )
}
export const getClassPage = (params: IClassQuery) => {
  return request({
      url: `/api/admin/class/page`,
      method: 'get',
      params
    }
  )
}

export const getJoinClassPage = (params: IJoinClassQuery) => {
  // console.log(params)
  return request({
      url: `/api/admin/join/class/page`,
      method: 'get',
      params
    }
  )
}
// ===
export const createExercise = (data: IExercise) => {
  return request({
      url: `/api/admin/class/exercise`,
      method: 'post',
      data
    }
  )
}
export const deleteExercise = (id: number) => {
  return request({
      url: `/api/admin/class/exercise/${id}`,
      method: 'delete',
    }
  )
}

export const updateExercise = (data: IExercise) => {
  return request({
      url: `/api/admin/class/exercise`,
      method: 'put',
      data
    }
  )
}
export const getExercise = (id: number) => {
  return request({
      url: `/api/admin/class/exercise/${id}`,
      method: 'get',
    }
  )
}
export const getExercisePage = (params: IExerciseQuery) => {
  return request({
      url: `/api/admin/class/exercise/`,
      method: 'get',
      params
    }
  )
}


export interface IExerciseProblem extends BaseModel {
  problemId: number;
  contestId: number;
  serialNumber?: number;
}

export const addExerciseProblem = (data: IExerciseProblem[]) => {
  return request({
    url: `/api/admin/class/exercise/problem`,
    method: 'post',
    data
  })
}

export interface IDeleteParams {
  contestId: number;
  problemId: number;
}

export const deleteExerciseProblem = (params: IDeleteParams) => {
  return request({
    url: `/api/admin/class/exercise/problem/${params.contestId}/${params.problemId}`,
    method: 'delete',
  })
}

export interface IExerciseProblemListQuery extends IPageQuery {
  exerciseId: number;
  id?: number;
}

export const getExerciseProblem = (params: IExerciseProblemListQuery) => {
  return request({
    url: `/api/admin/class/exercise/problem`,
    method: 'get',
    params
  })
}
export const joinClass = (data: IJoinClass) => {
  return request({
    url: `/api/admin/join/class`,
    method: 'post',
    data
  })
}
export const AdminDeleteJoinClass = (id: number) => {
  return request({
    url: `/api/admin/join/class/${id}`,
    method: 'delete',
  })
}
export const leaveJoinClass = (params: { userId: number, classId: number }) => {
  return request({
    url: `/api/admin/join/class/leave/`,
    method: 'delete',
    params
  })
}
