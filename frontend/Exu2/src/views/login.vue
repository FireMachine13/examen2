<template>
    <div class="login-form">
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <button type="submit">Iniciar Sesión</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'; 
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'login',
    setup() {
      const email = ref('');
      const password = ref('');
      const error = ref('');
      const router = useRouter();
  
      const handleLogin = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/users');
          const users = response.data;
  
          const user = users.find(
            (user: { email: string }) => user.email === email.value
          );
  
          if (!user) {
            error.value = 'Usuario no encontrado';
            return;
          }
  
          if (user.admin) {
            router.push('/admin');
          } else {
            router.push('/products');
          }
        } catch (err) {
          error.value = 'Error al iniciar sesión. Intenta nuevamente';
          console.error(err);
        }
      };
  
      return {
        email,
        error,
        handleLogin,
      };
    },
  });
  </script>