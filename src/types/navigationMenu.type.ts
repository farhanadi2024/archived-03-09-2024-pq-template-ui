import type { Component } from 'vue';

export interface NavigationMenu {
  name: string;
  routerName?: string;
  path?: string;
  component?: Component;
  children?: NavigationMenu[];
  icon?: string;
  routerOnly?: boolean;
  sideMenuOnly?: boolean;
  asHref?: boolean;
}
