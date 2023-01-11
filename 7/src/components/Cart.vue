<template>
   <div>
      <h1>Cart</h1>
      <hr>
      <div v-if="!length">Cart is empty...</div>
      <table v-else class="table table-bordered table-hover">
         <thead>
         <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Cnt</th>
            <th>Total</th>
            <th>Actions</th>
            <th>Remove</th>
            <th>Link</th>
         </tr>
         </thead>
         <tbody>
         <tr v-for="pr in products" :key="pr.id">
            <td>{{ pr.title.trim() }}</td>
            <td>{{ pr.price }}</td>
            <td>{{ pr.cnt }}</td>
            <td>{{ pr.price * pr.cnt }}</td>
            <td>
               <button class="btn btn-warning me-1" @click="setCnt({ id: pr.id, cnt: pr.cnt - 1 })">-1</button>
               <button class="btn btn-success" @click="setCnt({ id: pr.id, cnt: pr.cnt + 1 })">+1</button>
            </td>
            <td>
               <button @click="remove(pr.id)" type="button" class="btn btn-danger">x</button>
            </td>
            <td>
               <router-link :to="{ name: 'product', params: { id: pr.id } }">Read more</router-link>
            </td>
         </tr>
         </tbody>
      </table>
      <hr>
      <div v-if="length">
         <router-link :to="{ name: 'checkout' }" @click="clean" class="btn btn-success">Checkout</router-link>
         <button @click="clean" type="button" class="btn btn-danger">Clean Cart</button>
      </div>
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
   computed: {
      ...mapGetters('cart', { products: 'itemsDetailed', length: 'length' }),
   },
   methods: {
      ...mapActions('cart', ['setCnt', 'remove', 'clean']),
   },
};
</script>