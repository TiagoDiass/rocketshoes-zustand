import { renderHook, RenderResult, act } from '@testing-library/react-hooks';
import { productService } from 'services/requests';
import { Product } from 'types';
import useProductsStore, { ProductsStore } from './products.store';

const productsMock: Product[] = [
  {
    id: 1,
    title: 'Tênis de Caminhada Leve Confortável',
    price: 179.9,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg'
  },
  {
    id: 2,
    title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
    price: 139.9,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg'
  },
  {
    id: 3,
    title: 'Tênis Adidas Duramo Lite 2.0',
    price: 219.9,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg'
  }
];

jest.spyOn(productService, 'getAll').mockResolvedValue({
  status: 200,
  data: productsMock
});

describe('Store: Products', () => {
  let result: RenderResult<ProductsStore>;

  beforeEach(() => {
    result = renderHook(() => useProductsStore()).result;
  });

  it('should start with state.products as an empty array', () => {
    expect(result.current.products).toHaveLength(0);
  });

  it('should fetchProducts correctly', async () => {
    await act(async () => {
      await result.current.fetchProducts();
    });

    expect(result.current.products).toHaveLength(productsMock.length);
    expect(result.current.products).toEqual(productsMock);
  });
});
