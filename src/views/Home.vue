<template>

    <div>
      <h2> 欢迎使用首义监考查询系统</h2>
      <p>下面是使用须知</p>
      <md-steppers>
        <md-step id="first" md-label="第一步">
          <div class="step-wrapper">
            <p>你需要登录你的账号，输入工号和密码</p>
            <p>（默认密码为123456）</p>
            <md-button v-if="!$store.state.loginUser.userData" class="md-raised md-primary upload-position" @click="$router.push({name:'Login'})">点击登录</md-button>
          </div>
        </md-step>

        <md-step id="second" md-label="第二步">
          <div class="step-wrapper">
            <p>登录成功后，你可以查看你的监考信息</p>
            <p>选择需要调换的监考科目，输入对方的姓名</p>
            <p>通知对方同意你的请求</p>
          </div>
        </md-step>

        <md-step id="third" md-label="第三步">
          <div class="step-wrapper">
            <p>等待教务员审核</p>
            <p>审核完成后你的列表中就不会显示该场考试</p>
          </div>
        </md-step>
      </md-steppers>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>
<style scoped>
.step-wrapper{
  //height: calc(100vh - 207.86px);
}
</style>
