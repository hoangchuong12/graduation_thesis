import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserContext } from './';
import { toast } from 'react-toastify';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';
import { FaSave, FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import UserService from '../../services/UserService';
import RoleService from '../../services/RoleService';

const UserAdd = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const location = useLocation();
    const { login } = useUserContext();

    const handleLogin = (authRequest, redirectTo) => {
        login(authRequest, redirectTo);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const roleResponse = await RoleService.getByRole(2);
            if (roleResponse) {
                const dataRegister = {
                    userName: username,
                    password: password,
                    email: email,
                    role: roleResponse
                };
                const userRegistered = await UserService.create(dataRegister);
                if (userRegistered) {
                    const authRequest = {
                        username: username,
                        password: password
                    };
                    handleLogin(authRequest, location.state?.redirectTo || "/");
                    toast.success("Registration successful!");
                }
            }
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error("Registration failed, please try again.");
        }
    };

    return (
        <Container className="py-5 h-100">
            <Row className="d-flex justify-content-center align-items-center h-100">
                <Col lg={10} xl={8}>
                    <Card className="text-black" style={{ borderRadius: '25px' }}>
                        <Card.Body>
                            <Row className="justify-content-center">
                                <Col md={6} lg={5} className="order-2 order-lg-1">
                                    <h3 className="text-center fw-bold mb-5">Register</h3>
                                    <Form onSubmit={handleRegister}>
                                        <Form.Group className="mb-3" controlId="username">
                                            <Form.Label>Tên đăng nhập</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="password">
                                            <Form.Label>mật khẩu</Form.Label>
                                            <Form.Control
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Check 
                                            type="checkbox" 
                                            label="tôi ko phải người máy" 
                                            required 
                                            className="mb-4" 
                                        />
                                        <div className="d-flex justify-content-center">
                                            <Button type="submit" className="btn-primary btn-lg">Register</Button>
                                        </div>
                                    </Form>
                                    
                                </Col>
                                <Col md={6} lg={7} className="d-flex align-items-center order-1 order-lg-2">
                                    <img src="https://nganhadecor.com/wp-content/uploads/2017/11/do-trang-tri-tt159-4.png" className="img-fluid" alt="Sample image" />
                                </Col>
                            </Row>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default UserAdd;
