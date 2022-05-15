<template>
  <div>
    <md-table v-model="people" md-card @md-selected="onSelect" v-if=" people && people.length!== 0">
      <md-table-toolbar >
        <h1 class="md-title">选择同意的交换申请</h1>
      </md-table-toolbar>

      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button" @click="agreeApply(true)">
            <md-icon>done</md-icon>
          </md-button>
          <md-button class="md-icon-button" @click="agreeApply(false)">
            <md-icon>close</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" class="table-wrapper"
                    md-auto-select>
        <md-table-cell md-label="请求交换的老师" md-sort-by="name">{{ item.applyTeacher }}</md-table-cell>
        <md-table-cell md-label="同意交换的老师" md-sort-by="email">{{ item.teacher }}</md-table-cell>
        <md-table-cell md-label="考试时间" md-sort-by="gender">{{ item.time }}</md-table-cell>
        <md-table-cell md-label="考试科目" md-sort-by="title">{{ item.course }}</md-table-cell>
        <md-table-cell md-label="考试教室" md-sort-by="title">{{ item.room }}</md-table-cell>
      </md-table-row>


    </md-table>
    <md-empty-state
        v-if="people && people.length=== 0"
        md-icon="textsms"
        md-label="暂时还没有消息"
        md-description="还没有其他老师交换监考的申请">
    </md-empty-state>
  </div>
</template>

<script>
import { agreeApplyServe, readApplyServe, manageApplyServe } from "@/service/submitApply"
import { mapState } from "vuex"

export default {
  name: 'File',
  data: () => ({
    selected: [],
    people: null
  }),
  computed: {
    ...mapState({
      user: state => state.loginUser.userData,
      isLoading: state => state.loginUser.isLoading
    }),
  },
  created() {
    if (this.user.job === '教务员') {
      this.fetDataManger()
    } else {
      this.fetData()
    }
  },
  methods: {
    async fetData() {
      const id = this.user?.id
      if (id) {
        const {data} = await readApplyServe(id)
        console.log(data.data)
        this.people = data.data.filter(item => {
          return item['变更状态'] === '待确定'
        }).map(it => {
          return {
            time: it['时间'],
            course: it['考试课程'],
            applyTeacher: it['申请变更老师姓名'],
            changeId: it['变更id'],
            id: it.id,
            teacher: this.user.name,
            room: it['教室']
          }
        })
      }
    },
    async fetDataManger() {
      const id = this.user?.id
      console.log(id)
      if (id) {
        const {data} = await manageApplyServe(id)
        console.log(data)
        this.people = data.data.map(it=>{
          return {
            time: it['监考信息']['时间'],
            course: it['监考信息']['考试课程'],
            applyTeacher: it['原监考老师'],
            changeId: it.id,
            id: it['监考信息_id'],
            teacher: it['变更老师姓名'],
            room: it['监考信息']['教室']
          }
        })
      }
    },
    onSelect(items) {
      this.selected = items
    },
    getAlternateLabel(count) {
      return `${count} 条交换申请被选择`
    },
    async agreeApply(agree) {
      let message = agree? '同意':'拒绝'
      const promiseArr = []
      this.selected.forEach(it => {
        promiseArr.push(agreeApplyServe({
          ['exam_id']: it.id,
          status: this.user.job === '教务员' ? message: '待审核',
          ['user_id']: this.user.id,
          ['old_teacher_name']: it.applyTeacher,
          ['change_id']: it.changeId
        }))
      })
      const res = await Promise.all(promiseArr)
      if (res[0].data.code === 200) {
        if (this.user.job === '教务员') {
          this.fetDataManger()
        } else {
          this.fetData()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.table-wrapper {
  width: 100vw !important;
  text-align: start;
}

.md-table .md-table-content {
  overflow: hidden;
}

.md-table + .md-table {
  margin-top: 16px
}

.md-app-content .md-card {
  overflow: auto;
}
</style>
