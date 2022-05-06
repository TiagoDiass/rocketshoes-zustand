import { act, renderHook, RenderResult } from '@testing-library/react-hooks';
import { Product } from 'types';
import useCartStore, { CartStore } from './cart.store';
import { stockService } from 'services/requests';

const getStockByProductIdSpy = jest.spyOn(stockService, 'getStockByProductId');

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

describe('Store: Cart', () => {
  let result: RenderResult<CartStore>;

  beforeEach(() => {
    result = renderHook(() => useCartStore()).result;
  });

  afterEach(() => {
    act(() => {
      result.current.actions.reset();
    });
  });

  it('should start with state.products empty', () => {
    expect(result.current.state.products).toHaveLength(0);
  });

  it('should add products correctly', async () => {
    getStockByProductIdSpy
      .mockResolvedValueOnce({ status: 200, data: { id: product1.id, amount: 2 } })
      .mockResolvedValueOnce({ status: 200, data: { id: product2.id, amount: 2 } });

    let addProductResult1, addProductResult2;

    await act(async () => {
      addProductResult1 = await result.current.actions.addProduct(product1);
      addProductResult2 = await result.current.actions.addProduct(product2);
    });

    expect(result.current.state.products).toHaveLength(2);
    expect(result.current.state.products).toEqual([
      { ...product1, amount: 1 },
      { ...product2, amount: 1 }
    ]);

    expect(addProductResult1).toEqual({ status: 'success' });
    expect(addProductResult2).toEqual({ status: 'success' });
  });

  it('should increment amount of product when its already in the list', async () => {
    getStockByProductIdSpy.mockResolvedValue({ status: 200, data: { id: product1.id, amount: 3 } });

    let addProductResult;

    await act(async () => {
      await result.current.actions.addProduct(product1);
    });

    expect(result.current.state.products).toHaveLength(1);
    expect(result.current.state.products[0]).toEqual({
      ...product1,
      amount: 1
    });

    await act(async () => {
      addProductResult = await result.current.actions.addProduct(product1);
    });

    expect(result.current.state.products).toHaveLength(1);
    expect(result.current.state.products[0]).toEqual({
      ...product1,
      amount: 2
    });
    expect(addProductResult).toEqual({ status: 'success' });
  });

  it("should not increment the amount of a product if there's no more in stock", async () => {
    getStockByProductIdSpy.mockResolvedValue({ status: 200, data: { id: product1.id, amount: 2 } });

    let addProductResult;

    await act(async () => {
      await result.current.actions.addProduct(product1);
      await result.current.actions.addProduct(product1);
      addProductResult = await result.current.actions.addProduct(product1);
    });

    expect(result.current.state.products).toHaveLength(1);
    expect(result.current.state.products[0]).toEqual({
      ...product1,
      amount: 2
    });

    expect(addProductResult).toEqual({
      status: 'fail',
      message: 'Requested amount is currently out of stock'
    });
  });

  it('should remove a product correctly', async () => {
    getStockByProductIdSpy.mockResolvedValue({ status: 200, data: { id: product1.id, amount: 3 } });

    await act(async () => {
      await result.current.actions.addProduct(product1);
      await result.current.actions.addProduct(product1);
    });

    expect(result.current.state.products).toHaveLength(1);

    act(() => {
      result.current.actions.removeProduct(product1);
    });

    expect(result.current.state.products).toHaveLength(0);
  });

  it('should decrement the product.amount correctly', async () => {
    getStockByProductIdSpy.mockResolvedValue({ status: 200, data: { id: product1.id, amount: 3 } });

    await act(async () => {
      await result.current.actions.addProduct(product1);
      await result.current.actions.addProduct(product1);
      await result.current.actions.addProduct(product1);
    });

    expect(result.current.state.products).toHaveLength(1);
    expect(result.current.state.products[0].amount).toBe(3);

    act(() => {
      result.current.actions.decrementProductAmount(product1);
    });

    expect(result.current.state.products).toHaveLength(1);
    expect(result.current.state.products[0].amount).toBe(2);
  });

  it('should remove a product when decrement a product with amount 1', async () => {
    getStockByProductIdSpy.mockResolvedValue({ status: 200, data: { id: product1.id, amount: 3 } });

    await act(async () => {
      await result.current.actions.addProduct(product1);
    });

    expect(result.current.state.products).toHaveLength(1);

    act(() => {
      result.current.actions.decrementProductAmount(product1);
    });

    expect(result.current.state.products).toHaveLength(0);
  });

  it('should remove all products correctly', async () => {
    getStockByProductIdSpy
      .mockResolvedValueOnce({ status: 200, data: { id: product1.id, amount: 2 } })
      .mockResolvedValueOnce({ status: 200, data: { id: product2.id, amount: 2 } });

    await act(async () => {
      await result.current.actions.addProduct(product1);
      await result.current.actions.addProduct(product2);
    });

    expect(result.current.state.products).toHaveLength(2);

    act(() => {
      result.current.actions.clear();
    });

    expect(result.current.state.products).toHaveLength(0);
  });
});
