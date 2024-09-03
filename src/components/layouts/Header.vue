<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="navStore.expandMenu"></v-app-bar-nav-icon>

    <v-app-bar-title>
      <v-menu>
        <template v-slot:activator="{ props }">
          <BaseButton color="secondary" v-bind="props" prepend-icon="mdi-account-circle-outline">{{ username }}</BaseButton>
        </template>

        <v-list>
          <v-list-item @click="editProfile">
            <v-list-item-title>Edit Profile</v-list-item-title>
          </v-list-item>

          <v-list-item @click="changePassword">
            <v-list-item-title>Change Password</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useNavStore } from '@/stores';
import { BaseButton } from 'erp-template-vuetify-components';
import { ref } from 'vue';

const navStore = useNavStore();

const username = ref('John Doe');

const editProfile = () => {
  alert('Edit Profile');
};

const changePassword = () => {
  alert('Change Password');
};

const logout = () => {
  alert('Logout');
};
</script>
