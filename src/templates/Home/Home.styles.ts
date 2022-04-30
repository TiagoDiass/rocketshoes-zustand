import styled from 'styled-components';

export const Wrapper = styled.main``;

export const ProductsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  li {
    background-color: #fff;
    border-radius: 7px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    > .product-img {
      width: 100%;
      align-self: center;
    }

    > .product-info {
      display: flex;
      row-gap: 8px;
      flex-direction: column;

      > .title {
        font-size: 1.07rem;
        font-weight: 600;
        line-height: 20px;
      }

      > .price {
        font-size: 1.3rem;
        font-weight: 900;
      }
    }

    > .product-button {
      margin-top: auto;
      display: flex;
      align-items: center;
      outline: none;
      border-radius: 4px;
      background-color: #7159c1;
      color: #fff;
      transition: background 0.22s ease;

      &:hover {
        background: #674ebd;
      }

      > .amount {
        padding: 12px;
        display: flex;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.1);
      }

      > .text {
        flex: 1;
        text-align: center;
        text-transform: uppercase;
        font-weight: 500;
      }
    }
  }
`;
