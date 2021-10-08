import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody,
    Form, FormGroup, Label, Input, Button } from "reactstrap";

function LoginModal({ isModalOpen, toggleModal }) {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 

    const handleLogin= (event) => {
        toggleModal();
        alert("Username: " + username + ", Password: " + password);
        event.preventDefault();
    }

    return (
        <div className="login_modal">
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Login</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleLogin}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" id="username" name="username" 
                    value={username} onChange={(e) => setUsername(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" name="password" 
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>
                <Button type="submit" color="primary">Login</Button>
                </Form>
            </ModalBody>
            </Modal>
        </div>
    );
}

export default LoginModal;
