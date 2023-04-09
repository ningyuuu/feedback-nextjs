import { removeSession } from "@/lib/auth";
import { fetchGet } from "@/lib/fetch";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export const AppNavBar = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectIfNotLoggedIn = async () => {
      try {
        await fetchGet("/api/users/test");
      } catch (err: any) {
        router.push("/login");
      }
    };

    redirectIfNotLoggedIn();
  }, [router]);

  const logout = () => {
    removeSession();
    router.push("/login");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">QuickFeedback</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/projects">Projects</Nav.Link>
          <Nav.Link href="/vault">Vault</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
