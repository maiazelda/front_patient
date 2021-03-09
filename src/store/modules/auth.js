import Auth from '@/services/auth'
import Backend from '@/services/backend'

const defaultState = () => ({
  user: null,
  status: ''
})

export const namespaced = true
export const state = defaultState

export const mutations = {
  SET_STATUS(state, status) {
    state.status = status
  },
  SET_USER(state, user) {
    state.user = user
    if (user !== null) {
      Backend.instance.defaults.headers['Authorization'] = `Bearer ${user.id_token}`
    }
  },
  RESET(state) {
    const ds = defaultState()
    Object.keys(ds).forEach(key => {
      state[key] = ds[key]
    })
  }
}

export const getters = {
  isAuth: state => !!state.user && !state.user.expired && state.user.profile['cognito:groups'].includes('patient')
}

export const actions = {
  login() {
    return Auth.instance.signinRedirect()
  },
  loginCallback({
    commit,
    dispatch
  }) {
    return Auth.instance.signinRedirectCallback().then(user => {
      if (user.profile['cognito:groups'].includes('patient')) {
        commit('SET_USER', user)
        return user
      }
      else {
        return Auth.instance.removeUser()
          .then(() => {
            dispatch('logout')
          })
      }
    })
    .catch(error => {
      commit('SET_USER', null)
      throw error
    })
  },
  logout() {
    return Auth.instance.signoutRedirect()
  },
  logoutCallback({
    dispatch
  }) {
    return Auth.instance.signoutRedirectCallback().then(() => {
        dispatch('reset')
      })
      .catch(error => {
        dispatch('reset')
        throw error
      })
  },
  initFromStorage({ commit }) {
    commit('SET_STATUS', 'loading')
    return Auth.getUser()
      .then(user => {
        commit('SET_USER', user)
        commit('SET_STATUS', 'success')
        if (user && !user.profile['cognito:groups'].includes('patient')) {
          return Auth.instance.removeUser()
            .then(() => {
              return false
            })
        }
        else {
          return !!user && !user.expired && user.profile['cognito:groups'].includes('patient')
        }
      })
      .catch(error => {
        commit('SET_STATUS', 'error')
        throw error
      })
  },
  reset({
    commit
  }) {
    commit('RESET')
  }
}