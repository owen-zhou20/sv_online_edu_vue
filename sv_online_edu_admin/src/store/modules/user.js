import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    buttons: [],
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_BUTTONS: (state, buttons) => {
      state.buttons = buttons
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // Login
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          // debugger
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // Login({ commit }) {
    //   debugger
    //   const data = {
    //     'token': 'helen'
    //   }
    //   setToken(data.token)// 将token存储在cookie中
    //   commit('SET_TOKEN', data.token)
    // },

    // Get user info
    async GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          // go to api.login.js => security.TokenAuthenticationFilter.doFilterInternal  => acl.IndexController => IndexServiceImpl.getUserInfo
          // debugger
          const data = response.data
          if (data.roles && data.roles.length > 0) { // check return roles is not empty arr
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          const buttonAuthList = []
          data.permissionValueList.forEach(button => {
            buttonAuthList.push(button)
          })

          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_BUTTONS', buttonAuthList)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // GetInfo({ commit }) {
    //   debugger
    //   const data = {
    //     'roles': [
    //       'admin'
    //     ],
    //     'name': 'helen',
    //     'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-5670helen3b4acafe.gif'
    //   }
    //   if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //     commit('SET_ROLES', data.roles)
    //   }
    //   commit('SET_NAME', data.name)
    //   commit('SET_AVATAR', data.avatar)
    // },

    // Logout
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // logout did by TokenLogoutHandler
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          // debugger
          commit('SET_TOKEN', '')// remove vuex data
          commit('SET_ROLES', [])// remove vuex data
          commit('SET_BUTTONS', [])
          removeToken()// remove cookie
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // front-end logout
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        debugger
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
