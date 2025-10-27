import React from 'react';
import { Box, Typography, Link, IconButton, Container } from '@mui/material';
import { Facebook, LinkedIn, YouTube, Twitter } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = ({ darkMode, onThemeToggle }) => {
    return (
        <Box
            sx={{
                bgcolor: '#4a266e',
                color: 'white',
                py: 3,
                mt: 'auto',
            }}
            component="footer"
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                }}
            >
                {/* Navigation Links */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap', // Allow wrapping for smaller screens
                        justifyContent: 'center',
                        gap: 2, // Adjust spacing
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                    }}
                >
                    <Link component={RouterLink} to="/blog" color="inherit" underline="none">
                        Blog
                    </Link>
                    <Link component={RouterLink} to="/privacy-policy" color="inherit" underline="none">
                        Privacy Policy
                    </Link>
                    <Link component={RouterLink} to="/terms-and-conditions" color="inherit" underline="none">
                        Terms and Conditions
                    </Link>
                    <Link component={RouterLink} to="/about-us" color="inherit" underline="none">
                        About Us
                    </Link>
                    <Link component={RouterLink} to="/contact-us" color="inherit" underline="none">
                        Contact Us
                    </Link>
                </Box>

                {/* Social Media Icons */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap', // Wrap for smaller screens
                        justifyContent: 'center',
                        gap: 1.5, // Adjust spacing
                    }}
                >
                    <IconButton
                        aria-label="Facebook"
                        color="inherit"
                        component="a"
                        href="https://www.facebook.com"
                        sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                    >
                        <Facebook />
                    </IconButton>
                    <IconButton
                        aria-label="LinkedIn"
                        color="inherit"
                        component="a"
                        href="https://www.linkedin.com/in/surabhi-uday-kumar-642750229"
                        sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                    >
                        <LinkedIn />
                    </IconButton>
                    <IconButton
                        aria-label="YouTube"
                        color="inherit"
                        component="a"
                        href="https://www.youtube.com"
                        sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                    >
                        <YouTube />
                    </IconButton>
                    <IconButton
                        aria-label="Twitter"
                        color="inherit"
                        component="a"
                        href="https://www.twitter.com"
                        sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                    >
                        <Twitter />
                    </IconButton>
                </Box>

                {/* Footer Text */}
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: { xs: '0.8rem', sm: '1rem' },
                        mt: 2,
                        textAlign: 'center',
                    }}
                >
                    &copy; 2025 Bookit. All rights reserved. &trade;
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
