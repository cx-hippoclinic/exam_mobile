import instance from "@/service/requset"

export default async function uploadServe(data){
  return await instance.post('/exam/exam_import', data,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}


