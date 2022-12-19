<template>
   <div class="form-group">
      <label>
         {{ this.label }}
         <span v-if="this.activated"
               :class="this.valid ? 'fa fa-check-circle text-success' : 'fa fa-exclamation-circle text-danger'"
         ></span>
      </label>

      <input type="text" class="form-control" :value="this.value" @input="onInput">
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