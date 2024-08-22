import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  _id: string;
  category: string;
  created_at: Date;
  description: string;
  image_url: string;
  name: string;
  stock: number;
  unit_value: number;
  user_id: string;
}

interface ProductStore {
  products: Product[];
  setProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
}

export const productStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      setProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      removeProduct: (productId) =>
        set((state) => ({
          products: state.products.filter((p) => p._id !== productId),
        })),
    }),
    {
      name: "product-storage",
    }
  )
);