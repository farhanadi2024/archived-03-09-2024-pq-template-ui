import type { ShgFormRef } from 'erp-template-vuetify-components';
import { ref } from 'vue';

type IUseForm<T> = {
  initialValues?: T;
};
const useShgForm = <T extends object>({ initialValues }: IUseForm<T>) => {
  const form = ref<ShgFormRef>();

  const values = ref<T>(initialValues ?? ({} as T));

  type IHandleSubmitSuccess = (values: T) => void;

  const handleSubmit = (onSuccess: IHandleSubmitSuccess, onError?: () => void) => {
    return async () => {
      const isValid = await form.value?.validate();
      const a = form.value?.form.errors;
      console.log(a);
      console.log('tes');

      if (isValid) {
        onSuccess(JSON.parse(JSON.stringify(values.value)) as T);
        return;
      }
      onError?.();
    };
  };

  return {
    form,
    values,
    handleSubmit,
  };
};

export default useShgForm;
