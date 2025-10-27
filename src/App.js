// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import Introduction from './Introduction';
import AboutUs from './AboutUs';
import TermsAndConditions from './TermsAndConditions';
import Blog from './Blog';
import PrivacyPolicy from './PrivacyPolicy';
import PaymentSuccess from './PaymentSuccess';
import PaymentFailed from './PaymentFailed';
import ContactUs from './ContactUs';
import LoginSignup from './LoginSignup';
import Profile from './Profile';
import RecommendationsPage from './RecommendationsPage';
import Bot from './Bot'
import EventListingForm from './EventListingForm';
import EventsPage from './EventsPage';
import { UserProvider } from './UserContext';

function App() {
    const [darkMode, setDarkMode] = React.useState(false);

    React.useEffect(() => {
        if (darkMode) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
    }, [darkMode]);

    const handleThemeToggle = () => {
        setDarkMode(!darkMode);
    };

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
        typography: {
            fontSize: 14,
            h2: { fontSize: '2rem', '@media (min-width:600px)': { fontSize: '2.5rem' } },
            body2: { fontSize: '0.875rem', '@media (min-width:600px)': { fontSize: '1rem' } },
        },
    });

    return (
        <UserProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                        <Navbar darkMode={darkMode} onThemeToggle={handleThemeToggle} />
                        
                        <Box sx={{ flex: 1, p: { xs: 2, sm: 3, md: 4 }, bgcolor: 'background.default' }}>
                            <Routes>
                                <Route path="/" element={
                                    <>
                                        <Introduction />
                                        <EventsPage />
                                        <RecommendationsPage/>
                                    </>
                                } />
                                <Route path="/about-us" element={<AboutUs />} />
                                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                                <Route path="/blog" element={<Blog />} />
                                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                <Route path="/contact-us" element={<ContactUs />} />
                                <Route path="/login" element={<LoginSignup />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/payment-success" element={<PaymentSuccess />} />
                                <Route path="/recommendations" element={<RecommendationsPage />} />
                                <Route path="/payment-failed" element={<PaymentFailed />} />
                                <Route path="/list-event" element={<EventListingForm />} />
                            </Routes>
                        </Box>

                        <Footer darkMode={darkMode} onThemeToggle={handleThemeToggle} />

                        {/* ✅ Chatbot injected globally, appears on all pages */}
                        <Bot />
                    </Box>
                </Router>
            </ThemeProvider>
        </UserProvider>
    );
}

export default App;