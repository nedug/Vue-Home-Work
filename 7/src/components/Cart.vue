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
<!--         <router-link :to="{ name: 'checkout' }" @click="inOrder" class="btn btn-success">Checkout</router-link>-->
         <button @click="showModal = true" type="button" class="btn btn-success">Checkout</button>
         <button @click="clean" type="button" class="btn btn-danger">Clean Cart</button>
      </div>
   </div>

   <custom-modal
       v-model="showModal"
       @confirm="confirm"
       @cancel="cancel"
       :transition="{
      'enter-active-class': 'animate__animated animate__fadeInDown',
      'leave-active-class': 'animate__animated animate__slideOutUp',
    }">
      <template v-slot:title>Are you ready to order?</template>
      <!--      <table class="table table-bordered">-->
      <!--         <tbody>-->
      <!--         <tr v-for="(field, i) in info" :key="i">-->
      <!--            <td>{{ field.label }}</td>-->
      <!--            <td>{{ field.value }}</td>-->
      <!--         </tr>-->
      <!--         </tbody>-->
      <!--      </table>-->
   </custom-modal>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import CustomModal from '@/components/CustomModal';
import '../animate.css';


export default {
   components: {
      CustomModal,
   },
   data: () => ({
      showModal: false,
   }),
   computed: {
      ...mapGetters('cart', { products: 'itemsDetailed', length: 'length' }),
   },
   methods: {
      ...mapActions('cart', ['setCnt', 'remove', 'clean', 'inOrder']),
      confirm() {
         this.inOrder();
         this.$router.push({ name: 'checkout'});
         this.showModal = false;
      },
      cancel(close) {
         close();
      },
   },
};
</script>

<style>

.fade-enter-active {
   animation: iconIn .3s;
}

.fade-leave-active {
   animation: iconOut .3s;
}

@keyframes iconIn {
   from {
      transform: translateY(-100px);
   }
   to {
      transform: translateY(0);
   }
}

@keyframes iconOut {
   from {
      transform: translateY(0)
   }
   to {
      transform: translateY(100px);
   }
}
</style>