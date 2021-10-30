import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import LoginModal from "./LoginModalComponent";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <header className="header">
      <LoginModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">CodeRep</NavbarBrand>
        <NavbarToggler onClick={toggleNav} />
        <Collapse isOpen={isNavOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" to="/home">
                <span className="fa fa-home" /> Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/explore">
                <span className="fa fa-compass" /> Explore
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/editor/untitled">
                <span className="fa fa-code" /> Create New Editor
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <span className="fa fa-adjust" /> Theme
              </DropdownToggle>
              <DropdownMenu className="bg-light">
                <DropdownItem>
                  <span className="fa fa-sun-o" /> Light
                </DropdownItem>
                <DropdownItem>
                  <span className="fa fa-moon-o" />
                  Dark
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              {false ? ( // Here We Will Add Logged In Status As Condition When We Setup Login
                <Button
                  outline
                  size="sm"
                  className="text-light"
                  onClick={() => toggleModal()}
                >
                  <span className="fa fa-sign-out"> Logout</span>
                </Button>
              ) : (
                <Button
                  outline
                  size="sm"
                  className="text-light"
                  onClick={() => toggleModal()}
                >
                  <span className="fa fa-sign-in"> Login/Register</span>
                </Button>
              )}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
