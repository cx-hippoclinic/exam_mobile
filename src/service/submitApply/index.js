import instance from "@/service/requset"
import qs from 'query-string'
import store from "@/store"
export async function submitApplyServe(data){
  return await instance({
    url: 'https://wx.request.huangjinyu.xyz:8100/exam/submit_change_exam_tacher',
    method: 'post',
    data: qs.stringify(data),
    headers: {'content-type': 'application/x-www-form-urlencoded'}
  })
}

export async function readApplyServe(id){
  return await instance({
    url: `https://wx.request.huangjinyu.xyz:8100/exam/get_change_exam_info?id=${id}`,
    method: 'get'
  })
}

export async function manageApplyServe(id){
  return await instance({
    url: `https://wx.request.huangjinyu.xyz:8100/exam/manage_get_change_info?id=${id}`,
    method: 'get'
  })
}

export async function agreeApplyServe(data){
  return await instance({
    url: `https://wx.request.huangjinyu.xyz:8100/exam/change_exam_status`,
    method: 'get',
    params: data
  })
}


