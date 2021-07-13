import Vue from 'vue'

import './styles/quasar.scss'
import iconSet from 'quasar/icon-set/mdi-v4.js'
import '@quasar/extras/mdi-v4/mdi-v4.css'
import { Quasar, Notify } from 'quasar'

Vue.use(Quasar, {
  config: {
    notify: { /* look at QUASARCONFOPTIONS from the API card (bottom of page) */ }
  },
  plugins: [
    Notify
  ],
  iconSet: iconSet
 })