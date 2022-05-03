import Header from './Header';
import { renderWithTheme } from 'utils/test-utils';
import { screen } from '@testing-library/react';
import { renderHook, RenderResult } from '@testing-library/react-hooks';
import useCartStore, { CartStore } from 'store/cart/cart.store';

describe('Component: Header', () => {
  let result: RenderResult<CartStore>;

  beforeEach(() => {
    result = renderHook(() => useCartStore()).result;
  });

  it('should render correctly', () => {
    renderWithTheme(<Header />);

    expect(screen.getByRole('img', { name: 'Rocketshoes' })).toBeInTheDocument();
    expect(screen.getByText('My cart')).toBeInTheDocument();
  });

  it('should render products amount correctly when amount is 0', () => {
    result.current.state.products = [];

    renderWithTheme(<Header />);

    expect(screen.getByTestId('products-amount')).toHaveTextContent('No items');
  });

  it('should render products amount correctly when amount is 1', () => {
    result.current.state.products = [
      {
        id: 1,
        title: 'Nike Airmax 90',
        price: 249.9,
        image: 'https://example-image.com',
        amount: 1
      }
    ];

    renderWithTheme(<Header />);

    expect(screen.getByTestId('products-amount')).toHaveTextContent('1 item');
  });

  it('should render products amount correctly when amount is greater than 1', () => {
    result.current.state.products = [
      {
        id: 1,
        title: 'Nike Airmax 90',
        price: 249.9,
        image: 'https://example-image.com',
        amount: 1
      },
      {
        id: 2,
        title: 'Adidas Superstars',
        price: 199.9,
        image: 'https://example-image.com',
        amount: 1
      }
    ];

    renderWithTheme(<Header />);

    expect(screen.getByTestId('products-amount')).toHaveTextContent('2 items');
  });
});
