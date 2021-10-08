import { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, 
     UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
     Button
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import LoginModal from "./LoginModalComponent";

function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleNav = () => setIsNavOpen(!isNavOpen);
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    
    return (
        <header className="header">
            <LoginModal isModalOpen={isModalOpen} toggleModal={toggleModal}/>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">CodeRep</NavbarBrand>
                <NavbarToggler onClick={toggleNav} />
                <Collapse isOpen={isNavOpen} navbar>
                    <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink className="nav-link" to="/addons">Add-Ons</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/aboutus">About Us</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/contactus">Contact Us</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Theme
                        </DropdownToggle>
                        <DropdownMenu right>
                        <DropdownItem>
                            Light
                        </DropdownItem>
                        <DropdownItem>
                            Dark
                        </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button outline className="text-light" onClick={()=> toggleModal()}>
                                Login
                            </Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
}

export default Header;
