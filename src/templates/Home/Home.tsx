import { useEffect, useState } from 'react';
import { productService } from 'services/requests';
import { Product } from 'types';

export default function Home() {
  const [, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetch() {
      const response = await productService.getAll();

      if (response.status === 200) {
        setProducts(response.data!);
      }
    }

    fetch();
  }, []);

  return <h1>booyakatcha</h1>;
}
