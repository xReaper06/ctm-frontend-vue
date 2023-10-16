import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/index.js'
import Login from '../components/Login.vue'
import userRegistration from '../components/userRegistration.vue'
import userDashboard from "../components/User/dashboard.vue"
import userVerificationLicense from "../components/User/myLicense.vue"
import adminDashboard from "../components/Admin/adminDashboard.vue"
import adminVerified from "../components/Admin/verifiedLicense.vue"
import adminVerifications from "../components/Admin/verifications.vue"
import adminViewLicense from "../components/Admin/viewLicense.vue"
import adminViolators from "../components/Admin/violations/violators.vue"
import adminViolationList from "../components/Admin/violations/violation_list.vue"
import adminUsersInfo from "../components/Admin/users_info/users.vue"
import adminEnforcersInfo from "../components/Admin/users_info/enforcers.vue"
import enforcerDashboard from "../components/Enforcer/dashboard.vue";
import enforcerMenu from "../components/Enforcer/tools/menu.vue";
import normalCitation from '../components/Enforcer/citations/normalCitation.vue'
import impoundedCitation from '../components/Enforcer/citations/impoundCitations.vue'


const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path:'/userRegistration',
    name:'userRegistration',
    component: userRegistration
  },
  {
    path:'/user/dashboard',
    name:'userDashboard',
    component: userDashboard,
    meta: { requiresAuth: true }, 
  },
  {
    path:'/user/myLicense',
    name:'myLicense',
    component: userVerificationLicense,
    meta: { requiresAuth: true }, 

  },
  {
    path:'/admin/adminVerifications',
    name:'adminVerifications',
    component: adminVerifications,
    meta: { requiresAuth: true }, 

  },
  {
    path:'/admin/adminVerification/:id',
    name:'adminViewLicense',
    component: adminViewLicense,
    props:true,
    params:true,
    meta: { requiresAuth: true }, 

  },
  {
    path:'/admin/adminVerified',
    name:'adminVerified',
    component: adminVerified,
    meta: { requiresAuth: true }, 

  },
  {
    path:'/admin/adminDashboard',
    name:'adminDashboard',
    component: adminDashboard,
    meta: { requiresAuth: true }, 
  },
  {
    path:'/admin/adminViolators',
    name:'adminViolators',
    component: adminViolators,
    meta: { requiresAuth: true }, 

  },
  {
    path:'/admin/adminViolationList',
    name:'adminViolationList',
    component: adminViolationList,
    meta: { requiresAuth: true }, 

  },
  {
    path:'/admin/adminUsersInfo',
    name:'adminUsersInfo',
    component: adminUsersInfo,
    meta: { requiresAuth: true }, 

  },
  {
    path:'/admin/adminEnforcersInfo',
    name:'adminEnforcersInfo',
    component: adminEnforcersInfo,
    meta: { requiresAuth: true }, 

  },
  {
    path:'/enforcer/enforcerDashboard',
    name:'enforcerDashboard',
    component: enforcerDashboard,
    meta: { requiresAuth: true },
  },
  {
    path:'/enforcer/menu',
    name:'enforcerMenu',
    component: enforcerMenu,
    meta: { requiresAuth: true },
  },
  {
    path:'/enforcer/normalCitation',
    name:'normalCitation',
    component: normalCitation,
    meta: { requiresAuth: true },
  },
  {
    path:'/enforcer/impoundedCitation',
    name:'impoundedCitation',
    component: impoundedCitation,
    meta: { requiresAuth: true },
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to the login page or handle unauthorized access
    next('/');
  } else {
    next();
  }
});


export default router
