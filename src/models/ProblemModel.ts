/**
 * @FileName: Problem
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/16 15:29
 */
import {BaseModel} from "./BaseModel";
import {TagModel} from "./TagModel";

export interface ProblemModel extends BaseModel {
  name: string;
  content: string;
  tags: TagModel[] | null;
}

const problem: ProblemModel = {
  id: 1,
  name: '1',
  content: '1',
  tags: null,
  createdAt: new Date(),
  updatedAt: new Date()
}
