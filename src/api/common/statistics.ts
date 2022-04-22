/**
 * @FileName: statistics
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/17 14:08
 */
import request from "../../utils/request";
import {IProfile} from "./setting";

export {}

export interface IStatistics {
  total: number;
  statisticsItemList: IStatisticsItem[];
}

export interface IStatisticsItem {
  userId: number;
  username: string;
  realName: string;
  totalSolve: number;
  totalTimePenalty: number;
  exerciseItemList: {
    totalAC: number;
    exerciseTotal: number;
    timePenalty: number;
    exerciseId: number;
    exerciseName: string;
  }[]
}

export const getStatistics = (id: number) => {
  return request({
    method: 'get',
    url: `/statistics/${id}`,
  })
}
