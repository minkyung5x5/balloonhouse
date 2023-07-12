import Balloon from "./Balloon"
import House from "./House"
import styled, { createGlobalStyle } from 'styled-components';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Sky>
        <Balloon />
        <House />
      </Sky>
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
  body{
    padding: 0;
    margin: 0;
  }
`;

const Sky = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgb(255, 141, 141), rgb(33, 59, 255));
`;

export default App;
