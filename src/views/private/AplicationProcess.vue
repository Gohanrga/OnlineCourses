<template>
    <q-stepper
        v-model="stepEnroll"
        ref="stepper"
        color="primary"
        animated
        class="stepper"
    >
        <q-step
            :name="1"
            title="Personal Information"
            prefix="1"
            :done="stepEnroll > 1"
        >
            <q-form
                class="q-gutter-md"
                @submit="next()"
            >
                <div class="row justify evenly">
                    <div class="col-md-12 header-secction fit column content-stretch" >
                        <span>Start: {{course.start}} | Graduation: {{course.end}}</span>
                    </div>
                    <div class="col-md-12 title-seccion fit column content-stretch q-mt-md" >
                        <h6>Personal Details</h6>
                        <span>Have questions about the applications? Want some more info? Call us! 65170024</span>
                    </div>
                    <div class="col-md-6 q-mt-md" >
                        <q-input outlined 
                                dense 
                                stack-label 
                                placeholder="Enter your date of birth" 
                                label="Date of birth" 
                                mask="date"
                                :rules="[rules.required, 'date']"
                                v-model="personDetail.dateBirth"
                            >
                            <template v-slot:append>
                                <q-icon name="mdi-calendar" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="personDetail.dateBirth">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                    </q-date>
                                </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>

                    </div>
                    <div class="col-md-6 q-mt-md" >
                        <q-input outlined 
                                dense 
                                stack-label 
                                placeholder="Enter your Gender" 
                                label="Gender" 
                                :rules="[rules.required]"
                                v-model="personDetail.gender"
                            >
                            <template v-slot:append>
                                <q-icon name="mdi-close"  class="cursor-pointer" />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-md-12 q-mt-md" >
                        <q-input outlined 
                                dense 
                                stack-label 
                                placeholder="Enter your Address" 
                                label="Address" 
                                :rules="[rules.required]"    
                                v-model="personDetail.address"
                            >
                            <template v-slot:append>
                                <q-icon name="mdi-close"  class="cursor-pointer" />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-md-12 q-mt-md" >
                        <q-input outlined 
                                dense 
                                stack-label 
                                placeholder="Phone Number" 
                                label="Phone Number" 
                                :rules="[rules.required]"
                                v-model="personDetail.phoneNumber"
                            >
                            <template v-slot:append>
                                <q-icon name="mdi-close"  class="cursor-pointer" />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-md-6 q-mt-md" >
                        <q-input outlined 
                                dense 
                                stack-label 
                                placeholder="Preferred Language" 
                                label="Preferred Language" 
                                :rules="[rules.required]"
                                v-model="personDetail.preferredLanguage"
                            >
                            <template v-slot:append>
                                <q-icon name="mdi-close"  class="cursor-pointer" />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-md-6 q-mt-md" >
                        <q-select 
                            use-input
                            input-debounce="0"
                            outlined
                            dense 
                            stack-label 
                            label="Education "
                            placeholder="Education Level"
                            :options="educationLevel"
                            v-model="personDetail.educationLevel"
                        >
                        </q-select>
                    </div>
                </div>
                <q-separator class="q-mt-lg"/> 
                <div class="row justify-between">
                    <q-btn unelevated rounded no-caps  color="primary" @click="closeDialog()" label="Back" />
                    <q-btn unelevated rounded no-caps  color="primary" type="submit" label="Next" />
                </div>
            </q-form>
             
        </q-step>

        <q-step
            :name="2"
            prefix="2"
            title="Payment plan"
            :done="stepEnroll > 2"
        >
            <q-form
                class="q-gutter-md"
            >
                <div class="row justify evenly">
                    <div class="col-md-12 header-secction fit column content-stretch" >
                        <span>Start: {{course.start}} | Graduation: {{course.end}}</span>
                    </div>
                    <div class="col-md-12 title-seccion fit column content-stretch q-mt-md" >
                        <h6>Personal Details</h6>
                        <span>Have questions about the applications? Want some more info? Call us! 65170024</span>
                    </div>
                    <div class="col-md-6 q-mt-md" v-for="pay in course.payment" :key="pay.codeType" @click="selectpayment(pay.id)" >
                        <CardPayment :paymentInfo="pay" :paymentSelected="codePayment"/>
                    </div>
                </div>
                <q-separator class="q-mt-lg"/> 
                <div class="row justify-between">
                    <q-btn unelevated rounded no-caps  color="primary" @click="back()" label="Back" />
                    <q-btn unelevated rounded no-caps  color="primary" @click="enrollment()" label="Submit enrollment" />
                </div>
            </q-form>
        </q-step>
    </q-stepper>
