import { Trash2 } from "lucide-react";
import React, { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router";

type OutletType = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  admin: boolean;
};

export const Header = () => {
  const { loggedIn, setLoggedIn, admin } = useOutletContext<OutletType>();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch("/api/logout/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        setLoggedIn(false);
        navigate("/");
      }
    } catch {
      console.log("failed to logout");
    }
  };

  return (
    <>
      <header className="flex w-full items-end justify-between gap-4">
        <Link className="text-xl font-medium" to="/">
          membersOnly
        </Link>
        {loggedIn ? (
          <nav className="flex gap-2">
            {admin || (
              <Link className="hover:underline" to="/admin/">
                Join Admin
              </Link>
            )}
            <button className="cursor-pointer hover:underline" onClick={logout}>
              logout
            </button>
          </nav>
        ) : (
          <nav className="flex gap-2">
            <Link className="hover:underline" to="/login">
              login
            </Link>
            <Link className="hover:underline" to="/register">
              Sign up
            </Link>
          </nav>
        )}
      </header>
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
      <div className="flex max-w-sm flex-col gap-1 p-4">{children}</div>
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
  const { setLoggedIn } = useOutletContext<OutletType>();

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/login/check-email/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: input.email }),
    });

    const { exists } = await response.json();

    const errors: LoginErrorsType = {};

    if (input.email === "") {
      errors.email = "cannot be blank";
    } else if (!exists) {
      errors.email = "email does not exist";
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
          username: input.email,
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
        setLoggedIn(true); // update with /status/
        navigate("/");
      }
    } catch {
      setError({
        email: "server error",
        password: "server error",
      });
    }
  };

  const handleEmailBlur = async () => {
    const response = await fetch("/api/login/check-email/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: input.email }),
    });

    const { exists } = await response.json();

    const errors: LoginErrorsType = {};

    if (input.email === "") {
      errors.email = "Cannot be empty";
    } else if (!exists) {
      errors.email = "email does not exist";
    } else {
      errors.email = "";
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
    } else {
      errors.password = "";
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
              setInput((prev) => ({ ...prev, email: e.target.value }))
            }
            value={input.email}
            placeholder="Enter your email"
            type="email"
            label="email"
          />
          <Input
            element="input"
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
  const [error, setError] = useState<RegisterErrorsType>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const onSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();

    const response = await fetch("/api/register/check-email/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: input.email,
      }),
    });

    const { available } = await response.json();

    const errors: RegisterErrorsType = {};

    if (input.email === "") {
      errors.email = "cannot be blank";
    } else if (!input.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "not a valid email";
    } else if (!available) {
      errors.email = "email is already registered";
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
      setError(errors);
      return;
    }

    try {
      await fetch("/api/register/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          password: input.password,
          confirmPassword: input.confirmPassword,
        }),
      });
      setInput({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login/");
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

  const handleEmailBlur = async () => {
    const response = await fetch("/api/register/check-email/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: input.email }),
    });

    const { available } = await response.json();

    const errors: RegisterErrorsType = {};

    if (input.email === "") {
      errors.email = "Cannot be empty";
    } else if (!input.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "must be a valid email";
    } else if (!available) {
      errors.email = "email is already registered";
    } else {
      errors.email = "";
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
    } else if (input.password.length < 8) {
      errors.password = "password must be 8 characters or more";
    } else {
      errors.password = "";
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
    } else if (input.confirmPassword.length < 8) {
      errors.confirmPassword = "password must be 8 characters or more";
    } else if (input.confirmPassword !== input.password) {
      errors.confirmPassword = "passwords must match";
    } else {
      errors.confirmPassword = "";
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
    } else {
      errors.firstName = "";
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
    } else {
      errors.lastName = "";
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
              setInput((prev) => ({ ...prev, email: e.target.value }))
            }
            value={input.email}
            label="email"
            type="email"
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
        noValidate
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
  error: string | undefined;
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

export const Button = ({ text }: ButtonProp) => {
  return (
    <>
      <button type="submit" className="cursor-pointer p-1 outline">
        {text}
      </button>
    </>
  );
};

type PasscodeOutletType = {
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PassCode = () => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const { setAdmin } = useOutletContext<PasscodeOutletType>();
  const navigate = useNavigate();

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passcode === "") {
      setError("cannot be blank");
    } else setError("");

    try {
      const response = await fetch("/api/auth/admin/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ passcode: passcode }),
      });

      if (response.ok) {
        setPasscode("");
        setError("");
        setAdmin(true);
        navigate("/");
      } else if (response.status === 401) {
        setError("incorrect password");
      } else {
        setError("server error");
      }
    } catch {
      setError("server error");
    }
  };

  const handleBlur = () => {
    if (passcode === "") {
      setError("cannot be blank");
    } else {
      setError("");
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
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
      </Form>
    </>
  );
};

type NewMessageErrorsType = {
  title?: string;
  message?: string;
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
  const navigate = useNavigate();

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: NewMessageErrorsType = {};

    if (input.title === "") {
      errors.title = "cannot be blank";
    }

    if (input.message === "") {
      errors.message = "cannot be blank";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }

    try {
      const response = await fetch("/api/auth/new-message/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: input.title, message: input.message }),
      });
      if (response.ok) {
        navigate("/");
      }
    } catch {
      console.log("failed to post");
    }
  };

  const handleTitleBlur = () => {
    const errors: NewMessageErrorsType = {};

    if (input.title === "") {
      errors.title = "cannot be blank";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }
  };

  const handleMessageBlur = () => {
    const errors: NewMessageErrorsType = {};

    if (input.message === "") {
      errors.message = "cannot be blank";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }
  };

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
          value={input.message}
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
  pageId?: string;
  element: "link" | "div";
};

type OutletProp = {
  admin: boolean;
};

export const Message = ({
  title,
  timestamp,
  message,
  pageId,
  element,
}: MessageProps) => {
  const { admin } = useOutletContext<OutletProp>();
  const { id } = useParams();
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      const response = await fetch(`/api/admin/delete-message/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        navigate("/");
      }
    } catch {
      console.log("failed to delete");
    }
  };

  return (
    <>
      {element === "link" ? (
        <Link to={pageId} className="flex flex-col items-end p-4 outline">
          <div className="flex w-full justify-between gap-4">
            <span>{title}</span>
            <span>{timestamp}</span>
          </div>
          <p className="w-full">{message}</p>
        </Link>
      ) : (
        <div className="flex flex-col items-end p-4 outline">
          <div className="flex w-full justify-between gap-4">
            <span>{title}</span>
            <span>{timestamp}</span>
          </div>
          <p className="w-full">{message}</p>
          {admin && (
            <button className="cursor-pointer" onClick={onClick}>
              <Trash2 className="hover:text-red-600" />
            </button>
          )}
        </div>
      )}
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
    <ul className="flex flex-col gap-2">
      {data.map((i, index) => (
        <li key={index}>
          <Message
            element="link"
            pageId={`/message/${i.id}`}
            title={i.title}
            message={i.message}
            timestamp={new Date(i.created_at).toLocaleString()}
          />
        </li>
      ))}
    </ul>
  );
};
