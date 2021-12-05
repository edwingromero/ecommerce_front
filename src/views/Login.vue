<template>
  <div class="text-center">
    <form @submit.prevent="autenticar" class="form-signin">
      <h1 class="h3 mt-5 mb-3 font-weight-normal">Iniciar Sesión</h1>
      <label for="inputEmail" class="sr-only">Email</label>
      <input type="email" id="inputEmail" v-model="form.email" class="form-control mb-4" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Contrasena</label>
      <input type="password" id="inputPassword" v-model="form.password" class="form-control mb-4" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Ingresar</button>
    </form>
  </div>
</template>

<script>

import { mapState, mapMutations  } from 'vuex'
export default {
  data() {
    return {
      form:{
        email:'admin@ecommerce.com',
        password:'12345678'
      }
    }
  },
  computed: {
    ...mapState(['user','token'])
  },
  methods: {
    ...mapMutations(['setToken','setUser']),
    autenticar(){
      let vue = this;
      vue.axios.post('login',vue.form)
      .then(res => {
        vue.axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.access_token;
        vue.setToken(res.data)
        vue.getPerfil()
      })
      .catch(err => {
        console.error(err); 
      })
    },
    getPerfil(){
      let vue = this;
      vue.axios.post('auth/me')
      .then(res => {
        vue.setUser(res.data);
        this.$router.push({path: '/auth/cursos'})
      })
      .catch(err => {
        console.error(err); 
      })
    }
  },
}
</script>

<style lang="css" scoped>
  html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>