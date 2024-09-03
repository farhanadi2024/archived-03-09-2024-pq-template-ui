<template>
  <v-list-group v-if="item.children && item.children.length > 0" :prepend-icon="item.icon">
    <template v-slot:activator="{ props }">
      <v-list-item v-bind="props" :title="item.name" />
    </template>

    <SidebarNavigationMenuItem v-for="(childItem, index) in item.children" :key="index" :item="childItem" />
  </v-list-group>

  <v-list-item v-else-if="item.asHref" :title="item.name" :href="item.path" :prepend-icon="item.icon" target="_blank" />
  <v-list-item v-else-if="item.path" :title="item.name" :to="item.path" :prepend-icon="item.icon" />
  <v-list-item v-else :title="item.name" :prepend-icon="item.icon" />
</template>

<script setup lang="ts">
import type { NavigationMenu } from '@/types';
import { toRefs } from 'vue';

const props = defineProps<{
  item: NavigationMenu;
}>();

const { item } = toRefs(props);
</script>
