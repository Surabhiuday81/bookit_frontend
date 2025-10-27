import React from 'react';
import { Typography, Container, useTheme } from '@mui/material';

const Blog = () => {
    const theme = useTheme(); // Access the current theme

    return (
        <Container
            component="main"
            maxWidth="md"
            sx={{
                p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
                border: `1px solid ${theme.palette.divider}`,
                mt: { xs: 6, sm: 8, md: 10 }, // Increased top margin
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    mb: { xs: 1, sm: 2 },
                    color: 'primary.main',
                    fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' }, // Responsive font size
                }}
            >
                Event Insights
            </Typography>
            <Typography
                variant="body1"
                paragraph
                sx={{
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, // Responsive font size
                }}
            >
                Welcome to our event insights section! Here, we share stories, behind-the-scenes updates, and industry trends from the world of event planning and management.
            </Typography>
            <Typography
                variant="body1"
                paragraph
                sx={{
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, // Responsive font size
                }}
            >
                Discover tips for organizing successful events, spotlight features on upcoming gatherings, and expert advice to elevate your event experience.
            </Typography>
        </Container>
    );
};

export default Blog;
