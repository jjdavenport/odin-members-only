import { useEffect, useState } from "react";
import { Wrapper, Container } from "./components";
import { Outlet } from "react-router";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const authenticate = async () => {
    try {
      const response = await fetch("/api/auth/status/", {
        credentials: "include",
      });
      const result = await response.json();
      setLoggedIn(result.loggedIn);
    } catch {
      console.log("failed to fetch");
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <>
      <Wrapper>
        <Container>
          <Outlet context={{ loggedIn, setLoggedIn }} />
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
