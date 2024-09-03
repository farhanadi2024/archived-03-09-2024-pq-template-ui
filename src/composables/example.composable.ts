import { ref } from 'vue';

export function useExample() {
  const exampleId = ref(0);

  return { exampleId };
}
