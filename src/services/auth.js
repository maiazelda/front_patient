import {
    UserManager,
    WebStorageStateStore
  } from "oidc-client"
  const settings = {
    authority: `${process.env.VUE_APP_AUTH_BACKEND}`,
    userStore: new WebStorageStateStore({
      store: window.localStorage
    }),
    client_id: `${process.env.VUE_APP_AUTH_ID}`,
    client_secret: `${process.env.VUE_APP_AUTH_SECRET}`,
    redirect_uri: `${process.env.VUE_APP_AUTH_LOGIN_CALLBACK}`,
    post_logout_redirect_uri: `${process.env.VUE_APP_AUTH_LOGOUT_CALLBACK}`,
    response_type: "code",
    scope: "openid profile email",
    filterProtocolClaims: true,
    loadUserInfo: true,
    metadata: {
      issuer: `${process.env.VUE_APP_AUTH_ISSUER}`,
      token_endpoint: `${process.env.VUE_APP_AUTH_BACKEND}/oauth2/token`,
      userinfo_endpoint: `${process.env.VUE_APP_AUTH_BACKEND}/oauth2/userInfo`,
      authorization_endpoint: `${process.env.VUE_APP_AUTH_BACKEND}/oauth2/authorize`,
      end_session_endpoint: `${process.env.VUE_APP_AUTH_BACKEND}/logout?client_id=${process.env.VUE_APP_AUTH_ID}&logout_uri=${process.env.VUE_APP_AUTH_LOGOUT_CALLBACK}`,
      jwks_uri: `${process.env.VUE_APP_AUTH_ISSUER}/.well-known/jwks.json`
    }
  }
  export default {
    instance: new UserManager(settings),
    getUser() {
      return this.instance.getUser()
    },
    async isLoggedIn() {
      const user = await this.getUser()
      return (user !== null && !user.expired)
    }
  }