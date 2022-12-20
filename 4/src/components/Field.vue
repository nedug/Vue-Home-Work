<template>
   <div class="form-group">
      <label class="m-1">
         {{ label }}
         <span v-if="activated">
            <font-awesome-icon :icon="'circle-' + (valid ? 'check' : 'exclamation')"
                               :class="valid ? 'text-success' : 'text-danger'" />
         </span>
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