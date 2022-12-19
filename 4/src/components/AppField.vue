<template>
   <div class="form-group">
      <label class="m-1">
         {{ label }}
         <template v-if="activated">
            <font-awesome-icon icon="fa-solid fa-check-circle" class="text-success" v-if="valid"/>
            <font-awesome-icon icon="fa-solid fa-exclamation-circle" class="text-danger" v-else/>
         </template>
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

</style>