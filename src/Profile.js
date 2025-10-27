import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Link,
  TextField,
  Rating,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [eventIdForReview, setEventIdForReview] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchBookings(storedUser.email);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchBookings = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${email}`);
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleRate = (eventId) => {
    setEventIdForReview(eventId);
    setRating(0);
    setReviewText('');
  };

  const handleSubmitReview = async () => {
    if (!rating || !reviewText) {
      setSnackbarMessage('Please provide a rating and comment.');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${eventIdForReview}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          rating,
          reviewText,
          eventId: eventIdForReview,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setSnackbarMessage('Review submitted successfully!');
        setOpenSnackbar(true);
        fetchBookings(user.email);
        setRating(0);
        setReviewText('');
        setEventIdForReview(null);
      } else {
        setSnackbarMessage(data.message || 'Failed to submit review');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setSnackbarMessage('Failed to submit review');
      setOpenSnackbar(true);
    }
  };

  const sortedBookings = bookings.slice().sort((a, b) => 
    new Date(b.event.date) - new Date(a.event.date)
  );

  const displayedBookings = showAll ? sortedBookings : sortedBookings.slice(0, 4);

  const isEventCompleted = (eventDate) => {
    return new Date(eventDate) < new Date();
  };

  return (
    <Container sx={{ mt: 6 }}>
      {user ? (
        <>
          <Typography variant="h4" fontWeight="bold">Welcome, {user.name}</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>

          <Typography variant="h5" sx={{ mt: 4 }}>
            Your Booked Events
          </Typography>

          {sortedBookings.length === 0 ? (
            <Typography>No bookings found.</Typography>
          ) : (
            <>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {displayedBookings.map((booking) => (
                  <Grid item xs={12} sm={6} md={3} key={booking._id}>
                    <Card sx={{ maxWidth: 280, mx: 'auto', height: '100%', opacity: isEventCompleted(booking.event.date) ? 0.7 : 1 }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={booking.event.picture}
                        alt={booking.event.name}
                      />
                      <CardContent>
                        <Typography variant="h6" fontSize="1rem" fontWeight="bold">
                          {booking.event.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(booking.event.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {booking.event.startTime} - {booking.event.endTime}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {booking.event.venue}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Tickets: {booking.tickets}
                        </Typography>

                        {isEventCompleted(booking.event.date) && (
                          <Typography variant="subtitle2" color="error" sx={{ mt: 1 }}>
                            Completed
                          </Typography>
                        )}

                        {booking.event.maplink && (
                          <Box sx={{ mt: 1 }}>
                            <Link
                              href={`https://www.google.com/maps/search/?q=${encodeURIComponent(
                                booking.event.maplink
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              color="primary"
                              fontSize="0.9rem"
                            >
                              Map
                            </Link>
                          </Box>
                        )}

                        <Box sx={{ mt: 1 }}>
                          <a
                            href={`http://localhost:5000/qr_codes/ticket_${booking.sessionId}.png`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: '0.9rem' }}
                          >
                            QR Code
                          </a>
                        </Box>

                        {isEventCompleted(booking.event.date) && (
                          <Box sx={{ mt: 1 }}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleRate(booking.event._id)}
                            >
                              Rate
                            </Button>
                          </Box>
                        )}

                        {eventIdForReview === booking.event._id && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" fontSize="0.9rem">
                              Rate the Event
                            </Typography>
                            <Rating
                              value={rating}
                              onChange={(event, newValue) => setRating(newValue)}
                            />
                            <TextField
                              label="Your Comment"
                              variant="outlined"
                              fullWidth
                              multiline
                              rows={2}
                              sx={{ mt: 1 }}
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                            />
                            <Button
                              variant="contained"
                              size="small"
                              sx={{ mt: 1 }}
                              onClick={handleSubmitReview}
                            >
                              Submit
                            </Button>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {sortedBookings.length > 4 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button variant="contained" onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'Show Less' : 'Show More'}
                  </Button>
                </Box>
              )}
            </>
          )}
        </>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default ProfilePage; 