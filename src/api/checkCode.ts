import request from '../utils/request';
// 获取验证码相关信息
export const getCheckCodeInfo = () => {
  return request.get(
    '/check-code/get-check-code'
  )
}
