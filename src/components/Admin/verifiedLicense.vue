<template>
    <dashboardSidebarVue>
        
        <router-link to="/admin/adminVerifications">
      <v-btn>
        Not Yet verified
      </v-btn>
        </router-link>
        <div class="table-responsive mt-4">
            <div>
                <table id="myDataTable" class="table-responsive table table-light">
                    <thead>
                        <tr>
                            <th scope="col">USER ID</th>
                            <th scope="col">License Number</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Middle Name</th>
                            <th scope="col">Street/Sitio</th>
                            <th scope="col">Baranggay</th>
                            <th scope="col">City</th>
                            <th scope="col">Province</th>
                        </tr>
                    </thead>
                    <tbody v-for="license in licenses" :key="license.id">
                        <tr>
                            <td>
                                    <router-link :to="{ name: 'adminViewLicense', props: { id: license.id }, params:{ id:license.id } }">
                                        {{ license.user_id }}
                                    </router-link>
                                </td>
                                <td>{{ license.license_no }}</td>
                                <td>{{ license.first_name }}</td>
                                <td>{{ license.last_name }}</td>
                                <td>{{ license.middle_name }}</td>
                                <td>{{ license.street }}</td>
                                <td>{{ license.baranggay }}</td>
                                <td>{{ license.city }}</td>
                                <td>{{ license.province }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </dashboardSidebarVue>
</template>
<script>
import dashboardSidebarVue from './tools/dashboardSidebar.vue';
import { useAuthStore } from "@/store/index";
import AuthenticationService from '@/services/AuthenticationService';
import { ref} from "vue";

export default {
    name: 'adminVerified',
    components: {
        dashboardSidebarVue,
    },
    setup() {
        const licenses = ref('')
        const msg = ref(null)
        const error = ref(null)

        const Verified = async () => {
            const authStore = useAuthStore();
            try {
                const response = await AuthenticationService.getAllLicenseVerified();
                licenses.value = response.data.licenses;
                // Assuming allLicense is an array of licenses, you can loop through them
                // and push each license individually into the licenses array
                authStore.setLicenseVerified(licenses.value);
            } catch (err) {
                console.error(err);
            }
        };
        Verified();
        return {
            licenses,
            msg,
            error,
        }
    }
}
</script>