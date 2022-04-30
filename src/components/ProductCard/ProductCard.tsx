import { MdAddShoppingCart } from 'react-icons/md';
import { Product } from 'types';
import * as S from './ProductCard.styles';

export default function ProductCard(product: Product) {
  const { title, image, price } = product;

  return (
    <S.Wrapper>
      <S.Image src={image} alt={title} />

      <S.Info>
        <span className='title'>{title}</span>
        <span className='price'>R$ {price.toFixed(2).replace('.', ',')}</span>
      </S.Info>

      <S.Button
        onClick={() => {
          console.log(product);
        }}
      >
        <div className='amount'>
          <MdAddShoppingCart />
        </div>
        <span className='text'>Add to cart</span>
      </S.Button>
    </S.Wrapper>
  );
}
