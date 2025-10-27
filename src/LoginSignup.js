import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';  // Import the context

const LoginSignup = () => {
    const [tabValue, setTabValue] = useState(0);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { setLoggedInUser } = useUserContext();  // Access the function to set user globally
    const navigate = useNavigate();

    // Automatically populate email from localStorage if the user is logged in
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setFormData((prevState) => ({
                ...prevState,
                email: user.email, // Auto-fill email if the user is already logged in
                name: user.name,   // Optionally populate name for logged-in users
            }));
        }
    }, []);

    const handleTabChange = (_, newValue) => {
        setTabValue(newValue);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = tabValue === 0 ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
    
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setLoggedInUser(data.user); // Update global user state
                localStorage.setItem('token', data.token); // Store JWT token
                localStorage.setItem('user', JSON.stringify(data.user)); // Store user in localStorage
                alert(`Welcome, ${data.user.name}`);
                navigate('/');  // Redirect to homepage after login
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <Container maxWidth="xs">
            <br></br>
            <br></br>
            <br></br>

            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
                <Tab label="Login" />
                <Tab label="Signup" />
            </Tabs>

            <form onSubmit={handleSubmit}>
                {tabValue === 1 && (
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                )}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <Box mt={2}>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        {tabValue === 0 ? 'Login' : 'Signup'}
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default LoginSignup;
