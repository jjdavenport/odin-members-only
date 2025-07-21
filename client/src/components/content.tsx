import React, { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router";

export const Title = () => {
  return (
    <>
      <Link className="text-xl font-medium" to="/">
        membersOnly
      </Link>
    </>
  );
};

type Prop = {
  children: ReactNode;
};

export const Wrapper = ({ children }: Prop) => {
  return (
    <>
      <div className="flex min-h-screen w-full justify-center">{children}</div>
    </>
  );
};

export const Container = ({ children }: Prop) => {
  return (
    <>
      <div className="max-w-sm justify-center p-4">{children}</div>
    </>
  );
};

type LoginErrorsType = {
  email?: string;
  password?: string;
};

export const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: LoginErrorsType = {};

    if (input.email === "") {
      errors.email = "cannot be blank";
    }

    if (input.password === "") {
      errors.password = "cannot be blank";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }

    try {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: input.email,
          password: input.password,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError((prev) => ({ ...prev, password: "incorrect password" }));
        }
      } else {
        setError({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch {
      setError({
        email: "server error",
        password: "server error",
      });
    }
  };

  const handleEmailBlur = () => {
    const errors: LoginErrorsType = {};

    if (input.email === "") {
      errors.email = "Cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }
  };

  const handlePasswordBlur = () => {
    const errors: LoginErrorsType = {};

    if (input.password === "") {
      errors.password = "Cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <div>
          <Input
            onBlur={handleEmailBlur}
            error={error.email}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, username: e.target.value }))
            }
            value={input.email}
            placeholder="Enter your username"
            type="text"
            label="Username"
          />
          <Input
            onBlur={handlePasswordBlur}
            error={error.password}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, password: e.target.value }))
            }
            value={input.password}
            placeholder="Enter your password"
            type="password"
            label="Password"
          />
        </div>
        <Button text="Log in" />
      </Form>
    </>
  );
};

type RegisterErrorsType = {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
};

export const Register = () => {
  const [input, setInput] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();

    const errors: RegisterErrorsType = {};

    if (input.email === "") {
      errors.email = "cannot be blank";
    }

    if (input.password === "") {
      errors.password = "cannot be blank";
    }

    if (input.confirmPassword === "") {
      errors.confirmPassword = "cannot be blank";
    }

    if (input.firstName === "") {
      errors.firstName = "cannot be blank";
    }

    if (input.lastName === "") {
      errors.lastName = "cannot be blank";
    }

    if (Object.keys(errors).length > 0) {
      setError({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
      });
      return;
    }

    try {
      const response = await fetch("/api/register/", {
        body: JSON.stringify({
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          password: input.password,
          confirmPassword: input.confirmPassword,
        }),
      });
    } catch {
      setError({
        email: "server error",
        firstName: "server error",
        lastName: "server error",
        password: "server error",
        confirmPassword: "server error",
      });
    }
  };

  const handleEmailBlur = () => {
    const errors: RegisterErrorsType = {};

    if (input.email === "") {
      errors.email = "Cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }
  };

  const handlePasswordBlur = () => {
    const errors: RegisterErrorsType = {};

    if (input.password === "") {
      errors.password = "Cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }
  };

  const handleConfirmPasswordBlur = () => {
    const errors: RegisterErrorsType = {};

    if (input.confirmPassword === "") {
      errors.confirmPassword = "Cannot be empty";
    } else if (input.confirmPassword !== input.password) {
      errors.confirmPassword = "passwords must match";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }
  };

  const handleFirstNameBlur = () => {
    const errors: RegisterErrorsType = {};

    if (input.firstName === "") {
      errors.firstName = "Cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }
  };

  const handleLastNameBlur = () => {
    const errors: RegisterErrorsType = {};

    if (input.lastName === "") {
      errors.lastName = "Cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <div>
          <Input
            element="input"
            onBlur={handleEmailBlur}
            error={error.email}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, username: e.target.value }))
            }
            value={input.email}
            label="email"
            type="text"
            placeholder="email"
          />
          <Input
            element="input"
            onBlur={handleFirstNameBlur}
            error={error.firstName}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, firstName: e.target.value }))
            }
            value={input.firstName}
            label="first name"
            type="text"
            placeholder="first name"
          />
          <Input
            element="input"
            onBlur={handleLastNameBlur}
            error={error.lastName}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, lastName: e.target.value }))
            }
            value={input.lastName}
            label="last name"
            type="text"
            placeholder="last name"
          />
          <Input
            element="input"
            onBlur={handlePasswordBlur}
            error={error.password}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, password: e.target.value }))
            }
            value={input.password}
            label="password"
            type="password"
            placeholder="password"
          />
          <Input
            element="input"
            onBlur={handleConfirmPasswordBlur}
            error={error.confirmPassword}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, confirmPassword: e.target.value }))
            }
            value={input.confirmPassword}
            label="confirm password"
            type="password"
            placeholder="confirm password"
          />
        </div>
        <Button text="Sign up" />
      </Form>
    </>
  );
};

