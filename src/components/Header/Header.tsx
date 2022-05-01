import * as S from './Header.styles';
import { MdShoppingBasket } from 'react-icons/md';
import Link from 'next/link';
import useCartStore from 'store/cart/cart.store';

function Header() {
  const productsOnCart = useCartStore((store) => store.state.products);

  // const getProductsAmountLabel = () => {
  //   switch (productsOnCart.length) {
  //     case 0:
  //       return 'Nenhum item';
  //     case 1:
  //       return '1 item';
  //     default:
  //       return `${productsOnCart.length} itens`;
  //   }
  // };

  return (
    <S.Wrapper>
      <Link href='/'>
        <img src='/img/logo-rocketshoes.svg' alt='Rocketshoes' />
      </Link>

      <S.Cart>
        <div>
          <strong>Meu carrinho</strong>
          <span>
            {productsOnCart.length > 0 ? `${productsOnCart.length} itens` : 'Nenhum item'}
          </span>
        </div>
        <MdShoppingBasket size={36} color='#FFF' />
      </S.Cart>
    </S.Wrapper>
  );
}

export default Header;
