import { useEffect, useState } from "react";
import {
  Login,
  Register,
  Header,
  Messages,
  Message,
  NewMessage,
  PassCode,
} from "../components";
import { Link, useOutletContext, useParams } from "react-router";

export const AdminPage = () => {
  return (
    <>
      <Header />
      <PassCode />
    </>
  );
};

export const LoginPage = () => {
  return (
    <>
      <Header />
      <Login />
    </>
  );
};

export const RegisterPage = () => {
  return (
    <>
      <Header />
      <Register />
    </>
  );
};

export const NewMessagePage = () => {
  return (
    <>
      <Header />
      <NewMessage />
    </>
  );
};

type OutletType = {
  loggedIn: boolean;
};

export const HomePage = () => {
  const { loggedIn } = useOutletContext<OutletType>();
  return (
    <>
      <Header />
      <Link
        className="p-1 text-center outline"
        to={loggedIn ? "/new-message/" : "/login/"}
      >
        New Message
      </Link>
      <Messages />
    </>
  );
};

export const MessagePage = () => {
  const [message, setMessage] = useState(null);
  const { id } = useParams();

  const fetchMessage = async () => {
    try {
      const response = await fetch(`/api/message/${id}`);
      const result = await response.json();
      setMessage(result);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  if (!message) return <div>Loading....</div>;

  return (
    <>
      <Header />
      <Message
        element="div"
        to={`/message/${message.id}`}
        title={message.title}
        message={message.message}
        timestamp={new Date(message.created_at).toLocaleString()}
      />
      <Link className="p-1 text-center outline" to="/">
        Back
      </Link>
    </>
  );
};
