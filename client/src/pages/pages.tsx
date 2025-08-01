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
      <Link className="p-1 text-center outline" to="/">
        Back
      </Link>
    </>
  );
};

export const LoginPage = () => {
  return (
    <>
      <Header />
      <Login />
      <Link className="p-1 text-center outline" to="/">
        Back
      </Link>
    </>
  );
};

export const RegisterPage = () => {
  return (
    <>
      <Header />
      <Register />
      <Link className="p-1 text-center outline" to="/">
        Back
      </Link>
    </>
  );
};

export const NewMessagePage = () => {
  return (
    <>
      <Header />
      <NewMessage />
      <Link className="p-1 text-center outline" to="/">
        Back
      </Link>
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

type MessageType = {
  id: string;
  first_name: string;
  title: string;
  message: string;
  created_at: string;
};

export const MessagePage = () => {
  const [message, setMessage] = useState<MessageType | null>(null);
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
        author={message.first_name}
        element="div"
        pageId={`/message/${message.id}`}
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
