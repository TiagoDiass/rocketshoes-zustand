import { stockService } from 'services/requests';
import { Product } from 'types';
import create from 'zustand';

type AddProductResult = {
  status: 'success' | 'fail';
  message?: string;
};

type ProductOnCart = Product & { amount: number };

export interface CartStore {
  state: {
    products: ProductOnCart[];
    totalPrice: number;
  };

  actions: {
    addProduct: (product: Product) => Promise<AddProductResult>;
    removeProduct: (product: Product) => void;
    decrementProductAmount: (product: Product) => void;
    clear: () => void;
    reset: () => void;
  };
}

const useCartStore = create<CartStore>()((set) => {
  const initialState = { products: [], totalPrice: 0 };

  return {
    state: {
      ...initialState
    },

    actions: {
      addProduct: async (product) => {
        const response = await stockService.getStockByProductId(product.id);
        const productAmountOnStock = response.data?.amount;
        let addResult: AddProductResult = { status: 'fail' };

        if (!productAmountOnStock)
          return { status: 'fail', message: 'There is no product with the specified ID' };

        const productToAdd: ProductOnCart = {
          ...product,
          amount: 1
        };

        set((store) => {
          const products = [...store.state.products];
          const productIndex = products.findIndex((product) => product.id === productToAdd.id);

          if (productIndex === -1) {
            products.push(productToAdd);
            addResult.status = 'success';
          } else {
            if (productAmountOnStock > products[productIndex].amount) {
              products[productIndex].amount++;
              addResult.status = 'success';
            } else {
              addResult = {
                status: 'fail',
                message: 'Requested amount is currently out of stock'
              };
            }
          }

          return {
            state: {
              totalPrice:
                addResult.status === 'success'
                  ? store.state.totalPrice + productToAdd.price
                  : store.state.totalPrice,
              products
            }
          };
        });

        return addResult;
      },

      removeProduct: (productToRemove) =>
        set((store) => {
          const products = [...store.state.products];
          const productIndex = products.findIndex((product) => product.id === productToRemove.id);

          if (productIndex !== -1) {
            products.splice(productIndex, 1);
          }

          return { state: { ...store.state, products } };
        }),

      decrementProductAmount: (productToDecremet) =>
        set((store) => {
          const products = [...store.state.products];
          const productIndex = products.findIndex((product) => product.id === productToDecremet.id);

          if (productIndex !== -1) {
            const productAmount = products[productIndex].amount;

            productAmount === 1
              ? products.splice(productIndex, 1)
              : products[productIndex].amount--;
          }

          return { state: { ...store.state, products } };
        }),

      clear: () => set({ state: { ...initialState } }),

      reset: () => set((store) => ({ ...store, state: { ...initialState } }))
    }
  };
});

export default useCartStore;
