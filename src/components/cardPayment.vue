<template>
    <div :class="{'card-payment':true, 'card-payment-active': (paymentSelected === paymentInfo.codeType)}" v-if="paymentInfo">
        <div class="content">
            <div class="header-payment q-mb-sm">
                <h6>{{paymentInfo.type}}</h6>
                <span v-if="paymentInfo.cost" class="costo">{{paymentInfo.cost}}</span>
                <span v-if="paymentInfo.discount" >$4,795</span>
            </div>
             <q-separator />
            <div class="footer-payment q-mt-sm">
                <span v-if="paymentInfo.save">{{paymentInfo.save}}</span>
                <span v-if="paymentInfo.fees">{{paymentInfo.fees}}</span>
                <span v-if="paymentInfo.interest">{{paymentInfo.interest}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {

     
    props: {
        paymentInfo: {
            type: Object,
            default: {}
        },
        paymentSelected:{
            type: String,
            default: ''
        }
    }
}
</script>