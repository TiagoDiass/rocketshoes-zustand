import create from 'zustand';
import { Product } from 'types';
import { productService } from 'services/requests';

export interface ProductsStore {
  products: Product[];
  fetchProducts: () => Promise<void>;
}

const useProductsStore = create<ProductsStore>()((set) => {
  return {
    products: [],
    fetchProducts: async () => {
      const response = await productService.getAll();

      return set((state) => ({
        ...state,
        products: response.status === 200 && !!response.data ? response.data : []
      }));
    }
  };
});

export default useProductsStore;
