<template>
    <q-card class="course--card">
        <div class="header-card">
            <img :src="course.img">
            <span>{{course.name}}</span>
        </div>
        <q-card-section class="no-padding q-mt-md">
            <div class="text-subtitle2 text-weight-medium q-mb-xs">{{course.title}}</div>
            <div class="text-caption description">{{course.description}}</div>
            <div class="rating q-mt-xs">
                <q-icon
                    size="xs"
                    name="mdi-star"
                />
                <span>{{course.averageRating}} <span class="total-rating">({{course.rating}})</span></span>
            </div>
            <div class="hour q-mt-md">
                <q-icon
                    size="xs"
                    name="mdi-clock-outline"
                    class="q-pr-xs"
                />
                <span>{{course.hours}}</span>
            </div>
            <q-btn v-if="userData !== null && buttonAction" 
                   unelevated 
                   rounded 
                   no-caps 
                   color="primary" 
                   type="submit" 
                   :label="textButton" 
                   class="q-mt-md"
                   @click="acctionButton()"
            />
        </q-card-section>
    </q-card>
</template>
<script>
import {mapState} from 'vuex';
export default {
    computed:{
        ...mapState(['userData']),
    },
    props: {
        course: {
            type: Object,
            default: {}
        },
        textButton: {
            type: String,
            default: 'Send'
        },
        buttonAction: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        acctionButton(){
            this.$emit('accionButton', this.course);
        }
    },      
}
</script>