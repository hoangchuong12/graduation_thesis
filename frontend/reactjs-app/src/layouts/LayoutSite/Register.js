import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';
import UserService from '../../services/UserService';
import RoleService from '../../services/RoleService';

const UserAdd = () => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        phone: '',
        email: '',
        address: '',
        name: '',
        selectedRole: null,
        status: '1',
        avatar: null
    });

    useEffect(() => {
        RoleService.getAll().then(res => {
            setRoles(res.filter(role => role.role !== 1));
        }).catch(err => {
            console.error("Error fetching roles:", err);
            toast.error("Failed to fetch roles.");
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await UserService.create({ ...userData, createdBy: JSON.parse(sessionStorage.getItem('useradmin')).userId });
            if (result) {
                toast.success("User added successfully!");
                navigate("/admin/user/index", { replace: true });
            }
        } catch (error) {
            console.error("Error adding user:", error);
            toast.error("Failed to add user.");
        }
    };

    return (
        <Container fluid="md">
            <Form onSubmit={handleFormSubmit}>
                <h1>Add New User</h1>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="username" value={userData.username} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" value={userData.password} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={userData.email} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter address" name="address" value={userData.address} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Enter phone number" name="phone" value={userData.phone} onChange={handleInputChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="name">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter full name" name="name" value={userData.name} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="avatar">
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control type="file" name="avatar" onChange={(e) => setUserData({ ...userData, avatar: e.target.files[0] })} />
                        </Form.Group>
                        <Form.Group controlId="role">
                            <Form.Label>Role</Form.Label>
                            <Form.Select name="selectedRole" value={userData.selectedRole} onChange={handleInputChange} required>
                                <option value="">Select Role</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Select name="status" value={userData.status} onChange={handleInputChange}>
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="success" type="submit">
                    <FaSave /> Save User
                </Button>
            </Form>
        </Container>
    );
};

export default UserAdd;
