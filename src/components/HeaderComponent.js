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
import { useSelector } from "react-redux";
import LoginRegisterModal from "./LoginRegisterModalComponent";
import LogoutModal from "./LogoutModalComponent";

function Header() {
  const authentication = useSelector((state) => state.authentication);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoginRegisterModalOpen, setIsLoginRegisterModalOpen] =
    useState(false);

  const toggleLoginRegisterModal = () =>
    setIsLoginRegisterModalOpen(!isLoginRegisterModalOpen);

  const toggleLogoutModal = () => setIsLogoutModalOpen(!isLogoutModalOpen);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <header className="header">
      <LoginRegisterModal
        isModalOpen={isLoginRegisterModalOpen}
        toggleModal={toggleLoginRegisterModal}
      />
      <LogoutModal
        isModalOpen={isLogoutModalOpen}
        toggleModal={toggleLogoutModal}
      />
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
              {authentication.isAuthenticated ? (
                <Button
                  outline
                  size="sm"
                  className="text-light"
                  onClick={toggleLogoutModal}
                >
                  <span className="fa fa-sign-out">Logout</span>
                </Button>
              ) : (
                <Button
                  outline
                  size="sm"
                  className="text-light"
                  onClick={toggleLoginRegisterModal}
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
