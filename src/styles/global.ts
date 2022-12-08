import { createGlobalStyle } from 'styled-components';

import { devices, pxToRem } from '../utils/stylingHelpers';

export const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html,
  body {
    background-color: black;
  }

  html {
    font-family: proxima-nova, -apple-system, BlinkMacSystemFont, Segoe UI,
      Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background-color: ${props => props.theme.black};
    color: ${props => props.theme.white};
  }

  h1 {
    text-align: center;
    font-size: 3rem;
  }

  a {
    color: ${({ theme }) => theme.yellow};
    font-weight: 600;
  }

  // Global Classes
  .container {
    margin: 0 auto;
    max-width: 1100px;
    padding: ${pxToRem(50)};
  }

  .yellow-border {
    padding: 0;
    margin: 0;
    background-color: ${({ theme }) => theme.yellow};
    height: 5px;
    width: 100%;
  }

  .red {
    background-color: rgba(255, 0, 0, 0.2);
    color: red;
    border-color: red;
  }

  .red:hover,
  .red.selected {
    background-color: rgba(255, 0, 0, 0.5);
  }

  .blue {
    background-color: rgba(0, 0, 255, 0.1);
    color: rgb(0, 120, 255);
    border-color: blue;
  }

  .blue:hover,
  .blue.selected {
    background-color: rgba(0, 0, 255, 0.5);
  }

  .cyan {
    background-color: rgba(0, 255, 255, 0.2);
    color: cyan;
    border-color: cyan;
  }

  .cyan:hover,
  .cyan.selected {
    background-color: rgba(0, 255, 255, 0.5);
  }

  .orange {
    background-color: rgba(255, 165, 0, 0.2);
    color: orange;
    border-color: orange;
  }

  .orange:hover,
  .orange.selected {
    background-color: rgba(255, 165, 0, 0.5);
  }

  .lime {
    background-color: rgba(0, 255, 0, 0.2);
    color: lime;
    border-color: lime;
  }

  .lime:hover,
  .lime.selected {
    background-color: rgba(0, 255, 0, 0.5);
  }

  .white {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border-color: white;
  }

  .white:hover,
  .white.selected {
    background-color: rgba(255, 255, 255, 0.5);
  }

  .rebeccapurple {
    background-color: rgba(102, 51, 153, 0.2);
    color: rebeccapurple;
    border-color: rebeccapurple;
  }

  .rebeccapurple:hover,
  .rebeccapurple.selected {
    background-color: rgba(102, 51, 153, 0.5);
  }

  .yellow {
    background-color: rgba(255, 255, 0, 0.2);
    color: yellow;
    border-color: yellow;
  }

  .yellow:hover,
  .yellow.selected {
    background-color: rgba(255, 255, 0, 0.5);
  }

  @media ${devices.mobileL} {
    html {
      font-size: 87.5%;
    }
  }

  @media ${devices.mobileM} {
    html {
      font-size: 85%;
    }
  }

  @media ${devices.mobileS} {
    html {
      font-size: 70%;
    }
  }

  @media (max-width: 270px) {
    html {
      font-size: 60%;
    }
  }
`;
