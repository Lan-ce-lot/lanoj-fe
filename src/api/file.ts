import request from "../utils/request";

/**
 * @FileName: file
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/3 11:35
 */
export const avatarUpload = (data: any) => {

  return request({
      method: 'post',
      url: '/api/file/avatar',
      data
    }
  )
}
