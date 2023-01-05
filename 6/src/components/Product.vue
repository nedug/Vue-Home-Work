<template>
   <div>
      <router-link :to="{ name: 'catalog' }">
         Back to products
      </router-link>

      <h1>{{ title }}</h1>

      <hr>
      <div class="alert alert-success">price: {{ price }}$</div>
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
   computed: {
      ...mapGetters('products', ['product']),
      ...mapGetters('cart', ['inCart']),
      id() {
         return Number(this.$route.params.id);
      },
      title() {
         return this.product(this.id)?.title;
      },
      price() {
         return this.product(this.id)?.price;
      },
   },
   methods: {
      ...mapActions('cart', ['add', 'remove']),
   },
   created() {
      console.log(!this.product(this.id));
      if (!this.product(this.id)) {
         this.$router.push({ name: '404', params: { any: 404 } });
         // this.$router.push({ name: 'catalog' })
      }
   },
};
</script>