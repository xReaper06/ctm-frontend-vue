<template>
    <div>
      <v-app-bar app color="warning" dark>
  <v-container>
    <v-toolbar-title>
      <router-link to="/admin/adminDashboard" class="text-decoration-none white--text">
        HelloWorld
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="d-flex justify-center">
    <v-btn text to="/admin/adminDashboard">Home</v-btn>
    <v-btn text to="/admin/adminUsersInfo">USERS</v-btn>
    <v-btn text to="/admin/adminViolationList">VIOLATION</v-btn>
    <v-btn class="bg-light text-dark ms-5" text @click="logout">Log out</v-btn>
    </div>
  </v-container>
</v-app-bar>

 </div>
</template>
<script>
  import { useAuthStore } from '@/store';
  import router from '@/router/index'
  import { ref } from "vue";
import AuthenticationService from '@/services/AuthenticationService';
export default{
    name:'adminNav',
    setup() {
      const routes = router;
      const user = ref('')
      const id = ref('')

      const logout = async ()=>{
      try{  
          const authStore = useAuthStore();
          user.value = localStorage.getItem('user')
          id.value = JSON.parse(user.value)
          const response = await AuthenticationService.logout({id:id.value.id});
          if(!response){
            console.log('Cannot Logout');
          }
          authStore.logOut()
          routes.push('/')
      }catch(err){
          console.error('Error Logout')
      }
  }
      return { logout}
    }
}
</script>