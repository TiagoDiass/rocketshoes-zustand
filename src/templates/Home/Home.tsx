import { ProductCard } from 'components';
import { useEffect } from 'react';
import useProductsStore from 'store/products/products.store';

import * as S from './Home.styles';

export default function Home() {
  const products = useProductsStore((store) => store.products);
  const fetchProducts = useProductsStore((store) => store.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <S.Wrapper>
      <S.ProductsList>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </S.ProductsList>
    </S.Wrapper>
  );
}
