/**
 * @FileName: ArticleModel
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/16 16:07
 */
import {BaseModel} from "./BaseModel";

export interface ArticleModel extends BaseModel {
  userId: number;
  user: string;
  problemId: number;
  problemName:string;
  content: string;
}
