import React from "react";
import { Avatar } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { Container, Nav, Navbar ,ButtonGroup , Button} from "react-bootstrap";
import { useLocation } from 'react-router-dom';

export default function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <>
      <Navbar bg={isHomePage ? 'transparent' : 'light'} data-bs-theme="light" style={{ height: "65px",zIndex: 1000 }} className="ps-0">
        <Navbar.Brand href="/" className="justify-content-start">
          <AcmeLogo />
        </Navbar.Brand>

        <Nav className="mx-auto me-auto" style={{ fontSize: "30px" }}>
        <ButtonGroup style={{borderRadius:"10px" }} >
  <Button variant="secondary" href="/" className="me-3" 
  style={{ backgroundColor: "transparent", border: "7px solid transparent" , color:"black" , borderRadius:"10px", fontSize:"25px",fontWeight:"bold"}}
  onMouseOver={(e) => (e.target.style.border = "4px solid #ced4da")}
  onMouseOut={(e) => (e.target.style.border = "4px solid transparent")}
  >
    Home
  </Button>
  <Button variant="secondary" href="/find-friend" className="me-3" 
  style={{ backgroundColor: "transparent", border: "7px solid  transparent" , color:"black" , borderRadius:"10px", fontSize:"25px", fontWeight:"bold"}}
  onMouseOver={(e) => (e.target.style.border = "4px solid #ced4da")}
  onMouseOut={(e) => (e.target.style.border = "4px solid transparent")}
  >
    Finding  Friend
  </Button>
  <Button variant="secondary" href="/challenge" className="me-3" 
  style={{ backgroundColor: "transparent", border: "7px solid transparent" , color:"black" , borderRadius:"10px", fontSize:"25px",fontWeight:"bold"}}
  onMouseOver={(e) => (e.target.style.border = "4px solid #ced4da")}
  onMouseOut={(e) => (e.target.style.border = "4px solid transparent")}
  >
    Challenge
  </Button>
  <Button variant="secondary" href="/ranking" className="me-3" 
  style={{ backgroundColor: "transparent", border: "7px solid transparent" , color:"black" , borderRadius:"10px", fontSize:"25px",fontWeight:"bold"}}
  onMouseOver={(e) => (e.target.style.border = "4px solid #ced4da")}
  onMouseOut={(e) => (e.target.style.border = "4px solid transparent")}>
    Ranking
  </Button>
</ButtonGroup>
        </Nav>

        <Nav className="justify-content-end">
          <div style={{ display: "flex", alignItems: "center", paddingRight: "15px" }}>
            <Avatar isBordered color="success" size="sm">
              <img src="/150.jpeg" alt="avatar" />
            </Avatar>
            <span style={{color: isHomePage ? 'white' : 'black', marginLeft: "15px", fontSize: "16px" }}>Romina</span>
          </div>
        </Nav>
      </Navbar>
    </>
  );
}
