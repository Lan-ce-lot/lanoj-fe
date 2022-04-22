/**
 * @FileName: index
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/26 0:07
 */
import request from "../../../utils/request";

export const getOtherContest = () => {

  return request.get(
    '/home/get-recent-other-contest'
  )
}
export const getUserRank = () => {
  return request.get(
    '/user/rank'
  )
}
