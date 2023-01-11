<template>
	<div>
		<h1>Your order now</h1>
		<hr>

     <div v-if="!length">This will be your first order...</div>
     <table v-else class="table table-bordered table-hover">
        <thead>
        <tr>
           <th>Title</th>
           <th>Price</th>
           <th>Cnt</th>
           <th>Total</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="pr in order" :key="pr.id">
           <td>{{ pr.title.trim() }}</td>
           <td>{{ pr.price }}</td>
           <td>{{ pr.cnt }}</td>
           <td>{{ pr.price * pr.cnt }}</td>
        </tr>
        </tbody>
     </table>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
   computed: {
      ...mapGetters('cart', { products: 'itemsDetailed', length: 'lengthOrder', order: 'order' }),
   },
};
</script>