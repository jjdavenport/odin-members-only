import { Wrapper, Container } from "./components";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Wrapper>
        <Container>
          <Outlet />
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
