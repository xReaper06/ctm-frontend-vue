<template>
    <dashboardSidebarVue>
        <div>
            <img :src="`http://localhost:8081/api/images/${license.front_pic}`" alt="Front Pic" width="100"
                        height="100">
                        <br/>
            <img :src="`http://localhost:8081/api/images/${license.back_pic} `" alt="back Pic" width="100"
                        height="100">
    
            <div>
                <div>
    
                </div>
            </div>
        </div>
    
        <div v-if="license.is_verified === 2 ? checkLicense : !checkLicense">
            <div>
                <v-btn @click="verifyingLicense(license)">Verify License</v-btn>
                <v-btn @click="denyingLicense(license)">Deny Verification</v-btn>
            </div>
        </div>
    </dashboardSidebarVue>
</template>

<script>
import dashboardSidebarVue from './tools/dashboardSidebar.vue';
import {ref} from 'vue'
import AuthenticationService from '@/services/AuthenticationService'
import router from '@/router/index'

export default {
    name:'adminViewLicense',
    props:['id'],
    components: {
        dashboardSidebarVue,
    },
    setup (props) {
        const license = ref('');
        const checkLicense = ref(false);
        const routes = router;
        console.log(props.id)
        const getlicensebyID = async()=>{
            try {
                const response = await AuthenticationService.getAllLicensebyID(props.id)
                console.log(response.data)
                if(response){
                    license.value = response.data.license;
                    console.log(license.value)
                }else{
                    console.log('Error Fetching')
                }
            } catch (error) {
                console.log(error);
            }
        }
        
        const verifyingLicense = async(license)=>{
            try{
                const response = await AuthenticationService.verifyLicense({
                    id:license.id,
                    user_id:license.user_id
                })
                if(response){
                    routes.push('/admin/adminVerifications')
                }else{
                    console.log(response.data.msg);
                }
            }catch(err){
                console.log(err)
            }
        }
        const denyingLicense = async(license)=>{
            try{
                const response = await AuthenticationService.denyVerification({
                    id:license.id,
                    user_id:license.user_id
                })
                if(response){
                    routes.push('/admin/adminVerifications')
                }else{
                    console.log(response.data.msg);
                }
            }catch(err){
                console.log(err)
            }
        }
        getlicensebyID();


        return { license,checkLicense,verifyingLicense,denyingLicense }
    }
}
</script>

<style lang="scss" scoped>

</style>