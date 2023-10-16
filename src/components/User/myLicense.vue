<template>
  <UserNav>
    <v-container v-if="checkifVerified() === 2">
      <strong class="text-center"><h1>Verified</h1></strong>
<v-progress-linear model-value="100"></v-progress-linear>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="'http://localhost:8081/api/images/'+myLicense.front_pic"
      height="200px"
      cover
    ></v-img>

    <v-card-title>
      {{ formattedName() }}
    </v-card-title>

    <v-card-subtitle>

     My License Number: {{ myLicense.license_no}}
      <br>
      Verified
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        variant="text"
      >
        Explore
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>


    </v-container>
    <v-container v-else-if="checkifVerified() === 1">
      <strong><h1>Not Yet Verified</h1></strong>
<v-progress-linear model-value="50" class="h-20"></v-progress-linear>

    </v-container>
      <v-container v-else>
        <div class="text-center"><h1>License Verification</h1></div>
        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <v-spacer></v-spacer>
        
        <v-row>
          <!-- Front Picture Input -->
          <v-col cols="12" md="6" lg="4">
            <v-file-input label="Front Picture" variant="solo-filled" accept="image/jpeg, image/jpg, image/png" @change="handleFrontPicChange"></v-file-input>
          </v-col>
          
          <!-- Back Picture Input -->
          <v-col cols="12" md="6" lg="4">
            <v-file-input label="Back Picture" variant="solo-filled" accept="image/jpeg, image/jpg, image/png" @change="handleBackPicChange"></v-file-input>
          </v-col>
          
          <!-- License Number Input -->
          <v-col cols="12" md="12" lg="4">
            <v-text-field v-model="license_no" label="License Number" required hide-details></v-text-field>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
      <v-row>
        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <v-text-field
            v-model="expiration_date"
            label="Expiration Date"
            required
            hide-details
            type="date"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <v-text-field
            v-model="agency_code"
            label="Agency Code"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <v-text-field
            v-model="blood_type"
            label="Blood Type"
            hide-details
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-row>
        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <v-text-field
            v-model="eye_color"
            label="Eye Color"
            required
            hide-details
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
          lg="4"
        >
        <v-select
  label="Restriction"
  v-model="restrictions"
  :items="[1, 2, 3, 4, 5]"
></v-select>
        </v-col>

        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <v-text-field
            v-model="conditions"
            label="Conditions"
            hide-details
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-row>
        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <v-text-field
            v-model="first_name"
            label="First Name"
            required
            hide-details
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <v-text-field
            v-model="last_name"
            label="Last Name"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <v-text-field
            v-model="middle_name"
            label="Middle Name"
            hide-details
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-row>
        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <v-text-field
            v-model="nationality"
            label="Nationality"
            required
            hide-details
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
          lg="4"
        >
        <v-select
  label="Sex"
  v-model="sex"
  :items="['Male','Female']"
></v-select>
        </v-col>

        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <v-text-field
            v-model="date_of_birth"
            label="Date of Birth"
            hide-details
            required
            type="date"
          ></v-text-field>
        </v-col>
      </v-row>
              <v-spacer></v-spacer>
      <v-row>
        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <v-text-field
            v-model="weight"
            label="Weight"
            required
            hide-details
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <v-text-field
            v-model="height"
            label="Height"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <v-text-field
            v-model="street"
            label="Street/Sitio"
            hide-details
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-row>
        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <v-text-field
            v-model="baranggay"
            label="Baranggay"
            required
            hide-details
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <v-text-field
            v-model="city"
            label="City"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
          lg="4"
        >
          <v-text-field
            v-model="province"
            label="Province"
            hide-details
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>

        <v-spacer></v-spacer>

        <!-- Submit Button -->
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn class="success"  @click="verifyLicense">Submit</v-btn>
          </v-col>
        </v-row>
        
      </v-container>
  </UserNav>
</template>
 
 <script>
