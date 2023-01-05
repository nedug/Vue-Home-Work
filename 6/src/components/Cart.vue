<template>
   <div>
      <h1>Cart</h1>
      <hr>
      <div>
         <div v-if="!items.length">Корзина пуста...</div>

         <div v-else>{{ items }}</div>

         <table class="table table-bordered">
            <tr v-for="item in items">
<!--               <td>{{ item.id }}</td>-->
               <td>{{ title(item.id) }}</td>
               <td>{{ price(item.id) }}</td>
               <td>{{ item.cnt }}</td>
            </tr>
         </table>
      </div>

      <router-link class="btn btn-success" :to="{ name: 'checkout' }">
         Order now
      </router-link>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
   computed: {
      ...mapGetters('products', ['product']),
      // ...mapGetters('cart', ['inCart']),
      items() {
         return this.$store.getters['cart/cart'];
      },
      title() {
         return id => this.product(id)?.title;
      },
      price() {
         return id => this.product(id)?.price;
      },
   },
};
</script>