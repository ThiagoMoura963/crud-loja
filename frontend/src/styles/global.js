import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    font-family: 'poppins', sans-serif;
}

body {
    width: 100vw;
    height: 100vh;
    background-color: #f2f2f2;
}

.custom-hr {
    background: linear-gradient(to right, transparent, #000, transparent);
    border: none;
    height: 1px;
  }

  textarea {
    resize: none;
  }

`;

export default Global;