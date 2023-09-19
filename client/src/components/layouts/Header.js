import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { Button } from "react-bootstrap";

const Header = () => {
  const {auth, handleLogout} = useContext(AuthContext);
  const isLogin = auth.isAuthenticated;
  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-danger header">
      <Container>
        <Navbar.Brand href="#home">LifeLink</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Trang chủ</Nav.Link>
            {isLogin && <Nav.Link href="profile">Thông tin cá nhân</Nav.Link>}
            {!isLogin && <Nav.Link href="login">Đăng nhập</Nav.Link>}
            {!isLogin && <Nav.Link href="register">Đăng ký</Nav.Link>}
            {isLogin && <Button variant="light" onClick={handleLogout}>Đăng xuất</Button>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
