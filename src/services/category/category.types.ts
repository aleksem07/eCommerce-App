export interface Category {
  id: string;
  name: string;
  children: Category[];
}

export const SETTINGS_KEY = "settings";
