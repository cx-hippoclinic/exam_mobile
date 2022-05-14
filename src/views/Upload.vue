<template>
  <div>
    <md-field>
      <label>监考安排表</label>
      <md-file v-model="single" accept=".xls,.xlsx"  placeholder="请上传.xls或.xlsx的监考表格文件" @md-change="fileChange" />
    </md-field>

    <md-button :class="{'md-raised upload-position':true,' md-primary':!isLoading}"
               @click="uploadXls" :disabled="isLoading">
      <md-progress-spinner class="spinColor" :md-diameter="30" :md-stroke="3" md-mode="indeterminate" v-if="isLoading"></md-progress-spinner>
      {{isLoading? '': '上传'}}

    </md-button>
    <md-dialog-alert
        :md-active.sync="show"
        md-content="上传成功"
        md-confirm-text="好的" />
  </div>
</template>

<script>
import uploadServe from '@/service/upload'

export default {
  name: "Upload",
  data(){
    return {
      single: '',
      fileData: null,
      show: false,
      isLoading: false
    }
  },

  methods:{
    fileChange(file){
      console.log(file[0])
      this.fileData = file[0]
    },
    async uploadXls(){
      this.isLoading = true
      const {data} = await uploadServe({
        exam_excel: this.fileData
      })
      this.isLoading = false
      if(data.code === 200){
        this.show = true
      }
    }
  }
}
</script>

<style >
.upload-position{
  margin-top: 50px;
}

.md-progress-spinner-circle{
  stroke: #fff!important;
}
</style>
