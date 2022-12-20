<template>
   <div class="form-group">
      <label class="m-1">
         {{ label }}
         <transition
             name="fade"
             v-if="activated"
             mode="out-in"
             appear
             appear-active-class="first-appear-class">
            <!-- appear - анимация при первой загрузке анимации -->
            <!-- appear-active-class - нужен для указания класса -->
            <!-- out-in - Сначала исчезает старый элемент, и только после этого появляется новый -->

            <font-awesome-icon :icon="'circle-' + (valid ? 'check' : 'exclamation')"
                               :class="valid ? 'text-success' : 'text-danger'"
                               :key="valid" />
            <!-- key - нужен для уникальности-->

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

.first-appear-class {
   animation: firstIn .8s;
}

@keyframes iconIn {
   from {
      transform: rotateY(-90deg);
   }
   to {
      transform: rotateY(0);
   }
}

@keyframes iconOut {
   from {
      transform: rotateY(0);
   }
   to {
      transform: rotateY(90deg);
   }
}

@keyframes firstIn {
   from {
      opacity: 0;
   }
   to {
      opacity: 1;
   }
}
</style>