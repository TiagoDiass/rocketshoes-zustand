import axios from 'axios';
import { Product, Stock } from 'types';

const BASE_URL = 'http://localhost:3333';

const api = axios.create({
  baseURL: BASE_URL,
  validateStatus: (status) => status < 500
});

export type RequestResult<T> = {
  status: number;
  data?: T;
};

export const productService = {
  getAll: async (): Promise<RequestResult<Product[]>> => {
    const response = await api.get('/products');

    return {
      status: 200,
      data: response.data
    };
  }
};

export const stockService = {
  getStockByProductId: async (productId: number): Promise<RequestResult<Stock>> => {
    const response = await api.get(`/stock/${productId}`);

    return {
      status: 200,
      data: response.data
    };
  }
};
