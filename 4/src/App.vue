<template>
   <div class="wrapper">
      <div class="sample">
         <!--         <form v-if="!isSendData" @submit.prevent="sendData">-->
         <form v-if="!isSendData" @submit.prevent="showModal = true">
            <div class="progress mb-2">
               <div class="progress-bar" :style="showProgress"></div>
            </div>
            <div>
               <field v-for="(field, i) in info"
                      :label="field.label"
                      :value='field.value'
                      :activated='field.activated'
                      :valid='field.valid'
                      @change-input="onInput(i, $event)" />
            </div>
            <button class="btn btn-primary mt-3" :disabled="!validate">Send Data</button>
         </form>
         <!--        <pre>{{ info }}</pre>-->
         <div v-else>
            <h1>All Done!</h1>
         </div>
      </div>
   </div>

   <custom-modal v-model="showModal" @confirm="confirm" @cancel="cancel">
      <template v-slot:title>Check data</template>
      <table class="table table-bordered">
         <tbody>
            <tr v-for="(field, i) in info" :key="i">
               <td>{{ field.label }}</td>
               <td>{{ field.value }}</td>
            </tr>
         </tbody>
      </table>
   </custom-modal>

</template>

<script>
import Field from './components/Field';
import CustomModal from '@/components/CustomModal';


export default {
   name: 'App',
   components: { Field, CustomModal },

   data: () => ({
      showModal: false,
      info: [
         {
            label: 'Name',
            value: '',
            pattern: /^[a-zA-Z ]{2,30}$/,
         },
         {
            label: 'Phone',
            value: '552525255',
            pattern: /^[0-9]{7,14}$/,
         },
         {
            label: 'Email',
            value: 'test',
            pattern: /.+/,
         },
         {
            label: 'Some Field 1',
            value: 'test',
            pattern: /.+/,
         },
         {
            label: 'Some Field 2',
            value: 'test',
            pattern: /.+/,
         },
      ],
      statusProgress: 0,
      validate: false,
      isSendData: false,
   }),

   computed: {
      updateProgress() {
         const validate = this.info.filter(f => f.valid).length;
         if (validate) {
            return validate * 100 / this.info.length;
         } else {
            return 0;
         }
      },
      showProgress() {
         return { width: this.statusProgress + '%' };
      },
   },

   methods: {
      onInput(index, val) {
         const field = this.info[index];

         field.value = val.trim();
         field.activated = true;
         field.valid = field.pattern.test(field.value); // Валидация

         this.statusProgress = this.updateProgress;

         this.validate = this.statusProgress >= 100;
      },
      sendData() {
         this.isSendData = true;
      },
      confirm() {
         this.sendData();
         this.showModal = false;
      },
      cancel(close) {
         close();
      },
   },

   created() {
      this.info.forEach((field, i) => {
         field.valid = false;
         field.activated = false;

         if (field.value !== '') {
            this.onInput(i, field.value);
         }
      });
   },
};
</script>

<style>
.wrapper {
   padding: 15px;
   max-width: 900px;
}
</style>
