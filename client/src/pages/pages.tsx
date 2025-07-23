import { useEffect, useState } from "react";
import {
  Login,
  Register,
  Header,
  Messages,
  Message,
  NewMessage,
} from "../components";
import { useParams } from "react-router";

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

export const HomePage = () => {
  return (
    <>
      <Header />
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
      console.log(result);
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
        to={`/message/${message.id}`}
        title={message.title}
        message={message.message}
        timestamp={new Date(message.created_at).toLocaleString()}
      />
    </>
  );
};
