import Api from '@/services/Api'
import Auth from '@/services/Auth'

export default{
    //auth
    userRegistration(credentials){
        return Auth().post('/userRegistration',credentials)
    },
    login(credentials){
        return Auth().post('/login',credentials)
    },
    logout(id){
        console.log(id)
        return Auth().post(`/logout`,id);
    },

    //main
    verifyLicense(credentials){
        return Api().post('/verifyLicense',credentials)
    },
    denyVerification(credentials){
        return Api().post('/denyVerification',credentials)
    },
    getMyLicense(user_id){
        return Api().get(`/getMyLicense/${user_id}`)
    },
    notifications(user_id){
        return Api().get(`/notifications/${user_id}`)
    },
    getAllLicenseVerified(){
        return Api().get('/getAllLicenseVerified')
    },
    getAllLicenseNotYetVerified(){
        return Api().get('/getAllLicenseNotYetVerified')
    },
    getAllViolationList(){
        return Api().get('/getAllViolationList')
    },
    insertViolations(credentials){
        return Api().post('/insertViolations',credentials)
    },
    updateViolationStatus(credentials){
        return Api().post('/updateViolationStatus',credentials)
    },
    deleteViolationList(credentials){
        return Api().post('/deleteViolationList',credentials)
    },
    enforcerRegistration(credentials){
        return Api().post('/enforcerRegistration',credentials)
    },
    removeEnforcer(credentials){
        return Api().post('/removeEnforcer',credentials)
    },
    getAllUsers(){
        return Api().get('/getAllUsers')
    },
    getAllEnforcer(){
        return Api().get('/getAllEnforcers')
    },
    getAllLicensebyID(id){
        return Api().get(`/getAllLicensebyID/${id}`)
    },
    getAllViolators(){
        return Api().get('/getAllViolators')
    }
    
}