import { useEffect, useState } from "react";
import { Login, Register, Title, Messages, Message } from "../components";
import { useParams } from "react-router";

export const LoginPage = () => {
  return (
    <>
      <Title />
      <Login />
    </>
  );
};

export const RegisterPage = () => {
  return (
    <>
      <Title />
      <Register />
    </>
  );
};

export const NewMessage = () => {
  return (
    <>
      <Title />
    </>
  );
};

export const HomePage = () => {
  return (
    <>
      <Title />
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
      <Title />
      <Message
        to={`/message/${message.id}`}
        title={message.title}
        message={message.message}
        timestamp={new Date(message.created_at).toLocaleString()}
      />
    </>
  );
};
