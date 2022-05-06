import styled from 'styled-components';

export const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
  color: #fff;
`;

export const CartItemsDropdown = styled.div`
  opacity: 0;
  display: flex;
  visibility: hidden;
  transform: translateY(10px);

  transition: all 0.3s ease;

  flex-direction: column;
  justify-content: center;
  width: 300%;
  min-height: 100px;
  background-color: #7159c1;

  z-index: 10;
  position: absolute;
  top: 110%;
  left: -200%;
  border-radius: 6px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 24px;

  padding: 0.8rem 1rem;

  .empty {
    font-size: 1.1rem;
    text-align: center;
    align-self: center;
  }

  ul {
    display: flex;
    flex-direction: column;
    row-gap: 0.3rem;
  }

  ul li {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;

    .image {
      width: 25%;

      img {
        width: 100%;

        border-radius: 6px;
      }
    }

    .data {
      width: 75%;
      display: flex;
      flex-direction: column;
    }
  }

  .total {
    margin-top: 1rem;
    padding-top: 0.8rem;
    border-top: 1px dotted white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 1.3rem;
    }
  }
`;

export const Cart = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  > div.cart-data {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    cursor: pointer;

    span {
      text-align: right;
      font-size: 0.8rem;
      color: #999;
    }
  }

  &:hover ${CartItemsDropdown} {
    opacity: 1;
    visibility: visible;
    transform: none;
  }
`;
