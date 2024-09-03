declare module 'vue' {
  export interface GlobalComponents {
    VeeForm: (typeof import('vee-validate'))['Form'];
    VeeField: (typeof import('vee-validate'))['Field'];
  }
}

export {};
