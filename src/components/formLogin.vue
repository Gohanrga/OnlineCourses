<template>
    <q-form
        @submit="submit"
        class="q-gutter-md"
    >
        <div class="row">
            <div class="col-md-11 fit column content-stretch" v-if="typeForm==='login'">
                    <q-input outlined 
                            dense 
                            stack-label 
                            placeholder="Enter your Email" 
                            v-model="login.username" 
                            label="Username" 
                            :rules="[rules.required]"    
                        >
                        <template v-slot:append>
                            <q-icon name="mdi-close" @click="login.username = ''" class="cursor-pointer" />
                        </template>
                    </q-input>
                    <q-input outlined 
                            dense 
                            stack-label 
                            placeholder="Enter your Password" 
                            v-model="login.password" 
                            type="password"
                            label="Your Password" 
                            :rules="[rules.required, rules.lenghtPassword]"
                        >
                        <template v-slot:append>
                            <q-icon name="mdi-close" @click="login.password = ''" class="cursor-pointer" />
                        </template>
                    </q-input>
                    <div class="link">
                        <a href="#">Forgot password?</a>
                    </div>  
                    <q-btn unelevated rounded no-caps color="primary" type="submit" label="Continue" />
                
            </div>
            <div class="col-md-11 fit column content-stretch" v-if="typeForm==='signUp'">
                <q-input outlined 
                        dense 
                        stack-label 
                        placeholder="Enter your full name" 
                        v-model="register.fullName" 
                        label="Full name" 
                        :rules="[rules.required]"
                    >
                    <template v-slot:append>
                        <q-icon name="mdi-close" @click="register.fullName = ''" class="cursor-pointer" />
                    </template>
                </q-input>
                <q-input outlined 
                        dense 
                        stack-label 
                        placeholder="Enter your Email" 
                        v-model="register.username" 
                        label="Username" 
                        :rules="[rules.required]"
                        >
                    <template v-slot:append>
                        <q-icon name="mdi-close" @click="register.username = ''" class="cursor-pointer" />
                    </template>
                </q-input>
                <q-input outlined 
                        dense 
                        stack-label 
                        placeholder="Enter your Password" 
                        v-model="register.password" 
                        type="password"
                        label="Your Password" 
                        :rules="[rules.required, rules.lenghtPassword]"
                        >
                    <template v-slot:append>
                        <q-icon name="mdi-close" @click="register.password = ''" class="cursor-pointer" />
                    </template>
                </q-input>
                <q-input outlined 
                        dense 
                        stack-label 
                        placeholder="Confirm your Password" 
                        v-model="register.confirm" 
                        type="password"
                        label="Confirm your Password" 
                        :rules="[rules.required, rules.lenghtPassword]"
                        >
                    <template v-slot:append>
                        <q-icon name="mdi-close" @click="register.confirm = ''" class="cursor-pointer" />
                    </template>
                </q-input>
                <q-select outlined
                    dense 
                    stack-label 
                    v-model="register.country"
                    use-input
                    input-debounce="0"
                    label="Country"
                    placeholder="Select your country"
                    :options="countriesOptions"
                    @filter="filterCountries"
                    
                >
                    <template v-slot:no-option>
                    <q-item>
                        <q-item-section class="text-grey">
                        No results
                        </q-item-section>
                    </q-item>
                    </template>
                </q-select>
                <q-btn unelevated rounded no-caps color="primary q-mt-md" type="submit" label="Continue" />
            </div>
        </div>
    </q-form>
</template>
<script>
import {ApiService} from '../../ApiService';
import {mapActions} from 'vuex';
const apiService = new ApiService();
export default {
    data() {
        return {
            login:{
                username: '',
                password: ''
            },
            register:{
                fullName: '',
                username: '',
                password: '',
                confirm: '',
                country: ''
            },
            countries: [],
            countriesOptions: this.countries,
            rules: {
                required: v => !!v || 'Required',  
                lenghtPassword:  val => val.length >= 6 || 'Please use minimum 6 characters', 

            }
        }
    },
    props:{
        typeForm:{
            type: String,
            default: 'signUp'
        } 
    },
    mounted() {
        this.getCountries();
        this.cleanData();
    },
    methods: {
        ...mapActions(['saveUserData', 'closeDialogLogin']),
        submit(){
            if(this.typeForm==='login'){
                this.loginUser();
            }else{
                this.createUser();
            }
        },
        loginUser(){
            let parameters = {
                email: this.login.username,
                password: this.login.password
            }
            apiService
            .post('login', parameters)
            .then(response => {
                this.saveUserData(response.data);
                this.cleanData();
                this.closeDialogLogin();
                this.$q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'mdi-cloud-check',
                    position: 'top',
                    message: 'Weilcome'
                });
                this.$router.push({name : 'available-courses'});
            })
            .catch(error=>{
                this.$q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'mdi-alert',
                    position: 'top',
                    message: 'Email not found, please check your information.'
                });
            })
        },
        createUser(){
            if(this.register.password != this.register.confirm){
                this.$q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'mdi-alert',
                    position: 'top',
                    message: 'Password and confirmation are different'
                });
            }else{
                let parameters = {
                    fullName: this.register.fullName,
                    email: this.register.username,
                    password: this.register.password
                }
                apiService
                .post('insertUser', parameters)
                .then(response => {
                    this.createStudent();
                })
                .catch(error=>{
                    console.log(error)
                    this.$q.notify({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'mdi-alert',
                        position: 'top',
                        message: 'Email already exists or An error has occurred. Please check your information.'
                    });
                })
            }
        },
        createStudent(){
            let parameters = {
                fullName : this.register.fullName,
                email: this.register.username,
                codeCountry: this.register.country.value
            }
            apiService
            .post('insertStudent', parameters)
            .then(response=>{
                this.$q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'mdi-cloud-check',
                    position: 'top',
                    message: 'Your account was created successfully.'
                });
                this.cleanData();
                this.$emit('changeToogle');
            })
            .catch(error=>{
            })
        },

        cleanData(){
            this.login = {
                username: '',
                password: ''
            }
            this.register = {
                fullName: '',
                username: '',
                password: '',
                confirm: '',
                country: ''
            }
        },    
        getCountries(){
            this.countries = [
                {label: 'Afganistan', value: 'AFG'},
                {label: 'Argnetina', value: 'ARG'},
                {label: 'Bolivia', value: 'BOL'},
                {label: 'Mexico', value: 'MEX'},
                {label: 'United State', value: 'USA'},
                {label: 'Rusia', value: 'RUS'},
            ]
        },

        filterCountries (val, update) {
            if (val === '') {
                update(() => {
                    this.countriesOptions = this.countries
                })
                return
            }

            update(() => {
                const needle = val.toLowerCase()
                this.countriesOptions = this.countries.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
            })
        }
    },      
}
</script>