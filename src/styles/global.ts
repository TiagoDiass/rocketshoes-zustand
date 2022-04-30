import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    min-height: 100%;
    background-color: var(--primary);
  }

  body {
    background: #191920 url('/img/background.svg') no-repeat center top;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }

  *, button, input {
    border: 0;
    background: none;
    font-family: 'Roboto', sans-serif;
    transition: color .2s ease-out;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  #__next {
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 20px 50px;
  }
`;

export default GlobalStyles;
