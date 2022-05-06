import * as S from './Header.styles';
import { MdShoppingBasket } from 'react-icons/md';
import Link from 'next/link';
import useCartStore from 'store/cart/cart.store';
import { formatNumberToCurrency } from 'utils/formatNumberToCurrency/formatNumberToCurrency';

function Header() {
  const productsOnCart = useCartStore((store) => store.state.products);
  const totalPrice = useCartStore((store) => store.state.totalPrice);

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
        <div className='cart-data'>
          <strong>My cart</strong>
          <span data-testid='products-amount'>{getProductsAmountLabel()}</span>
        </div>
        <MdShoppingBasket size={36} color='#FFF' />

        <S.CartItemsDropdown>
          {productsOnCart.length > 0 ? (
            <>
              <ul>
                {productsOnCart.map((product) => (
                  <li key={product.id}>
                    <div className='image'>
                      <img src={product.image} alt={product.title} />
                    </div>

                    <div className='data'>
                      <span className='title'>{product.title}</span>

                      <span>
                        {product.amount} x <strong>{formatNumberToCurrency(product.price)}</strong>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className='total'>
                <span>Total:</span>
                <strong>{formatNumberToCurrency(totalPrice)}</strong>
              </div>
            </>
          ) : (
            <>
              <p className='empty'>
                Your cart is empty. <br /> Go shopping 😁
              </p>
            </>
          )}
        </S.CartItemsDropdown>
      </S.Cart>
    </S.Wrapper>
  );
}

export default Header;
