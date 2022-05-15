import axios from "axios"
import { clearCookie } from "@/utli/cookieManger"
// const token = localStorage.getItem("token");
let instance = axios;
// if (token) {
//   instance = axios.create({
//     headers: {
//       authorization: "bearer " + token,
//     },
//   });
// }
instance.defaults.withCredentials = true
instance.defaults.baseURL = 'https://wx.request.huangjinyu.xyz:8100'
instance.interceptors.response.use(function (response){
  return response
}, function (error) {
  if(error.response.status === "101"){
    clearCookie('sessionid')
  }
  // 对请求错误做些什么
  return Promise.reject(error);
})

export default instance
