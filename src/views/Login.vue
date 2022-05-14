<template>
  <div>
    <md-field :class="messageClassId">
      <label>工号</label>
      <md-input v-model="loginId" required></md-input>
      <span class="md-helper-text">输入10位教务系统的工号</span>
      <span class="md-error">{{idErrMessage}}</span>
    </md-field>
    <md-field  :class="messageClassPwd">
      <label>密码</label>
      <md-input v-model="password" required></md-input>
      <span class="md-helper-text">默认密码123456</span>
      <span class="md-error">{{pwdErrMessage}}</span>
    </md-field>
    <md-button :class="{'md-raised login-position':true,' md-primary':!isLoading}"
               @click="login" :disabled="isLoading">
      <md-progress-spinner class="spinColor" :md-diameter="30" :md-stroke="3" md-mode="indeterminate" v-if="isLoading"></md-progress-spinner>
      {{isLoading? '': '登录'}}
    </md-button>

    <md-snackbar :md-active="showSnackbar" :showSnackbar="2000">
      <span>{{ msg }}</span>
      <md-button class="md-primary" @click="showSnackbar = false">已读</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import { mapState } from "vuex"

export default {
  data(){
    return {
      loginId:'',
      password:'',
      startCheck:false,
      idErrMessage: '',
      pwdErrMessage: '',
      showSnackbar: false,
      msg: ''
    }
  },
  computed: {
    ...mapState({
      user: state => state.loginUser.userData,
      isLoading: state => state.loginUser.isLoading
    }),
    messageClassId () {
      return {
        'md-invalid':  this.startCheck && this.idErrMessage !== ''
      }
    },
    messageClassPwd () {
      return {
        'md-invalid': this.startCheck && this.pwdErrMessage !== ''
      }
    },
  },
  methods:{
    login(){
      this.pwdErrMessage = ''
      this.idErrMessage = ''
      this.startCheck = true
      if(this.loginId === ''){
        this.idErrMessage = '工号不能为空'
      }
      if(this.password === ''){
        this.pwdErrMessage = '密码不能为空'
      }
      if(this.loginId.length !== 10){
        this.idErrMessage = '工号的长度为10'
      }
      if(this.pwdErrMessage !== '' || this.idErrMessage !== ''){
        return
      }
      this.$store.dispatch("loginUser/login", {
        username: +this.loginId,
        password: +this.password
      }).then(res=>{
        console.log(res)
        if(res){
          this.showSnackbar = true
          this.msg = res.msg
        }
        if(res.code === 200){
          if(this.$route.query.forward){
            this.$router.push(this.$route.query.forward)
          }else {
            this.$router.push('/')
          }

        }
      })
    }
  }
}
</script>
<style>
.login-position{
  margin-top: 50px;
}
</style>
