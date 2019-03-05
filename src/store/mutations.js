
export default {
  SET_LOGIN (state, payload) {
    state.isAuth = payload.auth
    state.user = payload.user
    state.accessToken = payload.accessToken
    console.log(state)
  },
  SET_LOGOUT (state) {
    state.isAuth = false,
    state.user = {
      _id: null,
      user_id: null,
      name: null,
      email: null,
      role: null,
    },
    state.accessToken = false
    console.log(state)
  }
}