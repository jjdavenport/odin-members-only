import { type ReactNode } from "react";
import { Link } from "react-router";

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

export const Login = () => {
  const onSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <div>
          <Input
            placeholder="Enter your username"
            type="text"
            label="Username"
          />
          <Input
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

export const Register = () => {
  const onSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <div>
          <Input label="username" type="text" placeholder="username" />
          <Input label="password" type="password" placeholder="password" />
          <Input
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
};

const Input = ({ label, type, placeholder }: InputProps) => {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={label}>{label}</label>
        <input className="p-1 outline" placeholder={placeholder} type={type} />
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
      <button className="cursor-pointer p-1 outline">{text}</button>
    </>
  );
};

export const PassCode = () => {
  return (
    <>
      <form action="POST">
        <Input placeholder="Pass code" label="Passcode" type="password" />
        <Button text="Join" />
      </form>
    </>
  );
};
