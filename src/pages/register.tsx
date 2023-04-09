import { fetchPost } from "@/lib/fetch";
import { ChangeEvent, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const RegistrationPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");

  const register = async () => {
    if (!password) {
      return;
    }

    if (password !== reenterPassword) {
      return;
    }

    let response;
    try {
      response = await fetchPost("/api/users", { login, password });
    } catch (err: any) {
      console.log(err);
    }

    console.log({ response });
  };

  const updateLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setLogin(target.value);
  };

  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setPassword(target.value);
  };

  const updateReenterPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setReenterPassword(target.value);
  };

  return (
    <Container>
      <h1>Register</h1>
      <Form className="mt-6">
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={updateLogin}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={updatePassword}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formReenterPassword">
          <Form.Label>Reenter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={updateReenterPassword}
          />
        </Form.Group>

        <Button variant="primary" onClick={register}>
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegistrationPage;
