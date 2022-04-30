import { ProductCard } from 'components';
import { useEffect, useState } from 'react';
import { productService } from 'services/requests';
import { Product } from 'types';

import * as S from './Home.styles';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetch() {
      const response = await productService.getAll();

      if (response.status === 200) {
        setProducts(response.data!);
      }
    }

    fetch();
  }, []);

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
