<template>
  <div class="login-container">
    <div class="login-card">
      <img src="@/assets/logo.png" alt="iPromise" class="logo" />
      <form @submit.prevent="login">
        <input v-model="username" type="text" placeholder="Имя пользователя или эл. адрес" required />
        <input v-model="password" type="password" placeholder="Пароль" required />
        <button class="btn" type="submit">Войти</button>
      </form>
      <div class="alternative-login">
        <div class="bridge">
          <hr class="line">
          <span>Или</span>
          <hr class="line">
        </div>
        <div class="enter">
          <span class>Войти через</span>
        </div>
        <div class="auth-buttons">
          <button class="sso-button" @click="loginWithGoogle">
            <img src="@/assets/google.png" alt="google">
            <span>Google</span>
          </button>
          <button class="sso-button" @click="loginWithFacebook">
            <img src="@/assets/facebook.png" alt="facebook">
            <span>Facebook</span>
          </button>
        </div>
      </div>
      <div class="additional-links">
        <div class="link"><span>Забыли пароль?</span><a href="/reset-password">Восстановить</a></div>
        <div class="link"><span>У вас ещё нет аккаунта?</span> <a href="/register">Зарегистрироваться</a></div>
      </div>
    </div>
  </div>
  <page-footer/>
</template>

<script>
import axios from 'axios';
import PageFooter from "@/components/PageFooter.vue";
import Footer from "@/components/PageFooter.vue";
export default {
  name: 'LoginPage',
  components: {PageFooter, Footer},
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          username: this.username,
          password: this.password
        });
        if (response.status === 200) {
          document.cookie = `token=${response.data.token};path=/`;
          console.log(response)
        }
      } catch (error) {
        console.error('Login failed', error);
      }
    },
    loginWithGoogle() {
    },
    loginWithFacebook() {
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  background-color: #d9edbf;
  font-family: Inter, sans-serif;
}

.login-card {
  width: 20%;
  text-align: center;
}

.logo {
  width: 200px;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 15px;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 600;
}

.btn {
  padding: 10px;
  background-color: #226F54;
  color: #fff;
  border: none;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.btn:hover {
  background-color: #185c45;
}

.alternative-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #828282;
}

.line {
  flex: 1;
  border: none;
  height: 10px;
  background-color: #828282;
}

.alternative-login span {
  font-size: 14px
}

.bridge{
  display: flex;
  align-items: center;
  text-align: center;
  margin: 15px;
}

.auth-buttons{
  margin: 15px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.sso-button{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 45px;
  border-radius: 7px;
  border: 1px solid #828282;
  background-color: #fff;
  color: #000000;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
}

.sso-button:hover{
  background-color: #000000;
  color: #fff;
}

.sso-button img{
  width: 30px;
  margin-right: 10px;
}

.additional-links{
  margin-top: 15px;
}

.link{
  display: flex;
  justify-content: center;
  font-size: 14px;
  align-items: center;
  color: #828282;
  padding: 10px 0;
}

.link span{
  padding-right: 5px;
}

.link a{
  color: #828282;
}

.link a:hover{
  color: #000000;
}
</style>
