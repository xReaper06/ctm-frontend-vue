<template>
  <v-card
    class="mx-auto registration text-center" max-width="344"
    title="User Login"
    >
    <v-form @submit.prevent="handleLogin">

      <v-container>
        <v-text-field
        v-model="username"
        color="primary"
        label="Username"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        color="primary"
        label="Password"
        placeholder="Enter your password"
        variant="underlined"
        type="password"
      ></v-text-field>
    </v-container> 
    <div class="text-danger">{{ error }}</div>
    
    <v-divider></v-divider>
    
    <v-card-actions>
      <v-spacer></v-spacer>
      
      <v-btn class="text-center" type="submit" color="success" :disabled="loading">
      <span v-if="!loading">Log in</span>
      <span v-else>Loading...</span>
      <v-icon icon="mdi-chevron-right" end></v-icon>
    </v-btn>
    </v-card-actions>
  </v-form>
    <div class="pb-3">
      <v-btn text to="/userRegistration">Register Account</v-btn>
    </div>
  </v-card>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService';
  import router from '../router/index'
  import { useAuthStore } from '@/store/index.js';
  import { ref } from 'vue';
export default {
  name: 'HelloWorld',
  setup(){
    const username = ref('')
    const password = ref('')
    const error = ref(null)
    const loading = ref(false)
    const routes = router;

    const handleLogin = async()=>{
      if (username.value !== '' && password.value !== '') {
          loading.value = true;

    // Simulate an asynchronous login operation (replace this with your actual login logic)
    try {
      const response = await AuthenticationService.login({
        username: username.value,
        password: password.value,
      });
    setTimeout(() => {
      // Assuming the login operation is complete
      loading.value = false; // Reset loading to false

      // Handle login logic here
      const authStore = useAuthStore()
      // Set the user and token
      authStore.setUser(response.data.user); // Assuming the user data is in response.data.user
      console.log(response.data.user)
      authStore.setTokens(response.data.accessToken, response.data.refreshToken)
      if(response.data.user.user_role == 'user'){
        routes.push('/user/dashboard');
      }else if(response.data.user.user_role == 'enforcer'){
        routes.push('/enforcer/enforcerDashboard');
      }else if(response.data.user.user_role == 'admin'){
        routes.push('/admin/adminDashboard')
      }else{
        error.value = 'This User Is not Registered'
      loading.value = false; // Reset loading to false
      }
    }, 1000);
          } catch (err) {
            error.value = err.response.data.msg;
            loading.value = false; // Reset loading to false
          }
      }
    }
    return { username, password, error, loading, handleLogin }
  }
}
</script>
