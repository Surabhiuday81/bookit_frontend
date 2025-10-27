import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, FormControlLabel, Switch, Tooltip, IconButton } from '@mui/material';
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, LocationOn as LocationOnIcon, AccountCircle as AccountCircleIcon, Login as LoginIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';

const Navbar = ({ darkMode, onThemeToggle }) => {
  const [scrolling, setScrolling] = useState(false);
  const [location, setLocation] = useState("Location Unavailable");
  const { user, logoutUser } = useUserContext();
  const theme = useTheme();
  const navigate = useNavigate();

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
    } else {
      setLocation("Location Unavailable");
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
    <AppBar position="fixed" sx={{ bgcolor: '#4a266e', boxShadow: scrolling ? 3 : 0 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Bookit
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/list-event">List an Event</Button> {/* Added Button */}
          <Button
            color="inherit"
            startIcon={<LocationOnIcon />}
          >
            {location || "Current Location"}
          </Button>

          {user ? (
            <>
              <Tooltip title={`Logged in as ${user.name}`} arrow>
                <IconButton onClick={handleProfileClick} color="inherit">
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon />}>Login</Button>
          )}

          <FormControlLabel
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
