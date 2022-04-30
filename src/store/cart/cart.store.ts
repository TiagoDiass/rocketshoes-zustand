// import { stockService } from 'services/requests';
import { Product } from 'types';
import create from 'zustand';

type AddProductResult = {
  status: 'success' | 'fail';
  message?: string;
};

type ProductOnCart = Product & { amount: number };

export interface CartStore {
  products: ProductOnCart[];
  addProduct: (product: Product) => Promise<AddProductResult>;
}

const useCartStore = create<CartStore>()((set) => {
  return {
    products: [],
    addProduct: async (product) => {
      // const response = await stockService.getStockByProductId(product.id);
      const productToAdd: ProductOnCart = {
        ...product,
        amount: 1
      };

      set((state) => ({ ...state, products: [...state.products, productToAdd] }));

      return {
        status: 'success'
      };
    }
  };
});

export default useCartStore;
