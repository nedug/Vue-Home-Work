<template>
   <div class="form-group">
      <label class="m-1">
         {{ label }}
         <transition name="fade">
            <span v-if="activated">
               <font-awesome-icon :icon="'circle-' + (valid ? 'check' : 'exclamation')"
                                  :class="valid ? 'text-success' : 'text-danger'"
               />
            </span>
         </transition>
      </label>

      <input type="text" class="form-control" :value="value" @input="onInput">
   </div>
</template>

<script>
export default {
   props: {
      label: { type: String, required: true },
      value: { type: String, required: true },
      activated: { type: Boolean, default: false },
      valid: { type: Boolean, default: false },
   },

   methods: {
      onInput(e) {
         this.$emit('change-input', e.target.value);
      },
   },
};
</script>

<style scoped>
   .fade-enter-active {
      animation: fadeIn 1s;
   }
   .fade-leave-active {
      animation: fadeOut 1s;
   }

   @keyframes fadeIn {
      from {
         opacity: 0;
      }
      to {
         opacity: 1;
      }
   }
   @keyframes fadeOut {
      from {
         opacity: 1;
      }
      to {
         opacity: 0;
      }
}
</style>