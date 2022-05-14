import instance from "@/service/requset"

export default async function fetchListServe(teacher){
  return await instance.get(`https://wx.request.huangjinyu.xyz:8100/exam/get_exam_info?teacher=${teacher}`)
}


