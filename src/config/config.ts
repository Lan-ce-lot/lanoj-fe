/**
 * @FileName: config
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/21 14:15
 */
import {Empty} from "antd";
import {JudgeConditionEnum, LanguageTypeEnum} from "../common/enumerations";


// 文件目录
export const FILE_DIRECTORY = 'LANOJ/problemCase/'
// 文件上传baseUrl
export const UPLOAD_SERVER_BASE_URL: string = 'http://up-z0.qiniup.com';
// 文件下载路径
export const DOWNLOAD_SERVER_BASE_URL: string = 'http://cdn.lancelot.top';
//
export const API: string = '/api'
// 服务器的baseUrl
export const SERVER_URL: string = 'http://localhost:8081';
// 评测机
// export const HOST_URL: string = 'http://localhost:8080';
export const HOST_URL: string = 'http://120.26.199.136:8089';

// 查看当前提交轮询任务间隔时间，单位为毫秒
export const SUBMISSION_REQUEST_TASK_TIME: number = 4000;

// 响应时间阈值
export const TIME_OUT: number = 5000;

// 默认日期格式化
export const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';


// 日期格式化 - 小时
export const DATE_TIME_FORMAT_BY_HOUR = 'HH:mm:ss';

// 日期格式化 - 小时
export const DATE_TIME_FORMAT_WITHOUT_TIME = 'YYYY-MM-DD';

// 显示为空的图片
export const EMPTY_IMAGE = Empty.PRESENTED_IMAGE_SIMPLE;


// 默认语言
export const DEFAULT_LANGUAGE = [
  LanguageTypeEnum.C,
  LanguageTypeEnum.C_PLUS_PLUS,
  LanguageTypeEnum.JAVA,
  LanguageTypeEnum.PYTHON
]

// 判题结果改变可选值
export const JUDGE_RESULT_CHANGE_ALLOW_DATA = [
  JudgeConditionEnum.ACCEPT,
  JudgeConditionEnum.WRONG_ANSWER,
  JudgeConditionEnum.RUNTIME_ERROR,
  JudgeConditionEnum.TIME_LIMIT_EXCEEDED,
  JudgeConditionEnum.MEMORY_LIMIT_EXCEED
];
/* eslint-disable no-template-curly-in-string */
export const validateMessages = {
  required: '请输入${label}!',
  types: {
    email: '输入${label}不是有效的邮箱!',
    regexp: '111',
    // number: '输入${label}不是有效电话号码!',
    // regexp: {
    //   type: 'string',
    //   message: '输入${label}不是有效电话号码!',
    //   pattern: /^1[3|4|5|7|8|9]\d{9}$/,
    // }
    // phoneNumber: {
    //   type: 'string',
    //   message:'输入${label}不是有效电话号码!',
    //   pattern: /^1[3|4|5|7|8|9]\d{9}$/,
    // }
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
