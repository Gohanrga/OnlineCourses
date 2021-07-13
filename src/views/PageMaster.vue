<template>
  <q-layout view="lHh Lpr lFf">
    <q-toolbar class="shadow-1 ">
      <q-img
      :src="require('@/assets/logo.png')"
      class="img--logo"
      />
      <q-space />
      <q-btn-toggle
        v-model="menu"
        flat stretch
        no-caps
        toggle-color="primary text-weight-bold"
        :options="menuOptions"
      >
        <template v-for="option in menuOptions" v-slot:[option.slot]>
          <div :key="option.value" style="height: 100%;"  class="row items-center no-wrap" @click="$router.push(option.route)">
            <div class="text-center">
              {{option.text}}
            </div>
            <q-icon right small name="mdi-menu-down" />
          </div>
        </template>
      </q-btn-toggle>
      <q-space />
      <q-btn v-if="!userData" label="Register or Login" color="secondary" no-caps @click="openDialogLogin()"/>
      <q-btn v-if="userData" label="Logout" color="secondary" no-caps @click="logoutSession()"/>
    </q-toolbar>
    <q-page-container class="q-mt-lg q-mb-lg">
      <router-view></router-view>
    </q-page-container>
    <q-tabs
        dense
        class="footer-main text-white "
        no-caps
      >
        <span>© 2021 NCoding®</span>
        <q-tab name="alarms"  label="Regulatory Information" />
        <q-tab name="movies"  label="Terms of use & Provacy Policy" />
        <q-tab name="movies"  label="Careers" />
    </q-tabs>
    <!-- Dialog Login -->
    <q-dialog v-model="dialogLogin">
      <q-card style="width:700px;  max-width: 90vw;" >
        <q-card-section class="row items-center q-pb-sm q-pt-sm">
            <div class="col-md-1 ">
                <q-btn icon="mdi-close" flat round dense @click="closeDialogLogin()" />
            </div>
            <div class="col-md-11 row justify-center ">
                <div>Log in or sign up</div>
            </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <Login/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import Login from './Login.vue';
import {mapState, mapActions} from 'vuex';
export default {
  
  components: {
    Login
  },

  data () {
    return {
        menu: 'available',
        menuOptions:[
            {text: 'Available Courses', value: 'available', slot:'available', route: 'available-courses'},
            {text: 'Continuing Education', value: 'education', slot:'education', route: ''},
            {text: 'My Courses', value: 'courses', slot:'courses', route: 'my-courses'},
            {text: 'Community', value: 'community', slot:'community', route: ''}
        ],
    }
  },
  computed:{
    ...mapState(['dialogLogin', 'userData']),
  },
  methods: {
    ...mapActions(['openDialogLogin', 'closeDialogLogin', 'logout']),
    openDialog(){
        this.openDialogLogin();
    },
    logoutSession(){
        this.logout();
        this.$router.push({name : 'Home'});
    }
  },
}
</script>