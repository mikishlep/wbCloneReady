<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Вход</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Имя пользователя:</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button type="submit">Войти</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      error: '',
      // Заранее заданные пользователи
      users: [
        { username: 'wbAdmin', password: 'w5j9_2Rd7G' },
        { username: 'wbUser', password: 'QtLWo5_ONg' }
      ]
    };
  },
  methods: {
    // Функция генерации случайного токена
    generateToken() {
      return Math.random().toString(36).substr(2) + Date.now().toString(36);
    },
    login() {
      const foundUser = this.users.find(
          user => user.username === this.username && user.password === this.password
      );
      if (foundUser) {
        // Генерируем новый токен
        const token = this.generateToken();
        // Вычисляем время истечения (текущая дата + 24 часа)
        const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
        // Сохраняем токен, имя пользователя и время истечения в localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('username', foundUser.username);
        localStorage.setItem('token_expiration', expirationTime);
        // Перенаправляем на защищённую страницу
        this.$router.push('/');
      } else {
        this.error = 'Неверный логин или пароль';
      }
    }
  }
};
</script>

<style scoped>
/* Стили остаются без изменений */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f2f5;
  padding: 20px;
}

.login-form {
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.login-form h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #6c11c9;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

.error {
  margin-top: 15px;
  text-align: center;
  color: red;
}
</style>