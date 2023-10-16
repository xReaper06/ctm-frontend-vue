<template>
     <UserNav>
      <h1>Hello World</h1>
     </UserNav>
</template>
  
  <script>
import AuthenticationService from '@/services/AuthenticationService'
import { useAuthStore } from '@/store/index.js';
import UserNav from './tools/userNav.vue'
import { ref } from 'vue';


export default {
  name: 'userDashboard',
  components:{
    UserNav
  },
  setup(){
    const user = ref('')
    const id = ref('')
    user.value = localStorage.getItem('user');
    const getMyLicense = async ()=>{
      const authStore = useAuthStore();
      id.value = JSON.parse(user.value)
      const response = await AuthenticationService.getMyLicense({id:id.value.id})
      const myLicense = response.data.myLicense
      authStore.setMyLicense(myLicense);
    }
    const notifications = async ()=>{
      const authStore = useAuthStore();
      id.value = JSON.parse(user.value)
      const response = await AuthenticationService.notifications({id:id.value.id})
      const notifications = response.data.notification
      authStore.setNotifications(notifications);
    }
    getMyLicense();
    notifications();
  }
};
</script>