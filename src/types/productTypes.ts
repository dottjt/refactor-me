export type Products = {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryPrice: number;
}

export type ProductOptions = {
  id: string;
  productId: string;
  name: string;
  description: string;
  isNew: boolean;
}
