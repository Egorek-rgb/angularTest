export interface MenuItem {
  id: number;
  name: string;
  value: number;
  category: string;
  selected: boolean;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}
