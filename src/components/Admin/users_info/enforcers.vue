<template>
    <usersSidebar>
        <div class="text-secondary text-center">{{ success }}</div>
        <div class="text-danger">{{ error }}</div>
        <div class="mb-5 align-center w-50">
            <v-text-field
        v-model="searchQuery"
        color="primary"
        label="Search.."
        placeholder="Search Username...."
        type="text"
      ></v-text-field>
      <br>
      <v-btn class="mb-5" @click="showRegistration">Open/Close Enforcer Registraion Form</v-btn>
      <div v-if="registrationForm">
        <v-card
    class="mx-auto text-center registration" max-width="344"
    title="User Registration"
    >
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

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success" @click="enforcerRegistration">
          Complete Registration
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <br />
    </v-card>
      </div>
    </div>
        <div class="table-responsive">
            <table class="display table table-white" style="width:100%;">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Last Logged-in</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody v-for="enforcer in filteredEnforcers" :key="enforcer.id" >
                    <tr>
                        <td>{{ enforcer.id }}</td>
                        <td>{{ enforcer.username }}</td>
                        <td>{{ enforcer.lastloggedin }}</td>
                        <td>
                            <v-btn @click="removeEnforcer(enforcer)">Remove Enforcer</v-btn>
                        </td>
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
            const enforcers = ref([]);
            const searchQuery = ref('');
            const registrationForm = ref(false);
            const username = ref('');
            const password = ref('');
            const confirm_password = ref('');
            const error = ref(null);
            const success = ref(null);

            const getAllEnforcers = async ()=>{
                try{
                    const response = await AuthenticationService.getAllEnforcer();
                    if(response){
                        enforcers.value = response.data.allEnforcers
                    }else{
                        throw Error('Empty Users')
                    }

                }catch(err){
                    console.log(err)
                }
            }
            getAllEnforcers();


        
    const removeEnforcer = async (enforcer) =>{
        try{
            const response = await AuthenticationService.removeEnforcer({
                id:enforcer.id
            });
            if(response){
                success.value =response.data.msg;
            getAllEnforcers();

            }else{
                error.value =response.data.msg;

            }
        }catch(error){
            console.log(error)
        }
    }
    const showRegistration = async ()=>{
        registrationForm.value = !registrationForm.value;
    }
    const enforcerRegistration = async ()=>{
        if (password.value !== confirm_password.value) {
        error.value = "Password doesn't match";
      } else {
        try {
          const response = await AuthenticationService.enforcerRegistration({
            username:username.value,
            password:password.value
          });
          username.value = '';
          password.value = '';
          confirm_password.value = '';
          error.value = null;
          success.value = response.data.msg; // Set success message
          registrationForm.value = false;
          getAllEnforcers()
        } catch (err) {
          console.error(err);
          error.value = err.response.data.msg;
        }
      }
    }
    const filteredEnforcers = computed(() => {
    // Ensure users.value is defined before filtering
    if (enforcers.value) {
      return enforcers.value.filter(enforcer => {
        return enforcer.username.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
    } else {
      return []; // Return an empty array if users.value is undefined
    }
  });

            return{ enforcers,searchQuery,filteredEnforcers,removeEnforcer,registrationForm,showRegistration,username, password, confirm_password, error, success, enforcerRegistration }
        }
    }
    </script>