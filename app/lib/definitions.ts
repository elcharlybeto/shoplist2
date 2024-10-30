export type Item = {
id: number;
location: 'list' | 'cart' | 'historial';
name: string;
qty: number;
price: number;
onSale: boolean;
onSalePrice: number;
boughtDate: string;
}

export type Mode = 'show' | 'edit' | 'onsale'| 'hide';

export type Action = 'save' | 'hide' | 'buy' | 'discard';