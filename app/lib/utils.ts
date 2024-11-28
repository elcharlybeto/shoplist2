import Swal from "sweetalert2";
import { Category, Item } from "./definitions";

export const roundToNDecimals = (value: number, n: number): number => {
  const factor = Math.pow(10, n);
  return Math.round(value * factor) / factor;
};

export const today = (): string => {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
};

export const parseDDMMAAAAtoDate = (dateStr: string): Date => {
  const day = parseInt(dateStr.slice(0, 2), 10);
  const month = parseInt(dateStr.slice(3, 5), 10) - 1;
  const year = parseInt(dateStr.slice(6, 9), 10);

  return new Date(year, month, day);
};

export const Toast = Swal.mixin({
  toast: true,
  position: "center-start",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const formatString = (input: string): string =>  {
  return input.trim().toLowerCase();
}

export const isCategoryNameInArray = (categories: Category[], name: string): boolean =>  {
  return categories.some(category => category.name === name);
}

export const isItemNameInArray = (items: Item[], name: string): boolean =>  {
  return items.some(item => item.name === name);
}

export const getCategoryNameById = (categoryId: number, categories: Category[]): string => {
  const category = categories.find((cat) => cat.id === categoryId);
  return category !== undefined ? category.name : "undefined";
}

export const updateCategoryActiveState = (id: number, categories: Category[]): Category[] => {
  return categories.map((category) => ({
    ...category,
    active: category.id === id,
  }));
}

export const isCategoryActive = (id: number, categories: Category[]): boolean => {
  const category = categories.find((category) => category.id === id);
  return category ? category.active : false;
}

export const activateAllCategories = (categories: Category[]): Category[] => {
  return categories.map((category) => ({ ...category, active: true }));
};

export const countInactiveCategories = (categories: Category[]): number => {
 return categories.filter(category => category.active === false).length
};

export const countActiveCategories = (categories: Category[]): number => {
  return categories.filter(category => category.active === true).length
 };

export const inactivateAllCategories = (categories: Category[]): Category[] => {
  return categories.map((category) => ({ ...category, active: false }));
};