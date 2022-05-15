<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">监考查询</span>
          </div>

        </div>

        <div class="md-toolbar-row">
          <md-tabs class="md-primary" @md-changed="changeRoute">
            <md-tab id="Home" md-label="首页"></md-tab>
            <md-tab id="List" md-label="监考列表"></md-tab>
            <md-tab id="Upload" md-label="上传" v-if="user && user.job === '教务员'"></md-tab>
            <md-tab id="File" md-label="消息中心"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">个人中心</md-toolbar>

        <md-list>

          <md-content style="margin-bottom: 15px" v-if="user">
            <md-avatar class="md-large">
              <img :src="avatar" alt="Avatar">
            </md-avatar>
            <p class="user-name">{{ user.name }}</p>
          </md-content>
          <md-content style="margin-bottom: 15px" v-else>
            <md-avatar class="md-large">
              <img src="https://himg.bdimg.com/sys/portraitn/item/c302e6b38ae5aea2e9839de6be8e58af" alt="Avatar">
            </md-avatar>
            <p class="user-name">请登录</p>
          </md-content>

          <md-list-item @click="helpPart">
            <md-icon>info_outline</md-icon>
            <span class="md-list-item-text">帮助中心</span>
          </md-list-item>

          <md-list-item @click="changePwd" v-if="user">
            <md-icon>lock_reset</md-icon>
            <span class="md-list-item-text">修改密码</span>
          </md-list-item>

          <md-list-item @click="loginOut" v-if="user">
            <md-icon>logout</md-icon>
            <span class="md-list-item-text">退出登录</span>
          </md-list-item>
          <md-list-item @click="loginIn" v-if="!user">
            <md-icon>login</md-icon>
            <span class="md-list-item-text">立即登录</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content
          :style="{paddingLeft: $route.name==='File'? '0px': '',paddingRight: $route.name==='File'? '0px': ''}">
        <router-view/>
      </md-app-content>

    </md-app>
  </div>
</template>


<script>
import avatar1 from '@/assets/avatar/avatar1.webp'
import avatar2 from '@/assets/avatar/avatar2.webp'
import avatar3 from '@/assets/avatar/avatar3.webp'
import avatar4 from '@/assets/avatar/avatar4.webp'
import avatar0 from '@/assets/avatar/avatar0.webp'
import getRandom from "@/utli/getRandom"
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  data: () => ({
    menuVisible: false,
  }),
  computed: {
      ...mapState({
        user: state => state.loginUser.userData,
        isLoading: state => state.loginUser.isLoading
      }),
      avatar() {
        const res = getRandom(0, 4)
        switch (res) {
          case 0:
            return avatar0
          case 1:
            return avatar1
          case 2:
            return avatar2
          case 3:
            return avatar3
          case 4:
            return avatar4
        }
      }
    },
    methods: {
      changeRoute(e) {
        this.$router.push({name: e})
      },
      helpPart() {
        console.log(123)
      },
      changePwd() {
        this.$router.push({name: 'UpdatePwd'})
        this.menuVisible = false

      },
      loginOut() {
        this.$store.dispatch('loginUser/loginOut')
        this.menuVisible = false
        this.$router.push({name: 'Login'})
      },
      loginIn() {
        this.$router.push({name: 'Login'})
        this.menuVisible = false
      }
    }
  }
</script>
<style lang="less" scoped>
.md-app {
  min-height: 100vh;
  border: 1px solid rgba(#000, .12);
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.user-name {
  font-weight: 600;
  font-size: 1rem;
}

//.full-height {
//  height: 100vh;
//}
</style>
