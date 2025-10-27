import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Tooltip, Switch, FormControlLabel } from '@mui/material';
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, LocationOn as LocationOnIcon, AccountCircle as AccountCircleIcon, Login as LoginIcon } from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';

const Navbar = ({ darkMode, onThemeToggle }) => {
  const [scrolling, setScrolling] = useState(false);
  const [location, setLocation] = useState("Location Unavailable");
  const { user, logoutUser } = useUserContext();
  const theme = useTheme();
  const navigate = useNavigate();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
          )
            .then((res) => res.json())
            .then((data) => {
              setLocation(data.address.city || "Location Unavailable");
            })
            .catch(() => setLocation("Location Unavailable"));
        },
        () => setLocation("Location Unavailable")
      );
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logoutUser();
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{ bgcolor: '#4a266e', boxShadow: scrolling ? 3 : 0 }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', flexShrink: 0 }}
          component={Link}
          to="/"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Bookit
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? 1 : 2,
            flexWrap: 'nowrap'
          }}
        >
          {!isMobile && (
            <Button color="inherit" component={Link} to="/list-event">
              List an Event
            </Button>
          )}

          <IconButton color="inherit" sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <LocationOnIcon fontSize="small" />
            {!isMobile && (
              <Typography sx={{ ml: 0.5 }} variant="body2">
                {location}
              </Typography>
            )}
          </IconButton>

          {user ? (
            <>
              <Tooltip title={`Logged in as ${user.name}`} arrow>
                <IconButton onClick={handleProfileClick} color="inherit">
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
              {!isMobile && (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              startIcon={!isMobile && <LoginIcon />}
            >
              {isMobile ? <LoginIcon /> : 'Login'}
            </Button>
          )}

          <FormControlLabel
            sx={{ ml: isMobile ? 0 : 1 }}
            control={
              <Switch
                checked={darkMode}
                onChange={onThemeToggle}
                icon={<Brightness7Icon />}
                checkedIcon={<Brightness4Icon />}
              />
            }
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
