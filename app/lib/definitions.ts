export type Item = {
id: number;
location: 'list' | 'cart' | 'historial';
name: string;
qty: number;
price: number;
onSale: boolean;
onSalePrice: number;
boughtDate: string;
categoryId: number;
}

export type Mode = 'show' | 'edit' | 'onsale'| 'hide';

export type Action = 'save' | 'hide' | 'buy' | 'discard';

export type Field = 'qty' | 'name' | 'price';

export type Category = {
    id: number;
    name: string;
    active: boolean;
}