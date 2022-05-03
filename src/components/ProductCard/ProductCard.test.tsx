import ProductCard from './ProductCard';
import { renderWithTheme } from 'utils/test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Product } from 'types';
import { renderHook, RenderResult } from '@testing-library/react-hooks';
import useCartStore, { CartStore } from 'store/cart/cart.store';

const product: Product = {
  id: 1,
  title: 'Nike Airmax 90',
  price: 249.9,
  image: 'https://example-image.com'
};

describe('Component: ProductCard', () => {
  let cartStoreResult: RenderResult<CartStore>;

  beforeEach(() => {
    cartStoreResult = renderHook(() => useCartStore()).result;
  });

  it('should render correctly', () => {
    renderWithTheme(<ProductCard {...product} />);

    expect(screen.getByRole('img', { name: product.title })).toBeInTheDocument();
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText('R$ 249,90')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add to cart/ })).toBeInTheDocument();
  });

  it('should call cartStore.addProduct correctly when user clicks on add button', async () => {
    const addProductToCartSpy = jest
      .spyOn(cartStoreResult.current.actions, 'addProduct')
      .mockResolvedValue({
        status: 'success'
      });

    renderWithTheme(<ProductCard {...product} />);

    fireEvent.click(screen.getByRole('button', { name: /Add to cart/ }));

    await waitFor(() => {
      expect(addProductToCartSpy).toHaveBeenCalledTimes(1);
      expect(addProductToCartSpy).toHaveBeenCalledWith(product);
    });
  });
});
