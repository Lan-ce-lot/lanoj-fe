import request from "../../utils/request";

/**
 * @FileName: register
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/13 21:54
 */
interface RegisterProps {
  username:string;
  email:string;
  password:string;
  checkCode:string;
  checkCodeKey:string;
}
export const userSubmitRegister = (data:RegisterProps) => {
  console.log(data)
  return request.post(
    '/user/register',
    data
  )
}
