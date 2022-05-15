import instance from "@/service/requset"
import qs from 'query-string'
// import { setCookie } from "@/utli/cookieManger"

export async function loginServe(data){
  const res =  await instance({
    url: '/exam/login',
    method: 'post',
    data: qs.stringify(data),
    headers: {'content-type': 'application/x-www-form-urlencoded'}
  })
  // if(res.data.code === 200){
  //   window.localStorage.setItem('token', res.data.session_id)
  //   setCookie('sessionid','4iovix2u40qc33d2qs5t95ry49vewn65',7)
  // }
  return res
}

export async function whoAmIServe(){
  return await instance.get('/exam/judge_is_login')
}

export async function loginOutServe(){
  return await instance.get('/exam/logout')
}
export async function changePwdServe(data){
  return  await instance({
    url: '/exam/update_user_pwd',
    method: 'post',
    data: qs.stringify(data),
    headers: {'content-type': 'application/x-www-form-urlencoded'}

  })
}