type FormProps = {
  children: ReactNode;
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
};

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 p-4 outline"
        action="POST"
      >
        {children}
      </form>
    </>
  );
};

type InputProps = {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error: string;
  onBlur: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  element: "input" | "textarea";
};

const Input = ({
  element,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  onBlur,
}: InputProps) => {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={label}>{label}</label>
        {element === "input" ? (
          <input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            className={`${error === "" ? "outline-black" : "outline-red-600"} p-1 outline`}
            placeholder={placeholder}
            type={type}
          />
        ) : (
          <textarea
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            className={`${error === "" ? "outline-black" : "outline-red-600"} p-1 outline`}
            placeholder={placeholder}
          />
        )}

        {error !== "" && <span>{error}</span>}
      </div>
    </>
  );
};

type ButtonProp = {
  text: string;
};

const Button = ({ text }: ButtonProp) => {
  return (
    <>
      <button type="submit" className="cursor-pointer p-1 outline">
        {text}
      </button>
    </>
  );
};

export const PassCode = () => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  const handleBlur = () => {
    if (passcode === "") {
      setError("cannot be blank");
    }

    if (error !== "") {
      return;
    }
  };

  return (
    <>
      <form action="POST">
        <Input
          element="input"
          error={error}
          onChange={(e) => setPasscode(e.target.value)}
          value={passcode}
          onBlur={handleBlur}
          placeholder="Pass code"
          label="Passcode"
          type="password"
        />
        <Button text="Join" />
      </form>
    </>
  );
};

export const NewMessage = () => {
  const [input, setInput] = useState({
    title: "",
    message: "",
  });
  const [error, setError] = useState({
    title: "",
    message: "",
  });

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleTitleBlur = () => {};

  const handleMessageBlur = () => {};

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          error={error.title}
          onBlur={handleTitleBlur}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, title: e.target.value }))
          }
          value={input.title}
          element="input"
          placeholder="title"
          label="title"
        />
        <Input
          type="text"
          error={error.message}
          onBlur={handleMessageBlur}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, message: e.target.value }))
          }
          value={input.title}
          element="textarea"
          placeholder="message"
          label="message"
        />
        <Button text="Post" />
      </Form>
    </>
  );
};

type MessageProps = {
  title: string;
  timestamp: string;
  message: string;
};

const Message = ({ title, timestamp, message }: MessageProps) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <span>{title}</span>
          <span>{timestamp}</span>
        </div>
        <p>{message}</p>
      </div>
    </>
  );
};

export const Messages = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/get-messages/");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <ul>
      {data.map((i, index) => (
        <li key={index}>
          <Message
            title={i.title}
            message={i.message}
            timestamp={i.timestamp}
          />
        </li>
      ))}
    </ul>
  );
};
