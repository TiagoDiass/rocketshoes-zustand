import { useMemo, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { ImSpinner2 } from 'react-icons/im';
import useCartStore from 'store/cart/cart.store';
import { Product } from 'types';
import * as S from './ProductCard.styles';
import { formatNumberToCurrency } from 'utils/formatNumberToCurrency/formatNumberToCurrency';

export default function ProductCard(product: Product) {
  const addProductToCart = useCartStore((store) => store.actions.addProduct);
  const [isLoading, setIsLoading] = useState(false);
  const { title, image, price } = product;
  const formattedPrice = useMemo(() => formatNumberToCurrency(price), [price]);

  const handleAddProductToCart = async () => {
    setIsLoading(true);
    const { status, message } = await addProductToCart(product);
    setIsLoading(false);

    if (status === 'fail') {
      // it should be a toast, but this is just an example project to check the way zustand works
      alert(message);
    }
  };

  return (
    <S.Wrapper>
      <S.Image src={image} alt={title} loading='lazy' />

      <S.Info>
        <span className='title'>{title}</span>
        <span className='price'>{formattedPrice}</span>
      </S.Info>

      <S.Button onClick={handleAddProductToCart}>
        <div className={`amount ${isLoading && 'loading'}`}>
          {isLoading ? (
            <ImSpinner2 aria-label='Loading...' />
          ) : (
            <MdAddShoppingCart aria-label='Shopping Cart Icon' />
          )}
        </div>
        <span className='text'>Add to cart</span>
      </S.Button>
    </S.Wrapper>
  );
}
