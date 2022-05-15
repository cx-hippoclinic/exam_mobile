import { loginServe, whoAmIServe, loginOutServe } from '@/service/login'

export default {
  namespaced: true,
  state: () => ({
    userData: null,
    isLoading: false
  }),
  mutations: {
    setUser (state, payload) {
      // 这里的 `state` 对象是模块的局部状态
      state.userData = payload
    },
    setIsLoading ( state, payload ){
      state.isLoading = payload
    },

  },
  actions: {
    async login ({commit}, data) {
      commit('setIsLoading', true)
      const res = await loginServe(data)
      if(res.data.code === 200){
        commit('setUser', {
          name: res.data['姓名'],
          job: res.data['职位'],
          id: res.data['user_id']}
          )
        commit('setIsLoading', false)
        return res.data
      }else {
        commit('setIsLoading', false)
        return res.data
      }

    },

    loginOut({commit}){
      commit('setUser', null)
      loginOutServe()
      // clearCookie('sessionid')
      // window.localStorage.removeItem('token')
    },

    async whoAmI({commit}){
      commit('setIsLoading', true)
      try {
        const res = await whoAmIServe()
        if(code === 0){
          return
        }
        commit('setUser', {
          name: res.data.name,
          job: res.data.role,
          id: res.data['user_id']}
        )
        commit('setIsLoading', false)
        return res.data.data
      }catch (err){
        commit('setIsLoading', false)
      }

    }
  },

}
