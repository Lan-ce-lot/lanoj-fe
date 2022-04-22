/**
 * @FileName: login
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/13 15:05
 */
import request from '../../utils/request';
// 获取验证码相关信息
export const getCheckCodeInfo = () => {
  return request.get(
    '/check-code/get-check-code'
  )
}
interface LoginProps {
  username:string;
  password:string;
  checkCode:string;
  checkCodeKey:string;
}
export const userSubmitLogin = (data:LoginProps) => {
  console.log(data)
  return request.post(
    '/user/login',
    data
  )
}
