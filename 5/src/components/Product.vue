<template>
   <div>
      <h2>Product title</h2>
      <div class="price">{{ price }}</div>
      <hr>

      <button class="btn btn-warning" @click="decrease">-1</button>

      <input type="text" :value="cnt" @change="setCnt">

      <button class="btn btn-success" @click="increase">+1</button>

      <hr>
      <button class="btn btn-primary" @click="sendOrder">Send</button>

      <div class="alert alert-warning" v-if="orderIsPending">
         Pending...
      </div>
      <div class="alert alert-success" v-else-if="orderIsDone">
         Done!
      </div>
   </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


export default {
   computed: mapGetters(['price', 'cnt', 'orderIsPending', 'orderIsDone']),
   methods: {
      ...mapActions(['send', 'increase', 'decrease']),
      // increase() {
      //    this.$store.dispatch('increase');
      // },
      // decrease() {
      //    this.$store.dispatch('decrease');
      // },

      setCnt(e) {

         console.log(this.cnt);

         this.$store.dispatch('setInput', parseInt(e.target.value) || 1);

         // console.log(+e.target.value);

         console.log(this.cnt);



         // this.$nextTick(() => {
         //    this.$store.dispatch('setInput', parseInt(e.target.value) || 1);
         // })

         // this.$store.dispatch('setInput', parseInt(e.target.value) || 1);
         // this.$store.commit('setCnt', parseInt(e.target.value));
      },
      sendOrder() {
         this.$store.dispatch('send');
      },
   },
};
</script>