import styled from 'styled-components';

export const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
  color: #fff;
`;

export const Cart = styled.div`
  display: flex;
  align-items: center;
  > div {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    span {
      text-align: right;
      font-size: 0.8rem;
      color: #999;
    }
  }
`;
