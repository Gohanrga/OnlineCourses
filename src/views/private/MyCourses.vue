<template>
    <div class="row justify-center ">
        <div class="col-11">
            <div class="row">
                <h1 no-caps class="title-page">Available Courses</h1>
            </div>
            <div class="row justify-center">
                <div class="col-md-4 q-mb-xl" v-for="course in courses" :key='course.id'>
                    <CardInformation :key='course.id' 
                                     :course="course"
                                     textButton="View Details"
                                     :buttonAction="true"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ApiService} from '../../../ApiService';
import CardInformation from '../../components/cardInformation.vue'
import {mapState} from 'vuex';
const apiService = new ApiService();

export default {
    components:{
        CardInformation
    },
    data() {
        return {
            courses: []
        }
    },
    computed:{
        ...mapState(['userData']),
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
                this.updateMyCurses();
            })
        },
        updateMyCurses(){
            let service = `getCoursePayment/${this.userData.id}`;
            apiService
            .get(service)
            .then(response => {
                let coursesStudent = response.data
                this.courses = this.courses.filter(course => {
                    if(coursesStudent.filter(stdCourse => stdCourse.idCourse===course.id).length>0)
                        return course;
                })
            })
        },
    },
}
</script>