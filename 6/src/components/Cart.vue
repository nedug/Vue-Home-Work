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
               <td>
                  <div>
                     <button @click="remove(item.id)" type="button" class="btn btn-danger">Remove</button>
                  </div>
               </td>
               <td>
                  <router-link :to="{ name: 'product', params: { id: item.id } }">Read more</router-link>
               </td>
            </tr>
         </table>
      </div>

      <router-link class="btn btn-success" :to="{ name: 'checkout' }">
         Order now
      </router-link>
   </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


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
   methods: {
      ...mapActions('cart', ['add', 'remove']),
   },
};
</script>