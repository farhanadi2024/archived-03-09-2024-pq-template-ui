import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';

export const useNavStore = defineStore('navStore', () => {
  const { mobile } = useDisplay();
  const drawer = ref(true);
  const rail = ref(false);

  const expandMenu = () => {
    if (mobile.value) {
      drawer.value = !drawer.value;
    } else {
      rail.value = !rail.value;
    }
  };

  onMounted(() => {
    if (mobile.value) {
      drawer.value = false;
    }
  });

  return {
    drawer,
    rail,
    expandMenu,
  };
});
