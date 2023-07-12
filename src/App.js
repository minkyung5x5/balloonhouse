import Home from "./Home"
import { createGlobalStyle } from 'styled-components';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Home />
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
  body{
    padding: 0;
    margin: 0;
  }
`;

export default App;
