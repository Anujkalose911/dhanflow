import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import CompanyLogo from "../../Assests/images/liquidmind-logo.svg";
import "../../Assests/CSS/Header1.css";

function Header1({ isSignup }) { 
  return (
    <Navbar expand="lg" className={isSignup ? "signup-header" : "Header1-background"}>
      <Container>
        <Navbar.Brand href="#home">
          <img src={CompanyLogo} className="CompanyLogo logo-shadow" alt="Company Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <b style={{ fontSize: "18px", color: isSignup ? "#333" : "white" }}></b>{" "}
            <a
              href="#login"
              style={{
                textDecoration: "none",
                fontSize: "20px",
                color: isSignup ? "#0077ff" : "white",
              }}
            >
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header1;