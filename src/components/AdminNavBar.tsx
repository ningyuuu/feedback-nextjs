import { removeSession } from "@/lib/auth";
import { fetchGet } from "@/lib/fetch";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export const AdminNavBar = () => {
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
    <Navbar bg="success" variant="dark">
      <Container>
        <Navbar.Brand href="/admin">QuickFeedback - Admin</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Switch to Instructor Mode</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
