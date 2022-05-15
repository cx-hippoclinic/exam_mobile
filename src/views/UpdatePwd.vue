<template>
  <div>
    <md-field :class="messageClassId">
      <label>旧密码</label>
      <md-input v-model="loginId" required></md-input>
      <span class="md-helper-text">默认密码是123456</span>
      <span class="md-error">{{idErrMessage}}</span>
    </md-field>
    <md-field  :class="messageClassPwd">
      <label>新密码</label>
      <md-input v-model="password" type="password" required></md-input>
      <span class="md-helper-text">密码长度需要大于等于6位</span>
      <span class="md-error">{{pwdErrMessage}}</span>
    </md-field>
    <md-field  :class="messageClassPwdCom">
      <label>确认密码</label>
      <md-input v-model="passwordCom" type="password" required></md-input>
      <span class="md-helper-text">该密码需要和上面输入的密码相同</span>
      <span class="md-error">{{pwdComErrMessage}}</span>
    </md-field>
    <md-button class="md-raised  md-primary login-position" @click="login">提交</md-button>
  </div>
</template>
<script>
import { changePwdServe } from '@/service/login'
export default {
  name:'UpdatePwd',
  data(){
    return {
      loginId:'',
      password:'',
      passwordCom:'',
      startCheck:false,
      idErrMessage: '',
      pwdErrMessage: '',
      pwdComErrMessage: ''
    }
  },
  computed: {
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
    messageClassPwdCom () {
      return {
        'md-invalid': this.startCheck && this.pwdComErrMessage !== ''
      }
    },
  },
  methods:{
    async login(){
      this.pwdErrMessage = ''
      this.idErrMessage = ''
      this.startCheck = true
      if(this.loginId === ''){
        this.idErrMessage = '旧密码不能为空'
      }
      if(this.password === ''){
        this.pwdErrMessage = '密码不能为空'
      }
      if(this.passwordCom === ''){
        this.pwdComErrMessage = '确认密码不能为空'
      }
      if(this.password.length < 6){
        this.pwdErrMessage = '密码的长度需要大于等于6'
      }

      if(this.password !== this.passwordCom){
        this.pwdComErrMessage = '确认密码和密码不相同'
      }
      if(this.pwdErrMessage !== '' || this.idErrMessage !== '' || this.pwdComErrMessage !== ''){
        return
      }
      console.log(this.loginId,this.password)
      const {data} = await changePwdServe({
        user_id: this.$store.state.loginUser.userData.id,
        new_pwd: this.password,
        old_pwd: this.loginId,
      })
      if(data.code === 200){
        await this.$store.dispatch('loginUser/loginOut')
        this.$router.push({name: 'Login'})
      }else {
        console.log(data.msg)
      }

    }
  }
}
</script>
<style>
.login-position{
  margin-top: 50px;
}
</style>
