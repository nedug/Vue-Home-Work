<template>

   <vue-final-modal
       v-slot="{ params, close }"
       v-bind="$attrs"
       classes="modal-container"
       content-class="modal-content"
   >
      <span class="modal__title">
      <slot name="title"></slot>
    </span>
      <div class="modal__content">
         <slot :params="params"></slot>
      </div>
      <div class="modal__action">
         <button
             class="btn btn-success m-1"
             @click="$emit('confirm', close)">Confirm
         </button>
         <button
             class="btn btn-dark m-1"
             @click="$emit('cancel', close)">Cancel
         </button>
      </div>
      <button class="modal__close btn btn-close" @click="close"></button>
   </vue-final-modal>

</template>

<script>
import { VueFinalModal } from 'vue-final-modal';


export default {
   name: 'CustomModal',
   inheritAttrs: false,
   emits: ['confirm', 'cancel'],
   components: { VueFinalModal },
};
</script>

<style scoped>


::v-deep(.modal-container) {
   display: flex;
   justify-content: center;
   align-items: center;
}

::v-deep(.modal-content) {
   position: relative;
   display: flex;
   flex-direction: column;
   /*max-height: 90%;*/
   max-width: 45%;
   margin: 0 1rem;
   padding: 1rem;
   border: 1px solid #e2e8f0;
   border-radius: 0.25rem;
   background: #fff;
}

.modal__title {
   margin: 0 2rem 0 0;
   font-size: 1.5rem;
   font-weight: 700;
}

.modal__content {
   flex-grow: 1;
   overflow-y: auto;
}

.modal__action {
   display: flex;
   justify-content: center;
   align-items: center;
   flex-shrink: 0;
   padding: 1rem 0 0;
}

.modal__close {
   position: absolute;
   top: 0.5rem;
   right: 0.5rem;
   border-radius: 0.25rem;
}
</style>

<style scoped>
.dark-mode div ::v-deep(.modal-content) {
   border-color: #2d3748;
   background-color: #1a202c;
}
</style>