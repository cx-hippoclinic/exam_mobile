<template>
  <div>
    <md-empty-state
        v-if="examList && examList.length === 0"
        class="md-primary"
        md-icon="free_cancellation"
        md-label="暂时还没有被安排监考"
        md-description="你可以休息一下咯，或者去消息中心看看有没有其他老师的交换请求">
    </md-empty-state>
    <md-list v-for="item in examList" :key="item.id">
      <md-list-item>
        <md-icon>calendar_month</md-icon>
        <span class="md-list-item-text">{{ item["时间"] }}</span>
      </md-list-item>
      <md-list-item>
        <md-icon>meeting_room</md-icon>
        <span class="md-list-item-text">{{ item["教室"] }}</span>
      </md-list-item>

      <md-list-item>
        <md-icon>class</md-icon>
        <span class="md-list-item-text">{{ item["考试课程"] }}</span>
      </md-list-item>

      <md-list-item>
        <md-icon>person_3</md-icon>
        <span class="md-list-item-text">{{ user.name }}</span>
        <md-button class="md-icon-button md-list-action" @click="exChange(item)" :disabled="!item['is_change']">
          <md-icon :class="{'md-primary': item['is_change'] }">sync_alt</md-icon>
        </md-button>
      </md-list-item>

      <md-list-item v-if="item.otherTeacher">
        <md-icon>person_4</md-icon>
        <span class="md-list-item-text">{{ item.otherTeacher }}</span>
      </md-list-item>

    </md-list>

    <div>
      <md-dialog-prompt
          :md-active.sync="active"
          v-model="value"
          @md-confirm="sendApply"
          md-title="对方的名字？"
          md-input-maxlength="30"
          md-input-placeholder="请输入对方的真实姓名"
          md-cancel-text="取消"
          md-confirm-text="确定" />
    </div>

    <md-snackbar :md-active="showSnackbar" :showSnackbar="2000">
      <span>{{ msg }}</span>
      <md-button class="md-primary" @click="showSnackbar = false">已读</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import fetchListServe from "@/service/examList"
import { submitApplyServe } from "@/service/submitApply"
import { mapState } from 'vuex'
import user from "@/store/modules/user"

export default {
  name: 'List',

  data: () => ({
    active: false,
    value: null,
    examList: null,
    currentChange: null,
    showSnackbar: false,
    msg: ''
  }),
  computed: {
    ...mapState({
      user: state => state.loginUser.userData,
      isLoading: state => state.loginUser.isLoading
    }),
  },
  async created() {
    if(this.user){
      const { data } = await fetchListServe(this.user.name)
      if(data.code === '200'){
        this.examList = data.data.map(it=>{
          if(it['监考教师2']){
            it.otherTeacher = this.user.name === it['监考教师1'] ? it['监考教师2']:it['监考教师1']
          }
          return it
        })
      }else {
        this.examList = []
      }
    }

  },
  methods:{
    exChange(item){
      this.active = true
      this.currentChange = item
    },
    async sendApply(){
      const res = await submitApplyServe({
        id: this.currentChange.id,
        teacher_name: this.user.name,
        change_teacher_name: this.value
      })
      this.showSnackbar = true
      this.msg = res.data.msg
      if(res.data.code === 200){
        const { data } = await fetchListServe(this.user.name)
        if(data.code === '200'){
          this.examList = data.data
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.md-list {
  width: 320px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, .12);
}
</style>
