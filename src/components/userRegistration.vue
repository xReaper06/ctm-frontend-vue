<template>
  <div>
    <v-card
    class="mx-auto text-center registration" max-width="344"
    title="User Registration"
    >
    <div class="success text-center">{{ success }}</div>
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
          type="password"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="confirm_password"
          color="primary"
          label="Confirm Password"
          placeholder="Enter Confirm Password"
          type="password"
          variant="underlined"
        ></v-text-field>
      </v-container>
      <div class="error">{{ error }}</div>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success" @click="userRegistration">
          <span v-if="!loading">Complete Registration</span>
      <span v-else>Loading...</span>
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <br />
      <div class="text-center pb-3">
        I already have an
        <v-btn color="black" to="/">account</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';
import { ref } from 'vue';

export default {
  name: 'UserRegistration', // PascalCase component name
  setup(){
    const username = ref('');
    const password = ref('');
    const confirm_password = ref('');
    const error = ref(null);
    const success = ref(null);
    const loading = ref(false)

    const userRegistration = async ()=>{
      loading.value = true;
      if (password.value !== confirm_password.value) {
        error.value = "Password doesn't match";
        loading.value = false;
      } else {
        try {
          if(username.value === '' || password.value === '' || confirm_password.value === ''){
            error.value = 'Empty Inputs';
        loading.value = false;
          }else{
            const data = new FormData();
            data.append('username', username.value);
            data.append('password', password.value);
            const response = await AuthenticationService.userRegistration({
              data
            });
            if(response){
              setTimeout(() => {
                username.value = '';
                password.value = '';
                confirm_password.value = '';
                error.value = null;
                success.value = response.data.msg; // Set success message
              },1000)
          loading.value = false;
            }
          }
        } catch (err) {
          console.error(err);
          error.value = err.response.data.msg;
        loading.value = false;
        }
      }
    }
    return { username, password, confirm_password, error, success, userRegistration }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
.registration {
  margin-top: 150px;
}
.success {
  color: green;
}
</style>
