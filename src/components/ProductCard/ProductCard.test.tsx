import ProductCard from './ProductCard';
import { renderWithTheme } from 'utils/test-utils';
import { screen } from '@testing-library/react';
import { Product } from 'types';

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    const product: Product = {
      id: 1,
      title: 'Nike Airmax 90',
      price: 249.9,
      image: 'https://example-image.com'
    };

    renderWithTheme(<ProductCard {...product} />);

    expect(screen.getByRole('img', { name: product.title })).toBeInTheDocument();
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText('R$ 249,90')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeInTheDocument();
  });

  it.todo('should call store.addProductToCart correctly when user clicks on add button');
});
