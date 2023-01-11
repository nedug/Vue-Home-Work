<template>
   <div v-if="hasProduct">
      <h1>{{ product.title }}</h1>
      <router-link :to="{ name: 'catalog' }">Back to products</router-link>
      <hr>
      <div class="alert alert-success">
         price: {{ product.price }}$
      </div>

      <button v-if="inCart(id)" @click="remove(id)" type="button" class="btn btn-danger"
              :disabled="disable(id)">
         Remove
      </button>
      <button v-else @click="add(id)" type="button" class="btn btn-success"
              :disabled="disable(id)">
         Add to cart
      </button>
   </div>
   <app-e-404 v-else />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppE404 from './E404.vue';


export default {
   components: {
      AppE404,
   },
   computed: {
      ...mapGetters('products', { productById: 'one' }),
      ...mapGetters('cart', ['inCart', 'disable']),
      id() {
         return parseInt(this.$route.params.id);
      },
      validId() {
         return /^[1-9]+\d*$/.test(this.id);
      },
      product() {
         return this.productById(this.id);
      },
      hasProduct() {
         return this.validId && this.product !== undefined;
      },
   },
   methods: {
      ...mapActions('cart', ['add', 'remove']),
   },
};
</script>