<template>
  <ViolationSidebar>
    <div class="mb-5">
      <v-btn @click="InsertionColumnBtn">Add Violation</v-btn>
      <div v-if="insertionColumn" class="mb-5">
        <div class="text-secondary">{{ sccss }}</div>
        <div class="text-danger">{{ msg }}</div>
        <div class="container">
          <p class="text-center">Insert Violation</p>
          <v-row>
            <v-col cols="12" md="12" lg="4">
            <v-text-field v-model="code" label="Code" required></v-text-field>
          </v-col>
          
          <v-col cols="12" md="12" lg="4">
            <v-text-field v-model="name" label="Name" required></v-text-field>
          </v-col>
          <v-col cols="12" md="12" lg="4">
            <v-text-field v-model="fine" type="number" label="Fine" required></v-text-field>
          </v-col>
        </v-row>          
        <v-btn @click="saveViolation">Submit</v-btn>
      </div>
    </div>
        <div class="table-responsive">
          <table class="display table table-white" style="width:100%">
            <thead>
              <tr>
                <th scope="col">
                  <v-btn @click="sortBy('code')">Code</v-btn>
                </th>
                <th scope="col">
                  <v-btn @click="sortBy('name')">Name</v-btn>
                </th>
                <th scope="col">
                  <v-btn @click="sortBy('fine')">Fine</v-btn>
                </th>
                <th scope="col">
                  <v-btn @click="sortBy('status')">Status</v-btn>
                </th>
                <th scope="col">
                  <v-btn @click="sortBy('date_created')">Date Created</v-btn>
                </th>
                <th>
                  <v-btn @click="sortBy('date_updated')">Date Updated</v-btn>
                </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="violation in sortedData" :key="violation.id">
                  <td>{{ violation.code }}</td>
                  <td>{{ violation.name }}</td>
                  <td>{{ violation.fine }}</td>
                  <td>
                    <div v-if="!editStatus[violation.id]">
        <!-- Show the status as plain text when not in edit mode -->
        {{ violation.status }}
      </div>
      <div v-else>
        <!-- Show the status input field when in edit mode -->
        <v-text-field v-model="status" :label="violation.status" required></v-text-field>
        <button type="button" @click="updateStatus(violation)">Update</button>
      </div>
                  </td>
                  <td>{{ violation.date_created }}</td>
                  <td>{{ violation.date_updated }}</td>
                  <td>
                    <v-btn @click="editingStatus(violation)">Toggle Edit</v-btn>
                    <v-btn @click="removeViolation(violation)">Remove Violation</v-btn>
                  </td>
                </tr>

            </tbody>
          </table>
        </div>
    </div>
    
    <!-- Modal Body -->
    <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
    
  </ViolationSidebar>
</template>

<script>
import ViolationSidebar from '../tools/violationSidebar.vue';
import AuthenticationService from '@/services/AuthenticationService';
import { ref,computed } from 'vue';

export default {
  name: 'adminViolationList',
  components: {
    ViolationSidebar,
  },
  setup() {
    const violationLists = ref([])
    const insertionColumn = ref(false);
    const editStatus = ref({});
    const code = ref('');
    const name = ref('');
    const fine = ref('');
    const msg = ref('');
    const sccss = ref('');
    const status = ref('');
    const sortKey = ref('');
    const sortOrder = ref(1); 
    
const getAllViolationList = async ()=>{
      try {
        const response = await AuthenticationService.getAllViolationList();
        violationLists.value = response.data.violationList; // Assuming the data is an array of violations
      } catch (error) {
        console.error(error);
      }
    }
    getAllViolationList();
const sortBy = (key) => {
      if (key === sortKey.value) {
        sortOrder.value *= -1; // Toggle between ascending and descending
      } else {
        sortKey.value = key;
        sortOrder.value = 1; // Default to ascending
      }
    };

    const sortedData = computed(() => {
      return violationLists.value.slice().sort((a, b) => {
        const aValue = a[sortKey.value];
        const bValue = b[sortKey.value];
        if (aValue < bValue) return 1 * sortOrder.value;
        if (aValue > bValue) return -1 * sortOrder.value;
        return 0;
      });
    });

const updateStatus = async(violation)=>{
      console.log(violation.id)
      try{
        const response = await AuthenticationService.updateViolationStatus({
          id:violation.id,
          status:status.value
        })
        if(response){
          sccss.value = response.data.msg
          editStatus.value = false
          getAllViolationList();
        }else{
          msg.value = response.data.msg
        }
      }catch(error){
        console.log(error)
      }
    }
    const removeViolation = async(violation)=>{
      console.log(violation.id)
      try{
        const response = await AuthenticationService.deleteViolationList({
          id:violation.id,
        })
        if(response){
          sccss.value = response.data.msg
          getAllViolationList();
        }else{
          msg.value = response.data.msg
        }
      }catch(error){
        console.log(error)
      }
    }
    const InsertionColumnBtn = ()=>{
      insertionColumn.value = !insertionColumn.value
      console.log(insertionColumn.value)
    }
    const editingStatus = (violation)=>{
      if (editStatus.value[violation.id] === undefined) {
        editStatus.value[violation.id] = false;
      }
      editStatus.value[violation.id] = !editStatus.value[violation.id];

    }
    const saveViolation = async()=>{
      try{
        console.log(code.value)
        console.log(name.value)
        console.log(fine.value)
        const response = await AuthenticationService.insertViolations({
          code:code.value,
          name:name.value,
          fine:fine.value,
        });
        if(response){
          sccss.value = response.data.msg;
          code.value= '';
          name.value= '';
          fine.value= '';
          getAllViolationList();
        }else{
          msg.value = response.data.msg;
        }
      }catch(error){
        console.log(error)
      }
    } 

    
    return{
      sortedData, sortBy,insertionColumn,code,name,
      fine, InsertionColumnBtn,msg,sccss,status,saveViolation,editStatus,
      editingStatus,updateStatus,removeViolation}
  }
};
</script>
