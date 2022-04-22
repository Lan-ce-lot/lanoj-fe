import {CheckCircleOutlined, CloseCircleOutlined, SyncOutlined} from "@ant-design/icons";
import React from "react";
import {AntdPreset, JudgeCondition, LanguageType, UserRole} from "./enumerations";

/**
 * @FileName: map
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/26 17:58
 */


export const RoleToColorMap: { [key: string]: any } = {
  Root: AntdPreset.ERROR,
  Admin: AntdPreset.WARNING,
  Teacher: AntdPreset.PROCESSING,
  Common: AntdPreset.SUCCESS,
}

export const UserStatusToColorMap: { [key: string]: any } = {
  Normal: AntdPreset.PROCESSING,
  Banned: AntdPreset.ERROR,
}

export const ContestStatusToColorMap: { [key: string]: any } = {
  CLOSED: AntdPreset.ERROR,
  RUNNING: AntdPreset.PROCESSING,
  NOT_STARTED: AntdPreset.DEFAULT,
}

export const ContestStatusToCBadgeColorMap: { [key: string]: any } = {
  CLOSED: "red",
  RUNNING: AntdPreset.PROCESSING,
  NOT_STARTED: AntdPreset.DEFAULT,
}
// 枚举中文映射

export const ContestStatusToCN: { [key: string]: any } = {
  RUNNING: '进行中',
  CLOSED: '已结束',
  NOT_STARTED: '未开始',
}


export const JudgeConditionMap: { [key: string]: any } = {
  'ACCEPT': JudgeCondition.ACCEPT,
  'WRONG_ANSWER': JudgeCondition.WRONG_ANSWER,
  'COMPILE_ERROR': JudgeCondition.COMPILE_ERROR,
  'RUNTIME_ERROR': JudgeCondition.RUNTIME_ERROR,
  'TIME_LIMIT_EXCEEDED': JudgeCondition.TIME_LIMIT_EXCEEDED,
  'PENDING': JudgeCondition.PENDING,
  'MEMORY_LIMIT_EXCEEDED': JudgeCondition.MEMORY_LIMIT_EXCEED,
  'UNKNOWN_ERROR': JudgeCondition.UNKNOWN_ERROR,
}
export const LanguageTypeMap: { [key: string]: any } = {
  'C': LanguageType.C,
  'C_PLUS_PLUS': LanguageType.C_PLUS_PLUS,
  'Java': LanguageType.JAVA,
  'Python': LanguageType.PYTHON


}
