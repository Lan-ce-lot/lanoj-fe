/**
 * @FileName: UserModel
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/16 15:25
 */
import {BaseModel} from "./BaseModel";

export interface UserModel extends BaseModel {
  username:string;
  password:string;
  email:string;
  avatar:string;
  status:string;
  role:string;
}
