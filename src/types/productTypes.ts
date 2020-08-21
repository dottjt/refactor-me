export type Products = {
  id: string;
  name: string;
  description: string;
  price: Number;
  deliveryPrice: Number;
}

export type ProductOptions = {
  id: string;
  productId: string;
  name: string;
  description: string;
  isNew: boolean;
}
