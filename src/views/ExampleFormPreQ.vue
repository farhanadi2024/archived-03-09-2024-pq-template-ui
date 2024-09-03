<template>
  <ShgLayout :navigation-items="navigationItems">
    <template v-slot:contents="{ activeItemValue }">
      <ShgCard v-if="navigationItems[0].value === activeItemValue" :title="navigationItems[0].label">
        <button @click="onTest">validate name</button>

        <ShgForm :columns="1" ref="form">
          <ShgTextField v-model="values.firstName" label="name" field-name="firstName" :required="true" />
          <ShgTextField v-model="values.lastName" label="name" field-name="lastName" :required="true" />
          <ShgTextField v-model="values.email" label="Email" :required="true" :rules="['email']" />
          <ShgTextarea v-model="values.address" label="Address" :required="true" />
          <ShgFileUpload label="file upload" :model-value="a" :required="true" />
          <ShgDatePicker v-model="values.date" label="Date" :required="true" />
        </ShgForm>

        <template v-slot:actions>
          <ShgButton type="submit" @click="onSubmit"></ShgButton>
        </template>
      </ShgCard>

      <ShgCard v-if="navigationItems[1].value === activeItemValue" :title="navigationItems[1].label">
        <ShgForm :columns="1" ref="userForm">
          <ShgTextField v-model="userData.username" label="Username" :required="true" />
          <ShgTextField v-model="userData.email" label="Email" :required="true" :rules="['email']" />
          <ShgPasswordField v-model="userData.password" label="Password" :required="true" :rules="['password']" />
          <ShgPasswordField
            v-model="userData.confirmPassword"
            label="Confirm Password"
            :required="true"
            :rules="['confirmed:@Password']"
          />
        </ShgForm>

        <template v-slot:options>
          <v-card>
            <v-card-title>Information</v-card-title>
            <v-card-text>Please insert with correct data</v-card-text>
          </v-card>
        </template>

        <template v-slot:actions>
          <BaseButton @click="register">Register</BaseButton>
        </template>
      </ShgCard>
    </template>
  </ShgLayout>
</template>

<script setup lang="ts">
import useShgForm from '@/composables/ShgUseForm';
import {
  BaseButton,
  ShgButton,
  ShgCard,
  ShgDatePicker,
  ShgFileUpload,
  ShgForm,
  ShgLayout,
  ShgPasswordField,
  ShgTextarea,
  ShgTextField,
  type LayoutNavigationItem,
  type ShgFormRef,
} from 'erp-template-vuetify-components';
import { ref } from 'vue';

const navigationItems = ref<LayoutNavigationItem[]>([
  { label: 'General', value: 'general' },
  { label: 'User', value: 'user' },
]);

const { form, handleSubmit, values } = useShgForm({
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    date: '',
  },
});

const onTest = async () => {
  console.log('clicked');

  form.value?.form.validateField('name');
};

const onSubmit = handleSubmit((value) => {
  console.log(value);
});
const { userForm, userData, register } = useUserForm();

const a = ref(null);

function useUserForm() {
  const userForm = ref<ShgFormRef>();
  const userData = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const register = async () => {
    const isValid = await userForm.value?.validate();
    if (isValid) {
      alert('Success Register');
    }
  };

  return { userForm, userData, register };
}
</script>