</template>
<script>
import {ApiService} from '../../../ApiService';
import CardPayment from '../../components/cardPayment.vue';
import {mapState, mapActions} from 'vuex';
const apiService = new ApiService();
export default {
    components:{
        CardPayment
    },
    data() {
        return {
            codePayment: 0,
            educationLevel: [{label: 'Bachelor Degree', value: '1'}],
            rules: {
                required: v => !!v || 'Required',  
            },
            personDetail: {
                dateBirth: '',
                gender: '',
                address: '',
                phoneNumber: '',
                preferredLanguage: '',
                educationLevel: '',
            },
            stepEnroll: 1,
        }
    },
    computed:{
        ...mapState(['userData']),
    },
    props:{
        course: {
            type: Object,
            default: {}
        }
    },
    mounted() {
        this.verifyInformationData();
    },
    methods: {
        ...mapActions(['saveUserData']),
        selectpayment(code){
            this.codePayment = code;
        },
        next(){
            this.$refs.stepper.next();
        },
        back(){
            this.$refs.stepper.previous();
        },
        closeDialog(){
            this.cleanData();
            this.$emit('closeDialogEnroll');
        },
        cleanData(){
            this.codePayment = '';
            this.personDetail= {
                dateBirth: '',
                gender: '',
                address: '',
                phoneNumber: '',
                preferredLanguage: '',
                educationLevel: '',
            };
        },
        verifyInformationData(){
            if(this.userData.personalDetail !== undefined){
                this.personDetail= {
                    dateBirth: this.userData.dateBirth,
                    gender: this.userData.gender,
                    address: this.userData.address,
                    phoneNumber: this.userData.phoneNumber,
                    preferredLanguage: this.userData.preferredLanguage,
                    educationLevel: this.userData.educationLevel
                };
            }
        },
        updateInformationStudent(){
            let parameters = {
                id: this.userData.id,
                dateBirth: this.personDetail.dateBirth,
                gender: this.personDetail.gender,
                address: this.personDetail.address,
                phoneNumber: this.personDetail.phoneNumber,
                preferredLanguage: this.personDetail.preferredLanguage,
                educationLevel: this.personDetail.educationLevel.value
            }
            console.log(parameters)
            apiService
            .put('updateStudent', parameters)
            .then(response => {
                this.saveUserData(response.data);
            })
            .catch(error=>{
                console.log(error)
                this.$q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'mdi-alert',
                    position: 'top',
                    message: 'Sorry, we could not update your profile. '
                });
            })
        },
        enrollment(){
            let parameters = {
                idCourse: this.course.id,
                idPayment: this.codePayment,
                idStudent: this.userData.id
            }

            apiService
            .post('insertCoursePayment', parameters)
            .then(response=>{
                console.log(response)
                this.updateInformationStudent();
                this.closeDialog();
            })
            .catch(error=>{
                this.$q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'mdi-alert',
                    position: 'top',
                    message: 'Sorry, we could not enroll you. Please try again.'
                });
            })

            /*let coursesStudent = this.userData.courses === undefined ? [] : this.userData.courses;
            
            coursesStudent.push({
                idCourse: this.course.id,
                codePayment :  this.codePayment
            })
            let parameters = {
                personalDetail : this.personDetail,
                courses: coursesStudent
            }
            
            let service = `students/${this.userData.id}`;
            apiService
            .patch(service, parameters)
            .then(response=>{
                this.saveUserData(response.data);
                this.closeDialog();
            })
            .catch(error=>{
                this.$q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'mdi-alert',
                    position: 'top',
                    message: 'Sorry, we could not update your profile. Please try again.'
                });
            })*/
        },
    },
}
</script>