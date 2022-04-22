/**
 * @FileName: enumerations
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/21 14:42
 */

// 判题状态
import {CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined, SyncOutlined} from "@ant-design/icons";
import React from "react";

export enum JudgeConditionEnum {
  PENDING = 'PENDING',
  ACCEPT = 'ACCEPT',
  WRONG_ANSWER = 'WRONG_ANSWER',
  COMPILE_ERROR = 'COMPILE_ERROR',
  MEMORY_LIMIT_EXCEED = 'MEMORY_LIMIT_EXCEED',
  TIME_LIMIT_EXCEEDED = 'TIME_LIMIT_EXCEEDED',
  OUTPUT_LIMIT_EXCEED = 'OUTPUT_LIMIT_EXCEED',
  WAITING = 'WAITING',
  SEGMENTATION_FAULT = 'SEGMENTATION_FAULT',
  RUNTIME_ERROR = 'RUNTIME_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

// 语言类型
export enum LanguageTypeEnum {
  C = 'C',
  C_PLUS_PLUS = 'C_PLUS_PLUS',
  JAVA = 'JAVA',
  PYTHON = 'PYTHON',
}

export const LanguageType: any = {
  C: {
    key: 0,
    value: 'C',
    name: 'C',
    abbreviation: '',
  },
  C_PLUS_PLUS: {
    key: 2,
    value: 'C_PLUS_PLUS',
    name: 'C++',
    abbreviation: '',
  },
  JAVA: {
    key: 3,
    value: 'JAVA',
    name: 'Java',
    abbreviation: '',
  },
  PYTHON: {
    key: 4,
    value: 'PYTHON',
    name: 'Python',
    abbreviation: '',
  },
}

// 排名颜色
export enum RankingColorEnum {
  RANKING_FIRST = '#f5222d',
  RANKING_SECOND = '#ff7a45',
  RANKING_THIRD = '#ffa940',
  RANKING_DEFAULT = '#8c8c8c'
}


// 比赛状态
export enum ContestStatusEnum {
  // 运行中
  RUNNING = 'RUNNING',

  // 已截止,
  CLOSED = 'CLOSED',

  // 未开始
  NOT_STARTED = 'NOT_STARTED'
}

// 用户类型枚举
export enum UserRole {
  ROOT = 'Root',
  ADMIN = 'Admin',
  TEACHER = 'Teacher',
  COMMON = 'Common',
  // GUEST = 'Guest',
}

interface IRole {
  id: number;
  name: string;
}

export const UserRoleObjectList: IRole[] = [
  {
    id: 1,
    name: UserRole.ROOT
  },
  {
    id: 2,
    name: UserRole.ADMIN
  },
  {
    id: 3,
    name: UserRole.TEACHER
  },
  {
    id: 4,
    name: UserRole.COMMON
  }
]

// 用户状态枚举
export enum UserStatus {
  NORMAL = "Normal",
  BANNED = "Banned",
}

// antd 预设
export enum AntdPreset {
  SUCCESS = 'success',
  ERROR = 'error',
  DEFAULT = 'default',
  PROCESSING = 'processing',
  WARNING = 'warning'
}

export enum AntdTagPresetColor {
  magenta = 'magenta', red = 'red', volcano = 'volcano',
  orange = 'orange', gold = 'gold', lime = 'lime',
  green = 'green', cyan = 'cyan', blue = 'blue',
  geekblue = 'geekblue', purple = 'purple',
}

export const ContestCondition: any = {
  RUNNING: {
    key: 0,
    color: AntdPreset.PROCESSING,
    value: 'RUNNING',
    name: 'Running',
    children: 'Running',
    abbreviation: '',
    // icon: <CheckCircleOutlined/>,
  },
  CLOSED: {
    key: 0,
    color: AntdPreset.PROCESSING,
    value: 'CLOSED',
    name: 'Closed',
    children: 'Closed',
    abbreviation: '',
    // icon: <CheckCircleOutlined/>,
  },
  NOT_STARTED: {
    key: 0,
    color: AntdPreset.PROCESSING,
    value: 'NOT_STARTED',
    name: 'Not Started',
    children: 'Not Started',
    abbreviation: '',
    // icon: <CheckCircleOutlined/>,
  },
}
export const JudgeCondition: any = {
  PENDING: {
    key: 0,
    color: AntdPreset.PROCESSING,
    value: 'PENDING',
    name: 'Pending',
    children: 'Pending',
    abbreviation: '',
    icon: <LoadingOutlined spin/>,
  },
  WAITING: {
    key: 0,
    color: AntdPreset.PROCESSING,
    value: 'WAITING',
    name: 'Waiting',
    children: 'Waiting',
    abbreviation: '',
    icon: <SyncOutlined spin/>,
  },
  ACCEPT: {
    key: 0,
    color: AntdPreset.SUCCESS,
    value: 'ACCEPT',
    name: 'Accept',
    children: 'Accept',
    abbreviation: 'AC',
    icon: <CheckCircleOutlined/>,
  },
  WRONG_ANSWER: {
    key: 0,
    color: AntdPreset.ERROR,
    value: 'WRONG_ANSWER',
    name: 'Wrong Answer',
    children: 'Wrong Answer',
    abbreviation: 'WA',
    icon: <CloseCircleOutlined/>,
  },
  COMPILE_ERROR: {
    key: 0,
    color: AntdTagPresetColor.purple,
    value: 'COMPILE_ERROR',
    name: 'Compile Error',
    children: 'Compile Error',
    abbreviation: 'CE',
    icon: <CloseCircleOutlined/>,
  },
  MEMORY_LIMIT_EXCEED: {
    key: 0,
    color: AntdTagPresetColor.blue,
    value: 'MEMORY_LIMIT_EXCEED',
    name: 'Memory Limit Exceed',
    children: 'Memory Limit Exceed',
    abbreviation: 'MLE',
    icon: <CloseCircleOutlined/>,
  },
  TIME_LIMIT_EXCEEDED: {
    key: 0,
    color: AntdTagPresetColor.volcano,
    value: 'TIME_LIMIT_EXCEEDED',
    name: 'Time Limit Exceeded',
    children: 'Time Limit Exceeded',
    abbreviation: 'TLE',
    icon: <CloseCircleOutlined/>,
  },
  OUTPUT_LIMIT_EXCEED: {
    key: 0,
    color: '#fff',
    value: 'OUTPUT_LIMIT_EXCEED',
    name: 'Output Limit Exceed',
    children: 'Output Limit Exceed',
    abbreviation: 'OLE',
    icon: <CloseCircleOutlined/>,
  },
  SEGMENTATION_FAULT: {
    key: 0,
    color: '#fff',
    value: 'SEGMENTATION_FAULT',
    name: 'Segmentation Fault',
    children: 'Segmentation Fault',
    abbreviation: 'SF',
    icon: <CloseCircleOutlined/>,
  },
  RUNTIME_ERROR: {
    key: 0,
    value: 'RUNTIME_ERROR',
    color: AntdTagPresetColor.orange,
    name: 'Runtime Error',
    children: 'Runtime Error',
    abbreviation: 'RE',
    icon: <CloseCircleOutlined/>,
  },
  UNKNOWN_ERROR: {
    key: 0,
    color: '#fff',
    value: 'UNKNOWN_ERROR',
    name: 'Unknown Error',
    children: 'Unknown Error',
    abbreviation: 'UE',
    icon: <CloseCircleOutlined/>,
  },
}
Object.freeze(JudgeCondition);

export const JudgeResultList: string[] = [
  "ac",
  "mle",
  "tle",
  "re",
  "ue",
  "ce",
  "wa",
  "se",
]
