<template>
   <div class="form-group">
      <label class="m-1">
         {{ label }}
         <transition name="fade" v-if="activated" mode="out-in" appear appear-class="custom-appear-class">
<!--            <span v-if="activated">-->
<!--               <transition name="blink">-->
                  <font-awesome-icon :icon="'circle-' + (valid ? 'check' : 'exclamation')"
                                     :class="valid ? 'text-success' : 'text-danger'"
                                     :key="valid"
                  />
<!--               </transition>-->
<!--            </span>-->
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
   animation: iconIn .5s;
}
.fade-leave-active {
   animation: iconOut .5s;
}

@keyframes iconIn {
   from{ transform: rotateY(-90deg); }
   to{ transform: rotateY(0); }
}

@keyframes iconOut {
   from{ transform: rotateY(0); }
   to{ transform: rotateY(90deg); }
}
</style>