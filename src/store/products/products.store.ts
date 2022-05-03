import create from 'zustand';
import { Product } from 'types';
import { productService } from 'services/requests';

export interface ProductsStore {
  state: {
    products: Product[];
  };

  actions: {
    fetchProducts: () => Promise<void>;
  };
}

const useProductsStore = create<ProductsStore>()((set) => {
  return {
    state: { products: [] },

    actions: {
      fetchProducts: async () => {
        const response = await productService.getAll();
        const products = response.status === 200 && !!response.data ? response.data : [];

        return set({
          state: { products }
        });
      }
    }
  };
});

export default useProductsStore;
