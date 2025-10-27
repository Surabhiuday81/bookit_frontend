import React from 'react';
import { Box, Typography } from '@mui/material';
import Lottie from 'react-lottie';
import introAnimation from './animation.json'; // Ensure this path is correct

const Introduction = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: introAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }, // Stack vertically on smaller screens, horizontally on larger screens
                alignItems: 'center',
                justifyContent: 'center', // Center content horizontally
                textAlign: { xs: 'center', md: 'left' },
                p: 4,
                bgcolor: 'background.paper',
                gap: { xs: 2, md: 4 }, // Adjust gap between text and animation for responsiveness
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    maxWidth: '100%',
                    pr: { md: 2 },
                    mb: { xs: 4, md: 0 }, // Adjust bottom margin on smaller screens
                }}
            >
                <Typography 
                    variant="h3" 
                    gutterBottom 
                    sx={{ fontWeight: 'bold', color: 'primary.main' }}
                >
                    Welcome to Bookit
                </Typography>
                <Typography 
                    variant="h6" 
                    sx={{ mb: 2 }}
                >
                    our one-stop solution for event booking. Explore and book your favorite events now!
                </Typography>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    overflow: 'hidden',
                    maxWidth: '100%',
                }}
            >
                <Lottie
                    options={defaultOptions}
                    height={300}
                    width={300}
                    style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain', // Ensure animation fits properly
                    }}
                />
            </Box>
        </Box>
    );
};

export default Introduction;
