<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail && !mobile"
    :permanent="!mobile"
    :mobile="mobile"
    :expand-on-hover="!mobile"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <!-- Logo -->
    <template v-slot:prepend>
      <div class="justify-center" style="height: 64px">
        <v-img v-if="!rail || isHover" :src="Logo" />
        <v-img v-else :src="Submark" />
      </div>
    </template>

    <!-- Menu -->
    <SidebarNavigationMenu :items="navigationMenuItems" />

    <!-- Footer -->
    <template v-slot:append>
      <div class="text-center text-caption">
        {{ footer }}
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useNavStore } from '@/stores';
import type { NavigationMenu } from '@/types/navigationMenu.type';
import { Logo, Submark } from 'erp-template-vuetify-components';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useDisplay } from 'vuetify';
import SidebarNavigationMenu from './SidebarNavigationMenu.vue';

const appVersion = import.meta.env.VITE_APP_VERSION;

const { mobile } = useDisplay();
const navStore = useNavStore();
const { drawer, rail } = storeToRefs(navStore);

const isHover = ref(false);

const footer = computed(() => {
  if (rail.value && !isHover.value) {
    return appVersion;
  }

  return `Siloam Hospitals @ ${new Date().getFullYear()} (${appVersion})`;
});

const navigationMenuItems = ref<NavigationMenu[]>([
  { name: 'DASHBOARD' },
  { name: 'Dashboard', path: '/', icon: 'mdi-view-dashboard-outline' },
  { name: 'About', path: '/about', icon: 'mdi-information' },
  {
    name: 'Form',
    children: [{ name: 'Example Form PreQ', path: '/form-preq', icon: 'mdi-list-box-outline' }],
  },
  { name: 'External Links' },
  { name: 'Google', path: 'https://www.google.com', icon: 'mdi-google', asHref: true },
]);
</script>
