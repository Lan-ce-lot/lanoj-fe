/**
 * @FileName: contestRank
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/3 19:58
 */
import {BaseModel} from "../../models/BaseModel";
import {IUser} from "../admin/user";
import request from "../../utils/request";

export const initRank: IContestRank = {
  "isFrozen": false,
  "participants": [
    {
      "solutionInfo": [
        {
          "tryAmount": 1,
          "submissionId": 1510921286187094000,
          "problemId": 35,
          "timeCost": 1577,
          "isFirstAc": true,
          "isAccepted": true
        },
        {
          "tryAmount": 0,
          "submissionId": -1,
          "problemId": 36,
          "timeCost": 0,
          "isFirstAc": false,
          "isAccepted": false
        },
        {
          "tryAmount": 0,
          "submissionId": -1,
          "problemId": 37,
          "timeCost": 0,
          "isFirstAc": false,
          "isAccepted": false
        },
        {
          "tryAmount": 0,
          "submissionId": -1,
          "problemId": 38,
          "timeCost": 0,
          "isFirstAc": false,
          "isAccepted": false
        },
        {
          "tryAmount": 0,
          "submissionId": -1,
          "problemId": 39,
          "timeCost": 0,
          "isFirstAc": false,
          "isAccepted": false
        }
      ],
      "teamInfo": {
        "id": 101,
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "username": "glz",
        "email": "1111@qq.com",
        "avatar": "http://localhost:8081/file/avatar/077ae88a-270b-42ce-8322-6dab3ba1853e-wallhaven-4dqrkj.jpg",
        "status": "Normal",
        "introduction": "这个人很懒，"
      },
      "rank": 1,
      "totalAcAmount": 1,
      "totalTimePenalty": 1577
    }
  ],
  "problemAmount": 5
}

export interface IContestRank extends BaseModel {
  isFrozen: boolean;
  participants: {
    solutionInfo:
      {
      tryAmount: number;
      submissionId: number;
      problemId: number;
      timeCost: number;
      isFirstAc: boolean;
      isAccepted: boolean;
    }[];
    teamInfo: IUser;
    rank: number;
    totalAcAmount: number;
    totalTimePenalty: number;
  }[];
  problemAmount: number
}


export const getContestRank = (contestId: number) => {
  return request({
    method: 'get',
    url: `/api/contest/${contestId}`
  })
}
