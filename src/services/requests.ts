import { Product } from 'types';

const BASE_URL = 'http://localhost:3333';

type RequestResult<T> = {
  status: number;
  data?: T;
};

export const productService = {
  getAll: async (): Promise<RequestResult<Product[]>> => {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();

    return {
      status: 200,
      data
    };
  }
};