import AuthenticationService from '@/services/AuthenticationService'
import { useAuthStore } from '@/store/index.js';
import UserNav from './tools/userNav.vue'
import { ref } from 'vue';

export default {
 name: 'myLicense',
 components:{
   UserNav
 },
 setup(){

     const front_pic = ref(null)
     const back_pic = ref(null)
     const license_no = ref('')
     const expiration_date = ref('')
     const agency_code = ref('')
     const blood_type = ref('')
     const eye_color = ref('')
     const restrictions = ref('')
     const conditions = ref('')
     const first_name = ref('')
     const last_name = ref('')
     const middle_name = ref('')
     const nationality = ref('')
     const sex = ref('')
     const date_of_birth = ref('')
     const weight = ref('')
     const height = ref('')
     const street = ref('')
     const baranggay = ref('')
     const city = ref('')
     const province = ref('')
     const success = ref(null)
     const error = ref(null)
     const myLicense = ref('')
     const show = ref(true)


     const handleFrontPicChange = (event)=>{
      const selectedFile = event.target.files[0];

    // Store it in your component's data
    front_pic.value = selectedFile;
     }

     const handleBackPicChange = (event)=>{
      const selectedFile = event.target.files[0];

    // Store it in your component's data
    back_pic.value = selectedFile;
     }

     const verifyLicense = async()=>{
      try {
           const authStore = useAuthStore();
           const user_id = authStore.user.id
           let formdata = new FormData();
           formdata.append('user_id',user_id)
           formdata.append('front_pic',front_pic.value)
           formdata.append('back_pic',back_pic.value)
           formdata.append('license_no',license_no.value)
           formdata.append('expiration_date',expiration_date.value)
           formdata.append('agency_code',agency_code.value)
           formdata.append('blood_type',blood_type.value)
           formdata.append('eye_color',eye_color.value)
           formdata.append('restrictions',restrictions.value)
           formdata.append('conditions',conditions.value)
           formdata.append('first_name',first_name.value)
           formdata.append('last_name',last_name.value)
           formdata.append('middle_name',middle_name.value)
           formdata.append('nationality',nationality.value)
           formdata.append('sex',sex.value)
           formdata.append('date_of_birth',date_of_birth.value)
           formdata.append('weight',weight.value)
           formdata.append('height',height.value)
           formdata.append('street',street.value)
           formdata.append('baranggay',baranggay.value)
           formdata.append('city',city.value)
           formdata.append('province',province.value)
        const response = await AuthenticationService.verifyLicense(formdata)
        success.value = response.data.msg
        this.$router.push('/user/dashboard');
    } catch (err) {
        error.value = err.response.data.msg
    }
  }
  const formattedName = ()=>{
    const authStore = useAuthStore();
      if(authStore.myLicense == ''){
        return '';
      }else{
        let Name = authStore.myLicense;
        const fullName = Name.last_name+' '+ Name.first_name+' ' +Name.middle_name.toUpperCase();
        return fullName;
      }
  }
  const checkifVerified = ()=>{
     const authStore = useAuthStore();
     if(authStore.myLicense==''){
      return '';
     }else if(authStore.myLicense!=''&& authStore.myLicense.is_verified == 1){
      return 1;
     }else if (authStore.myLicense!=''&& authStore.myLicense.is_verified == 2)
     return 2;
  }
  const getmyLicense = async ()=>{
    const authStore = useAuthStore();
    myLicense.value = authStore.myLicense 
  }
  getmyLicense();

  return { front_pic,
     back_pic,
     license_no,
     expiration_date,
     agency_code,
     blood_type,
     eye_color,
     restrictions,
     conditions,
     first_name,
     last_name,
     middle_name,
     nationality,
     sex,
     date_of_birth,
     weight,
     height,
     street,
     baranggay,
     city,
     province,
     success,
     error,
     myLicense,
     show,
     handleFrontPicChange,
     handleBackPicChange,
     verifyLicense,
     formattedName,
     checkifVerified,
}
 }
};
</script>