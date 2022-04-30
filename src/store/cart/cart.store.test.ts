import { act, renderHook, RenderResult } from '@testing-library/react-hooks';
import { Product } from 'types';
import useCartStore, { CartStore } from './cart.store';

describe('Store: Cart', () => {
  let result: RenderResult<CartStore>;

  beforeEach(() => {
    result = renderHook(() => useCartStore()).result;
  });

  it('should start with state.products empty', () => {
    expect(result.current.products).toHaveLength(0);
  });

  it('should add products correctly', async () => {
    const product1: Product = {
      id: 1,
      title: 'Tênis de Caminhada Leve Confortável',
      price: 179.9,
      image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg'
    };

    const product2: Product = {
      id: 3,
      title: 'Tênis Adidas Duramo Lite 2.0',
      price: 219.9,
      image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg'
    };

    let addProductResult1, addProductResult2;

    await act(async () => {
      addProductResult1 = await result.current.addProduct(product1);
      addProductResult2 = await result.current.addProduct(product2);
    });

    expect(result.current.products).toHaveLength(2);
    expect(result.current.products).toEqual([
      { ...product1, amount: 1 },
      { ...product2, amount: 1 }
    ]);

    expect(addProductResult1).toEqual({ status: 'success' });
    expect(addProductResult2).toEqual({ status: 'success' });
  });

  it.todo('should not add same product twice');
  it.todo('should remove a product correctly');
  it.todo('should remove all products');
});
