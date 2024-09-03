<template>
  <v-list density="compact" nav>
    <SidebarNavigationMenuItem v-for="(item, index) in items" :key="index" :item="item" />
  </v-list>
</template>

<script setup lang="ts">
import type { NavigationMenu } from '@/types';
import { toRefs } from 'vue';
import SidebarNavigationMenuItem from './SidebarNavigationMenuItem.vue';

const props = defineProps<{
  items: NavigationMenu[];
}>();

const { items } = toRefs(props);
</script>
