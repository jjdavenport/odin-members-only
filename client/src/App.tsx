import { useState } from "react";
import { Wrapper, Container } from "./components";
import { Outlet } from "react-router";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <Wrapper>
        <Container>
          <Outlet context={{ loggedIn }} />
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
