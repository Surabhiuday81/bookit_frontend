import React from 'react';
import { Container, Box, Typography, Grid, Paper, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MissionIcon from '@mui/icons-material/Flag';
import ValuesIcon from '@mui/icons-material/Star';
import CompanyIcon from '@mui/icons-material/Business';

const AboutUs = () => {
    const theme = useTheme();

    return (
        <Container component="main" maxWidth="lg" sx={{ mt: { xs: 6, sm: 8, md: 10 }, mb: 4, px: 2 }}>
            <Typography
                variant="h2"
                align="center"
                sx={{ mb: 4, color: theme.palette.primary.main, fontSize: { xs: '2rem', md: '3rem' } }}
            >
                About Us
            </Typography>

            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <CompanyIcon sx={{ fontSize: { xs: 30, md: 40 }, color: theme.palette.primary.main, mr: 2 }} />
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '2rem' } }}
                >
                    Our Platform
                </Typography>
            </Box>
            <Typography variant="body1" paragraph sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                We are an innovative event booking platform that connects organizers with audiences seamlessly.
                Whether it's concerts, conferences, or community meetups — our mission is to make event experiences
                smooth, secure, and memorable for everyone involved.
            </Typography>

            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <MissionIcon sx={{ fontSize: { xs: 30, md: 40 }, color: theme.palette.primary.main, mr: 2 }} />
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '2rem' } }}
                >
                    Our Mission
                </Typography>
            </Box>
            <Typography variant="body1" paragraph sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                Our mission is to simplify event management and ticket booking using powerful yet intuitive tools.
                We strive to empower organizers to host successful events while ensuring attendees enjoy a hassle-free experience from discovery to participation.
            </Typography>

            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <ValuesIcon sx={{ fontSize: { xs: 30, md: 40 }, color: theme.palette.primary.main, mr: 2 }} />
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '2rem' } }}
                >
                    Our Values
                </Typography>
            </Box>
            <Typography variant="body1" paragraph sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                At the core of our company lies transparency, user-centric innovation, and community. We are committed
                to building trust with both organizers and attendees by providing reliable services and excellent support.
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        mb: 2,
                        fontWeight: 'bold',
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        textAlign: 'center',
                    }}
                >
                    Meet Our Team
                </Typography>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    {[
                        { name: 'S.Uday Kumar', role: 'Team Leader', img: 'https://via.placeholder.com/150' },
                        { name: 'M.Sree Charan', role: 'Team Member', img: 'https://via.placeholder.com/150' },
                        { name: 'B.Koushik', role: 'Team Member', img: 'https://via.placeholder.com/150' },
                        { name: 'S.Nishanth', role: 'Team Member', img: 'https://via.placeholder.com/150' },
                    ].map((member, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                            <Paper
                                sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    '&:hover': { boxShadow: 6 },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar
                                    alt={member.name}
                                    src={member.img}
                                    sx={{
                                        width: { xs: 60, md: 80 },
                                        height: { xs: 60, md: 80 },
                                        mb: 2,
                                    }}
                                />
                                <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}>
                                    {member.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}
                                >
                                    {member.role}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default AboutUs;
