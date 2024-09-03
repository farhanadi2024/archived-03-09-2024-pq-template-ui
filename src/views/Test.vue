<template>
  <div>
    <p>value</p>
    <pre>
			{{ values }}
		</pre
    >
    <ShgForm :columns="1" ref="form">
      <!-- <ShgTextField v-model="values.firstName" label="First Name" :required="true" />
      <ShgTextField v-model="values.lastName" label="Last Name" :required="true" />
      <ShgTextField v-model="values.email" label="Email" :required="true" :rules="['email']" />
      <ShgTextarea v-model="values.address" label="Address" :required="true" /> -->
      <ShgFileUploadWithExpiry
        v-model="values.fileWithExpiredDate"
        name="fileWithExpiredDate"
        :validate="
          async () => {
            const a = await form?.form.validateField('fileWithExpiredDate.1');
            const b = await form?.form.validateField('fileWithExpiredDate.0');

            return true;
          }
        "
        :required="true"
      />
    </ShgForm>

    <div class="mt-5" />

    <ShgButton type="submit" @click="onSubmit"></ShgButton>
  </div>
</template>

<script setup lang="ts">
import ShgFileUploadWithExpiry from '@/components/layouts/ShgFileUploadWithExpiry.vue';
import useShgForm from '@/composables/ShgUseForm';
import { fetchQuestions } from '@/services/question.service';
import { ShgButton, ShgForm } from 'erp-template-vuetify-components';
import { onMounted } from 'vue';

const { form, handleSubmit, values } = useShgForm({
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    fileWithExpiredDate: ['2024-09-04', '66d57a47023609074691b41b'],
  },
});

const onSubmit = handleSubmit((value) => {
  console.log(value);
});

onMounted(async () => {
  const { data, error } = await fetchQuestions();

  if (error) {
    console.log(error);
    return;
  }

  console.log(data);
});
</script>

<style scoped></style>
