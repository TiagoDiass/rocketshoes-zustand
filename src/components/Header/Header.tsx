import * as S from './Header.styles';
import { MdShoppingBasket } from 'react-icons/md';
import Link from 'next/link';

function Header() {
  return (
    <S.Wrapper>
      <Link href='/'>
        <img src='/img/logo-rocketshoes.svg' alt='Rocketshoes' />
      </Link>

      <S.Cart>
        <div>
          <strong>Meu carrinho</strong>
          <span>4 itens</span>
        </div>
        <MdShoppingBasket size={36} color='#FFF' />
      </S.Cart>
    </S.Wrapper>
  );
}

export default Header;
