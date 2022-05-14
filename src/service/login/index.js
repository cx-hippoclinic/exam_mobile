import instance from "@/service/requset"
import qs from 'query-string'
export async function loginServe(data){
  return await instance({
    url: 'https://wx.request.huangjinyu.xyz:8100/exam/login',
    method: 'post',
    data: qs.stringify(data),
    headers: {'content-type': 'application/x-www-form-urlencoded'}

  })
}

export async function whoAmIServe(){
  return await instance.get('/api/admin/whoAmI')
}
