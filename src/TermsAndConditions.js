import React from 'react';
import { Typography, Container, useTheme, Box } from '@mui/material';

const TermsAndConditions = () => {
    const theme = useTheme();

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
                lineHeight: 1.6,
            }}
        >
            <Typography variant="h4" sx={{ mb: 2, color: 'primary.main' }}>
                Terms and Conditions
            </Typography>
            <Box sx={{ mb: 3 }}>
                <Typography variant="body1" paragraph>
                    These Terms and Conditions govern your use of our platform and services. By accessing or using our site, you agree to comply with and be legally bound by them.
                </Typography>
                <Typography variant="body1" paragraph>
                    If you do not agree with any part of these terms, please do not use our services. Your continued use will constitute acceptance of any updates or modifications.
                </Typography>
                <Typography variant="body1" paragraph>
                    We may revise these terms periodically, and it's your responsibility to stay informed of any changes. We recommend reviewing them regularly.
                </Typography>
                <Typography variant="body1" paragraph>
                    For inquiries regarding these terms, feel free to reach out to our support team.
                </Typography>
            </Box>
        </Container>
    );
};

export default TermsAndConditions;
