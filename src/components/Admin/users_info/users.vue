<template>
    <usersSidebar>
        <div class="mb-5 align-center w-50">
            <v-text-field
        v-model="searchQuery"
        color="primary"
        label="Search.."
        placeholder="Search Username...."
        type="text"
      ></v-text-field>
    </div>
        <div class="table-responsive">
            <table class="display table table-white" style="width:100%;">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Last Logged-in</th>
                    </tr>
                </thead>
                <tbody v-for="user in filteredUsers" :key="user.id" >
                    <tr>
                        <td>{{ user.id }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.lastloggedin }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </usersSidebar>
    </template>
    <script>
    import usersSidebar from '../tools/usersSidebar.vue';
    import AuthenticationService from '@/services/AuthenticationService';
    import { ref,computed } from 'vue';
    export default{
        name:'adminUsersInfo',
        components:{
            usersSidebar,
        },
        setup(){
            const users = ref([]);
            const searchQuery = ref('');

            const getAllUsers = async ()=>{
                try{
                    const response = await AuthenticationService.getAllUsers();
                    if(response){
                        users.value = response.data.allUsers
                    }else{
                        throw Error('Empty Users')
                    }

                }catch(err){
                    console.log(err)
                }
            }
            getAllUsers();


            const filteredUsers = computed(() => {
      return users.value.filter(user => {
        return user.username.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
    });

            return{ users,searchQuery,filteredUsers }
        }
    }
    </script>