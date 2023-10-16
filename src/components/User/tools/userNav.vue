<template>
  <v-card>
    <v-app style="width: 100%; height: 100%;">
      <!-- Use the mini-variant property to make the sidebar shrinkable -->
      <v-navigation-drawer v-model="drawer" app :mini-variant="mini">
        <v-list dense nav>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-cogs" @click="openSettings">
            Settings
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-home-city" to="/user/dashboard">Home</v-list-item>
          <v-list-item prepend-icon="mdi-license" to="/user/myLicense">My License</v-list-item>
          <v-list-item prepend-icon="mdi-alert" to="/user/violation">Violation</v-list-item>
            <v-list-item prepend-icon="mdi-power" @click="logout">Log Out</v-list-item>
        </v-list>
        <!-- Add a button to toggle the sidebar -->
      </v-navigation-drawer>

      <v-app-bar app>
        <v-btn icon @click="toggleSidebar">
          <v-icon>{{ mini ? 'mdi-menu' : 'mdi-chevron-left' }}</v-icon>
        </v-btn>
        <h2>CTMS Violation Viewing System</h2>
        <div class="ml-auto d-flex justify-content-end inline-block">
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/70.jpg"
            :title="name"
            nav
          >
          </v-list-item>
        </div>
      </v-app-bar>

      <v-main>
        <v-container>
          <!-- Your main content here -->
          <!-- Content will automatically adjust to different screen sizes -->
          <slot></slot>
        </v-container>
      </v-main>
    </v-app>
  </v-card>
</template>

<script>
import { ref, onMounted } from 'vue';
import router from '@/router/index'
import { useAuthStore } from '@/store';
import AuthenticationService from '@/services/AuthenticationService';

export default {
  name: 'UserNav',
  setup() {
    const drawer = ref(true);
    const mini = ref(false);
    const routes = router
    const name = ref('')
    
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

    const toggleSidebar = () => {
      mini.value = !mini.value; // Toggle between true and false
      drawer.value = !drawer.value
    };

    return {
      drawer,
      mini,
      name,
      openSettings,
      logout,
      toggleSidebar,
    };
  },
};
</script>
