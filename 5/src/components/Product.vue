<template>
   <div>
      <h2>Product title</h2>
      <div class="price">{{ price }}</div>
      <hr>

      <button class="btn btn-warning" @click="decrease">-1</button>
      <input type="text" :value="cnt" @change="setCnt">
      <button class="btn btn-success" @click="increase">+1</button>
      <hr>
      <button class="btn btn-primary" @click="send">Send</button>

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

      setCnt(e) {
         console.log(this.cnt);

         this.$store.dispatch('setInput', parseInt(e.target.value) || 1);

         console.log(this.cnt);
      },

      /* ---Используем их через mapActions--- */
      // increase() {
      //    this.$store.dispatch('increase');
      // },
      // decrease() {
      //    this.$store.dispatch('decrease');
      // },
      // sendOrder() {
      //    this.$store.dispatch('send');
      // },
   },
};
</script>