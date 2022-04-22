/**
 * @FileName: SubmissionModel
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/16 17:38
 */
import {BaseModel} from "./BaseModel";
import {JudgeResultModel} from "./judgeResultModel";

export interface SubmissionModel extends BaseModel {
  language: string;
  judgeCondition: string;
  judgeResult: JudgeResultModel;
  timeCost: string;
  memoryCost: string;
}
