import React, { useState, useEffect } from "react";
import {
  Card, CardMedia, CardContent, Typography, Button, Grid,
  CircularProgress, MenuItem, Select, FormControl, InputLabel,
  Box
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

const getUserPreferences = () => {
  const preferences = JSON.parse(localStorage.getItem("userPreferences"));
  return preferences || ["Concert", "Workshop"];
};

const RecommendationsPage = () => {
  const [events, setEvents] = useState([]);
  const [ticketCounts, setTicketCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingEventId, setLoadingEventId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();

  const isSoldOut = (event) => {
    return event.availableSeats <= 0 || new Date(event.eventDate) < new Date();
  };

  const fetchEvents = () => {
    fetch("http://localhost:5000/api/events/")
      .then((res) => res.json())
      .then((data) => {
        const preferences = getUserPreferences();
        const filtered = data.filter(
          (event) => preferences.includes(event.eventCategory) && !isSoldOut(event)
        );
        setEvents(filtered);

        const updatedCounts = {};
        filtered.forEach((event) => {
          updatedCounts[event._id] = ticketCounts[event._id] || 1;
        });
        setTicketCounts(updatedCounts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents(); // Initial fetch

    const interval = setInterval(fetchEvents, 10000); // Poll every 10 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  const handleTicketChange = (e, eventId) => {
    setTicketCounts({ ...ticketCounts, [eventId]: e.target.value });
  };

  const handleBooking = async (eventId) => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login to book tickets.");
      navigate("/login");
      return;
    }

    setLoadingEventId(eventId);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const tickets = ticketCounts[eventId] || 1;

      const response = await fetch("http://localhost:5000/api/events/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, tickets, userEmail: user.email }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Booking failed. Try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
    }
    setLoadingEventId(null);
  };

  const StarRating = ({ rating = 4 }) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} sx={{ color: i < rating ? "#FFD700" : "#E0E0E0" }} />
      ))}
      <Typography sx={{ ml: 1 }}>({rating}.0 / 5)</Typography>
    </Box>
  );

  const displayedEvents = showAll ? events : events.slice(0, 4);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Personalized Recommendations
      </Typography>

      {events.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No available events matching your preferences.
        </Typography>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            {displayedEvents.map(event => (
              <Grid item key={event._id} xs={12} sm={6} md={3}>
                <Card sx={{
                  maxWidth: 280,
                  mx: "auto",
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)" },
                }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={event.eventImage || "https://via.placeholder.com/300"}
                    alt={event.eventName}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" fontSize="1rem">
                      {event.eventName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {event.eventDescription?.substring(0, 60)}...
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                      ₹{event.ticketPrice} per ticket
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Seats Available: {event.availableSeats}
                    </Typography>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Tickets</InputLabel>
                      <Select
                        value={ticketCounts[event._id] || 1}
                        onChange={(e) => handleTicketChange(e, event._id)}
                        label="Tickets"
                      >
                        {[...Array(Math.min(event.availableSeats, 10)).keys()].map(n => (
                          <MenuItem key={n + 1} value={n + 1}>{n + 1}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleBooking(event._id)}
                      disabled={loadingEventId === event._id}
                    >
                      {loadingEventId === event._id
                        ? <CircularProgress size={24} color="inherit" />
                        : "Book Now"}
                    </Button>
                    
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {events.length > 4 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button variant="contained" onClick={() => setShowAll(!showAll)}>
                {showAll ? "Show Less" : "Show More"}
              </Button>
            </Box>
          )}
        </>
      )}
    </div>
  );
};

export default RecommendationsPage;