/**
 * @FileName: jwt
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/14 17:39
 */
export const parseToken = (token:string) => {
  if (token && token !== '') {
    let strings = token.split("."); //截取token，获取载体
    const userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/"))))); //解析，需要吧‘_’,'-'进行转换否则会无法解析
    return userinfo
  } else {
    return null
  }

}
