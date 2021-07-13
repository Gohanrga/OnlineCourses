<template>
    <div class="row justify-center ">
        <div class="col-md-11 fit column content-center">
            <h5 class="text-no-wrap no-margin text-h6">Register a new Student</h5>
        </div>
        <div class="col-md-11 ">
            <q-btn-toggle
                v-model="option"
                spread
                class="toogle--button-rounded"
                no-caps
                rounded
                unelevated
                toggle-color="grey-3"
                toggle-text-color="black"
                :options="[
                {label: 'Login', value: 'login'},
                {label: 'Sign Up', value: 'signUp'}
                ]"
            />
            <div class="row justify-center ">
                <div class="col-md-5 ">
                    <formLogin 
                            @changeToogle="changeToogle"
                            :typeForm="option" 
                            class="q-mt-lg"/>
                </div>
                <div class="col-md-2 centerHr">
                    <hr class="hr--vertical">
                    <span class="text-caption">Or</span>
                    <hr class="hr--vertical">
                </div>
                <div class="col-md-5 ">
                    <socialNetworkBtns class="q-mt-lg"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import socialNetworkBtns from '../components/socialNetworkBtns.vue';
import formLogin from '../components/formLogin.vue';

export default {
    components:{
        socialNetworkBtns,
        formLogin
    },
    data() {
        return {
            option: 'signUp'
        }
    },
    methods: {
        changeToogle(){
            this.option = 'login';
        }
    },      
}
</script>