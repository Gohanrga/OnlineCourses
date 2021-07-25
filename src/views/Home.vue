<template>
    <div class="row justify-center ">
        <div class="col-11">
            <div class="row">
                <h1 no-caps class="title-page">Available Courses</h1>
            </div>
            <div class="row justify-center">
                <div class="col-md-4 q-mb-xl" v-for="course in courses" :key='course.id'>
                    <CardInformation :key='course.id' :course="course"  />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ApiService} from '../../ApiService';
import CardInformation from '../components/cardInformation.vue'
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
    mounted() {
        this.getCourses();
    },
    methods: {
        getCourses(){
            apiService
            .get('getCourses')
            .then(response => {
                this.courses = response.data;
            })
        }
    },
}
</script>