<template>
    <div>
        <h1>Menu</h1>
        <v-list>
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/men/70.jpg"
                :title="name"
                nav
              >
              </v-list-item>
              <v-divider></v-divider>
          <v-list-item mb-5 prepend-icon="mdi-cogs" @click="openSettings">
            Settings
          </v-list-item>
          <v-list-item mt-5 prepend-icon="mdi-power" @click="logout">Log Out</v-list-item>
        </v-list>
    </div>
    <enfoNav class="fixed-bottom"/>
</template>
<script>
import enfoNav from './navigationEnforcer.vue';
import { useAuthStore } from '@/store';
import { ref,onMounted } from 'vue'
import router from '@/router/index'
import AuthenticationService from '@/services/AuthenticationService';
export default {
    name:'enforcerMenu',
    components:{enfoNav},
    setup () {
        const name = ref('')
    const routes = router
    
    const userName = async ()=>{
        const authStore = useAuthStore();
        name.value = authStore.user.username;
  }

    onMounted(() => {
      userName();
    });
    const openSettings = () => {
      console.log('Settings clicked');
    };
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
        return {openSettings,name,logout}
    }
}
</script>

<style lang="scss" scoped>

</style>