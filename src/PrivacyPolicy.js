import React from 'react';
import { Typography, Container, useTheme, Box } from '@mui/material';

const PrivacyPolicy = () => {
    const theme = useTheme(); // Access the current theme

    return (
        <Container
            component="main"
            maxWidth="md"
            sx={{
                mt: 6,
                p: 4,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
                border: `1px solid ${theme.palette.divider}`,
                lineHeight: 1.6, // Improved readability
            }}
        >
            <Typography variant="h4" sx={{ mb: 2, color: 'primary.main' }}>
                Privacy Policy
            </Typography>
            <Box sx={{ mb: 3 }}>
                <Typography variant="body1" paragraph>
                    We value your privacy and are committed to safeguarding your personal information. This policy outlines how we collect, use, and protect the data you share with us.
                </Typography>
                <Typography variant="body1" paragraph>
                    We may collect information you provide directly, such as your name, email, or event preferences, as well as data gathered automatically when you use our platform.
                </Typography>
                <Typography variant="body1" paragraph>
                    Your information helps us enhance our services, respond to inquiries, and communicate important updates. We do not sell or share your data with third parties, except when legally required.
                </Typography>
                <Typography variant="body1" paragraph>
                    If you have any questions or concerns regarding our privacy practices, feel free to contact our support team. Your trust means everything to us.
                </Typography>
            </Box>
        </Container>
    );
};

export default PrivacyPolicy;
