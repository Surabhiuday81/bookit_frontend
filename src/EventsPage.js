import React, { useState, useEffect } from "react";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import {
  Card, CardMedia, CardContent, Typography, Button, Grid,
  CircularProgress, MenuItem, Select, FormControl, InputLabel,
  Box, Modal
} from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingEventId, setLoadingEventId] = useState(null);
  const [ticketCounts, setTicketCounts] = useState({});
  const [filter, setFilter] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/events/")
      .then(res => res.json())
      .then(data => {
        const now = new Date();
        const futureEvents = data.filter(event =>
          new Date(event.eventDate) >= now
        );
        const initialCounts = {};
        futureEvents.forEach(event => {
          initialCounts[event._id] = 1;
        });
        setTicketCounts(initialCounts);
        setEvents(futureEvents);
      })
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  const handleBooking = async (eventId) => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login to book tickets.");
      navigate("/login");
      return;
    }

    setLoading(true);
    setLoadingEventId(eventId);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
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
    } catch (error) {
      console.error("Error booking tickets:", error);
    }
    setLoading(false);
    setLoadingEventId(null);
  };

  const handleTicketChange = (e, eventId) => {
    setTicketCounts({ ...ticketCounts, [eventId]: e.target.value });
  };

  const isSoldOut = (event) => {
    return event.availableSeats <= 0 || new Date(event.eventDate) < new Date();
  };

  const handleImageClick = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const filteredEvents = (filter
    ? events.filter(event => event.eventCategory === filter)
    : events
  ).sort((a, b) => {
    const aSoldOut = isSoldOut(a);
    const bSoldOut = isSoldOut(b);
    if (aSoldOut !== bSoldOut) {
      return aSoldOut ? 1 : -1; // sold-out events pushed down
    }
    return new Date(a.eventDate) - new Date(b.eventDate); // upcoming first
  });

  const displayedEvents = showAll ? filteredEvents : filteredEvents.slice(0, 4);

  const StarRating = ({ rating = 4 }) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} sx={{ color: i < rating ? "#FFD700" : "#E0E0E0" }} />
      ))}
      <Typography sx={{ ml: 1 }}>({rating}.0 / 5)</Typography>
    </Box>
  );

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Available Events
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Filter by Category"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Concert">Concert</MenuItem>
            <MenuItem value="Conference">Conference</MenuItem>
            <MenuItem value="Workshop">Workshop</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredEvents.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No events available
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
                    onClick={() => handleImageClick(event)}
                    sx={{ cursor: "pointer" }}
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

                    {isSoldOut(event) ? (
                      <Button variant="contained" color="secondary" fullWidth disabled>
                        Sold Out
                      </Button>
                    ) : (
                      <>
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
                          disabled={loading && loadingEventId === event._id}
                        >
                          {loading && loadingEventId === event._id
                            ? <CircularProgress size={24} color="inherit" />
                            : "Book Now"}
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {filteredEvents.length > 4 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button variant="contained" onClick={() => setShowAll(!showAll)}>
                {showAll ? "Show Less" : "Show More"}
              </Button>
            </Box>
          )}
        </>
      )}

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500, maxHeight: "90vh", overflowY: "auto",
          bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2
        }}>
          {selectedEvent && (
            <>
              <Typography variant="h6" gutterBottom>{selectedEvent.eventName}</Typography>
              <Typography><strong>Category:</strong> {selectedEvent.eventCategory}</Typography>
              <Typography><strong>Description:</strong> {selectedEvent.eventDescription}</Typography>
              <Typography><strong>Date:</strong> {
                selectedEvent?.eventDate && !isNaN(new Date(selectedEvent.eventDate))
                  ? format(new Date(selectedEvent.eventDate), "PPP")
                  : "N/A"
              }</Typography>
              <Typography><strong>Time:</strong> {selectedEvent.startTime} - {selectedEvent.endTime}</Typography>
              <Typography><strong>Type:</strong> {selectedEvent.eventType}</Typography>
              <Typography><strong>Venue:</strong> {selectedEvent.venueName || "N/A"}</Typography>

              {selectedEvent.googleMapsLink && (
                <Button
                  variant="outlined"
                  startIcon={<RoomIcon />}
                  sx={{ mt: 1, mb: 2 }}
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedEvent.googleMapsLink)}`, "_blank")}
                >
                  Open in Maps
                </Button>
              )}

              <Typography><strong>Organizer:</strong> {selectedEvent.organizerName || "N/A"}</Typography>
              <Typography><strong>Email:</strong> {selectedEvent.contactInfo || "N/A"}</Typography>
              <Typography><strong>Ticket Price:</strong> ₹{selectedEvent.ticketPrice}</Typography>
              <Typography><strong>Available Seats:</strong> {selectedEvent.availableSeats}</Typography>

              {selectedEvent.googleMapsLink && (
                <Box sx={{ mt: 2 }}>
                  <iframe
                    title="Venue Map"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${encodeURIComponent(selectedEvent.googleMapsLink)}&output=embed`}
                  />
                </Box>
              )}

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">Ratings & Reviews</Typography>
                <StarRating rating={4} />
                <Typography variant="body2" sx={{ mb: 1 }}>
                  “Amazing experience! The event was well-organized and the venue was fantastic.” – Anjali R.
                </Typography>
                <Typography variant="body2">
                  “Great value for money. Would definitely attend again.” – Ramesh K.
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default EventPage;