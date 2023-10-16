<template>
  <adminNav></adminNav>
<v-card>
<v-app style="width: 100%; height: 100%;">
<!-- Use the mini-variant property to make the sidebar shrinkable -->
<v-navigation-drawer v-model="drawer" app permanent>
  <v-list dense nav>
    <v-divider></v-divider>
    <v-list-item
    prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
    :title="name"
    nav
  >
  </v-list-item>
    <v-list-item prepend-icon="mdi-cogs" @click="openSettings">
      Settings
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item prepend-icon="mdi-account" to="/admin/adminEnforcersInfo" title="enforcers" value="ENFORCERS"></v-list-item>
      <v-list-item prepend-icon="mdi-account" to="/admin/adminUsersInfo" title="users" value="USERS"></v-list-item>
    </v-list>
  <!-- Add a button to toggle the sidebar -->
</v-navigation-drawer>
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
import adminNav from './adminNav'
import { ref,onMounted } from 'vue';
export default {
name:'dashboardSidebar',
components:{
  adminNav,
},
setup(){
const drawer = ref(true);

const user = ref('')
      const name = ref('')
      const username = ref('')
    
    const userName = async ()=>{
        user.value = localStorage.getItem('user');
        username.value = JSON.parse(user.value)
        return name.value = username.value.username;
  }

onMounted(() => {
userName();
});
console.log(name.value)
return{
  drawer,
  name
}
}    
}
</script>
      