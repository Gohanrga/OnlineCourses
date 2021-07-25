<template>
    <div>
        <div class="row justify-center ">
            <div class="col-11">
                <div class="row">
                    <h1 no-caps class="title-page">Available Courses</h1>
                </div>
                <div class="row justify-center">
                    <div class="col-md-4 q-mb-xl" v-for="course in courses" :key='course.id'>
                        <CardInformation :key='course.id'  
                                        :course="course"
                                        textButton="Enroll"
                                        :buttonAction="true"
                                        @accionButton="openDialogEnroll"
                        />
                    </div>
                </div>
            </div>
        </div>
        <!--dialog enroll -->
        <q-dialog v-model="dialogEnroll">
            <q-card style="width:700px;  max-width: 90vw;" >
                <q-card-section class="row items-center q-pb-sm q-pt-lg">
                    <div class="col-md-12 row justify-center ">
                        <div>Aplication Process - {{course.title}}</div>
                    </div>
                </q-card-section>
                <q-card-section class="q-pb-sm q-pt-sm">
                    <ApplicationProcess :course="course" @closeDialogEnroll="closeDialogEnroll" />
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import {ApiService} from '../../../ApiService';
import CardInformation from '../../components/cardInformation.vue';
import ApplicationProcess from '../../views/private/AplicationProcess.vue';
import {mapState} from 'vuex';
const apiService = new ApiService();

export default {
    components:{
        CardInformation,
        ApplicationProcess
    },
    data() {
        return {
            courses: [],
            course: {},
            dialogEnroll: false,
        }
    },
    computed:{
        ...mapState(['userData']),
    },
    watch:{
        userData(){
            this.updateCurses();
        }
    },
    mounted() {
        this.getCourses();
    },
    methods: {
        getCourses(){
            apiService
            .get('getCourses')
            .then(response => {
                this.courses = response.data;
                this.updateCurses();
            })
        },
        updateCurses(){
            let service = `getCoursePayment/${this.userData.id}`;
            apiService
            .get(service)
            .then(response => {
                let coursesStudent = response.data
                this.courses = this.courses.filter(course => {
                    if(coursesStudent.filter(stdCourse => stdCourse.idCourse===course.id).length===0)
                        return course;
                })
            })
        },
        openDialogEnroll(course){
            this.course = course;
            this.getPayment();
        },
        getPayment(){
            apiService
            .get('getPayments')
            .then(response => {
                this.course['payment'] = response.data;
                this.dialogEnroll = true;
            })
            .catch(error=>{
                this.$q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'mdi-alert',
                    position: 'top',
                    message: 'We can get payment information, please try again.'
                });
            })
        },
        closeDialogEnroll(){
            this.dialogEnroll = false; 
        }
    },
}
</script>