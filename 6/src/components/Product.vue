<template>
   <div>
      <router-link :to="{ name: 'catalog' }">Back to products</router-link>
      <h1>{{ title }}</h1>
      <hr>
      <div class="alert alert-success">price: {{ price }}$</div>

      <button v-if="inCart(id)" @click="remove(id)" type="button" class="btn btn-danger">
         Remove
      </button>
      <button v-else @click="add(id)" type="button" class="btn btn-success">
         Add to cart
      </button>
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
   beforeMount() {
      if (!this.product(this.id)) {
         this.$router.push({ name: '404', params: { any: 404 } });
      }
   },
};
</script>