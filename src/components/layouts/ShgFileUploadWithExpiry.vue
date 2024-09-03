<template>
  <div>
    <p>file detail</p>
    <pre>
			{{ fileDetail }}
		</pre
    >
    <div class="bg-grey-lighten-5 rounded-sm py-1" style="width: fit-content" v-if="fileDetail?._id">
      <v-row no-gutters justify="center" align="center">
        <v-col cols="auto">
          <v-row no-gutters justify="center" align="center" class="flex-nowrap">
            <v-col cols="auto">
              <div class="mx-1">
                <v-icon class="text-medium-emphasis">mdi-clock-time-four-outline</v-icon>
              </div>
            </v-col>
            <v-col cols="auto">
              <div class="text-subtitle-2 text-medium-emphasis">
                {{ moment(model![0]).format('DD MMM YYYY') }}
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="auto">
          <span class="mx-1"> | </span>
        </v-col>

        <v-col cols="auto">
          <button class="bg-blue-lighten-5 text-blue-darken-1 px-1 py-1 rounded-sm" type="button">
            <v-row no-gutters justify="center" align="center" class="flex-nowrap">
              <v-col>
                <div class="mx-1">
                  <v-icon class="">mdi-paperclip-check</v-icon>
                </div>
              </v-col>
              <v-col>
                <div class="text-subtitle-2">
                  {{ shortenFilename(fileDetail.filename) }}
                </div>
              </v-col>
            </v-row>
          </button>
        </v-col>

        <v-col cols="auto">
          <div class="mx-1" @click="isModalUpdateOpen = true">
            <button class="text-blue-darken-1 px-1 py-1 rounded-sm" type="button">
              <v-row no-gutters justify="center" align="center" class="flex-nowrap">
                <v-col>
                  <v-icon class="">mdi-fountain-pen</v-icon>
                </v-col>
              </v-row>
            </button>
          </div>
        </v-col>

        <v-col cols="auto">
          <div class="mx-1" @click="deleteDocument">
            <button class="bg-red-lighten-5 text-red-darken-1 px-1 py-1 rounded-sm" type="button">
              <v-row no-gutters justify="center" align="center" class="flex-nowrap">
                <v-col>
                  <v-icon class="">mdi-close-circle-outline</v-icon>
                </v-col>
              </v-row>
            </button>
          </div>
        </v-col>
      </v-row>
    </div>

    <BaseButton color="primary" @click="isModalUploadOpen = true" v-if="!fileDetail?._id">
      <template v-slot:default>
        <v-row no-gutters justify="center" align="center" class="flex-nowrap">
          <v-col>
            <div class="mx-1">
              <v-icon class="">mdi-paperclip-check</v-icon>
            </div>
          </v-col>
          <v-col>
            <div class="text-subtitle-2">Add File</div>
          </v-col>
        </v-row>
      </template>
    </BaseButton>

    <BaseDialog title="Upload File" width="600" v-model="isModalUploadOpen">
      <template v-slot:default>
        <v-row align="end" no-gutters>
          <v-col>
            <ShgDatePicker v-model="model![0]" label="Date" :field-name="`${name}.0`" :required="required" />
          </v-col>
          <v-col>
            <div class="pa-3">
              <VeeField
                :name="`${name}.1`"
                v-model="model![1]"
                :rules="`${required ? 'required' : ''}`"
                v-slot="{ errorMessage }"
              >
                <BaseButton color="primary" block @click="inputRef?.click()">
                  {{ fileDetail?.filename ? shortenFilename(fileDetail.filename) : 'Choose File' }}
                </BaseButton>
                <input type="file" hidden ref="inputRef" accept=".pdf, image/*" @change="onFileChange" />
                <p class="error-message">
                  {{ errorMessage }}
                </p>
              </VeeField>
            </div>
          </v-col>
        </v-row>
      </template>
      <template v-slot:actions>
        <BaseButton color="secondary" @click="isModalUploadOpen = false">Cancel</BaseButton>
        <BaseButton color="primary" @click="handleFileUpload">Upload</BaseButton>
      </template>
    </BaseDialog>

    <BaseDialog title="Update Detail" width="600" v-model="isModalUpdateOpen">
      <template v-slot:default>
        <ShgDatePicker v-model="model![0]" label="Date" :field-name="`${name}.0`" :required="required" />
      </template>

      <template v-slot:actions>
        <BaseButton color="secondary" @click="isModalUpdateOpen = false">Cancel</BaseButton>
        <BaseButton color="primary" @click="handleUpdateExpired">Update</BaseButton>
      </template>
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import { DocumentService } from '@/services/document.service';
import { shortenFilename } from '@/utils';
import { BaseButton, BaseDialog, ShgDatePicker } from 'erp-template-vuetify-components';
import moment from 'moment';
import { onMounted, ref, watch } from 'vue';

const isModalUploadOpen = ref(false);
const isModalUpdateOpen = ref(false);

const model = defineModel<string[]>();

const inputRef = ref<HTMLInputElement | null>(null);

const props = defineProps<{
  name: string;
  validate: () => Promise<boolean>;
  required: boolean;
}>();

const fileDetail = ref<{ _id?: string; filename: string } | null>();

const deleteDocument = async () => {
  const response = await DocumentService.deleteFile(fileDetail!.value!._id!);

  if (response.error) {
    console.log(response.error);
    return;
  }

  fileDetail.value = {
    filename: '',
    _id: undefined,
  };

  model.value = [];
};

const handleUpdateExpired = async () => {
  const isValid = await props.validate();

  if (!isValid) {
    return;
  }

  const response = await DocumentService.updateExpiredAt(model.value![1], model.value![0]);

  if (response.error) {
    console.log(response.error);
    return;
  }

  isModalUpdateOpen.value = false;
};

const handleFileUpload = async () => {
  const isValid = await props.validate();

  if (!isValid) {
    return;
  }

  // handle file upload
  const file = inputRef!.value!.files![0];

  const formData = new FormData();
  formData.append('file', file);
  formData.append('expired_at', model.value![0]);

  const response = await DocumentService.uploadFileWithExpired(file, model.value![0]);

  if (response.error) {
    console.log(response.error);
    return;
  }

  fileDetail.value = {
    filename: file.name,
    _id: response.data._id,
  };

  model!.value![1] = response.data._id;

  isModalUploadOpen.value = false;
};

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) {
    return;
  }

  fileDetail.value = {
    filename: file.name,
    _id: undefined,
  };
};

const getDocument = async () => {
  if (!model.value?.[1]) {
    return;
  }

  const response = await DocumentService.getFile(model.value[1]);

  if (response.error) {
    console.log(response.error);
    return;
  }

  fileDetail.value = {
    filename: response.data.filename,
    _id: response.data._id,
  };

  model.value = [response.data.expired_at, response.data._id];
};

onMounted(async () => {
  getDocument();
});

watch(isModalUpdateOpen, (newVal) => {
  if (newVal) {
    return;
  }
  getDocument();
});
</script>

<style scoped>
.error-message {
  color: #b34c5f;
  font-size: 12px;
  margin-top: 6px;
  margin-left: 16px;
}
</style>
