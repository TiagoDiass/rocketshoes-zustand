import * as S from './Header.styles';
import { MdShoppingBasket } from 'react-icons/md';
import Link from 'next/link';
import useCartStore from 'store/cart/cart.store';

function Header() {
  const productsOnCart = useCartStore((store) => store.state.products);

  const getProductsAmountLabel = () => {
    switch (productsOnCart.length) {
      case 0:
        return 'No items';
      case 1:
        return '1 item';
      default:
        return `${productsOnCart.length} items`;
    }
  };

  return (
    <S.Wrapper>
      <Link href='/'>
        <img src='/img/logo-rocketshoes.svg' alt='Rocketshoes' />
      </Link>

      <S.Cart>
        <div>
          <strong>My cart</strong>
          <span data-testid='products-amount'>{getProductsAmountLabel()}</span>
        </div>
        <MdShoppingBasket size={36} color='#FFF' />
      </S.Cart>
    </S.Wrapper>
  );
}

export default Header;
