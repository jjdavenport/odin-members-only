import { useEffect, useState } from "react";
import { Wrapper, Container } from "./components";
import { Outlet } from "react-router";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);

  const authenticate = async () => {
    try {
      const response = await fetch("/api/auth/status/", {
        credentials: "include",
      });
      const result = await response.json();
      setLoggedIn(result.loggedIn);
      setAdmin(result.admin);
      return result;
    } catch {
      setLoggedIn(false);
      setAdmin(false);
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
          <Outlet
            context={{ loggedIn, setLoggedIn, admin, setAdmin, authenticate }}
          />
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
