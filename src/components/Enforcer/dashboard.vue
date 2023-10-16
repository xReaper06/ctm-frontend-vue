<template>
    <div>
        <appbarVue/>
        <v-main>
            <v-container>
               <div>
                <v-text-field
            v-model="search"
            label="Search"
            @input="performSearch"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
               </div>
               <ul>
              <li v-for="(result, index) in searchResults" :key="index">
                {{ result }}
              </li>
            </ul>
            <div>
                <v-btn @click="showButtons">add Violators</v-btn>
            </div>
            <div v-if="show">
                <v-btn to="/enforcer/normalCitation">Normal Citation</v-btn>
                <v-btn to="/enforcer/impoundedCitation">Impound</v-btn>
            </div>
            </v-container>
        </v-main>
        <enfoNav class="fixed-bottom"/>
    </div>
</template>

<script>
import appbarVue from './tools/appbar.vue';
import enfoNav from './tools/navigationEnforcer.vue';
import AuthenticationServices from '@/services/AuthenticationService'
import { ref,onMounted } from 'vue'
export default {
    name:'enforcerDashboard',
    components:{appbarVue,enfoNav},
    setup () {
        const search = ref('')
        const searchResults = ref([]);
        const violators = ref([]);
        const show = ref(false);

        const getViolators = async()=>{
            try{
                const response = await AuthenticationServices.getAllViolators()
                if(response){
                    violators.value = response.data.violators;
                }
            }catch(error){
                console.log(error)
            }
        }
        onMounted(()=>{
            getViolators();
        })

        const performSearch = async ()=>{
            searchResults.value = violators.value.filter(item =>
            item.license_id.toLowerCase().includes(search.value.toLowerCase()))
        }
        const showButtons = async ()=>{
            show.value = !show.value;
        }


        return {search,searchResults,performSearch,show,showButtons}
    }
}
</script>

<style lang="scss" scoped>

</style>