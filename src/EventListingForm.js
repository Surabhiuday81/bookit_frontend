import React, { useState, useEffect } from "react";
import {
  Box, TextField, Button, MenuItem, Select, InputLabel,
  FormControl, Typography, Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";

const EventListingForm = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    eventName: "",
    eventCategory: "",
    eventDescription: "",
    eventImage: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    eventType: "",
    venueName: "",
    googleMapsLink: "",
    ticketPrice: "",
    totalSeats: "",
    organizerName: "",
    contactInfo: "",
  });

  // 🔐 Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setEventData((prev) => ({
        ...prev,
        organizerName: user.name,
        contactInfo: user.email,
      }));
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in eventData) {
      if (eventData[key] === "") {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please fill all fields before submitting.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/events/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        setEventData({
          eventName: "",
          eventCategory: "",
          eventDescription: "",
          eventImage: "",
          eventDate: "",
          startTime: "",
          endTime: "",
          eventType: "",
          venueName: "",
          googleMapsLink: "",
          ticketPrice: "",
          totalSeats: "",
          organizerName: user.name,
          contactInfo: user.email,
        });
      } else {
        const error = await response.json();
        alert(error.message || "Failed to list event");
      }
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  // Prevent form rendering if user isn't loaded yet
  if (!user) return null;

  return (
    <Box sx={{ padding: 4, maxWidth: "600px", margin: "0 auto" }}>
      <Typography variant="h5" gutterBottom>List Your Event</Typography>
      <Divider sx={{ marginBottom: 3 }} />

      <TextField label="Event Name" name="eventName" fullWidth value={eventData.eventName} onChange={handleChange} sx={{ mb: 2 }} required />

      <FormControl fullWidth sx={{ mb: 2 }} required>
        <InputLabel>Event Category</InputLabel>
        <Select name="eventCategory" value={eventData.eventCategory} onChange={handleChange}>
          <MenuItem value="Concert">Concert</MenuItem>
          <MenuItem value="Conference">Conference</MenuItem>
          <MenuItem value="Workshop">Workshop</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
        </Select>
      </FormControl>

      <TextField label="Event Description" name="eventDescription" multiline rows={3} fullWidth value={eventData.eventDescription} onChange={handleChange} sx={{ mb: 2 }} required />
      <TextField label="Event Image URL" name="eventImage" fullWidth value={eventData.eventImage} onChange={handleChange} sx={{ mb: 2 }} required />
      <TextField type="date" name="eventDate" fullWidth value={eventData.eventDate} onChange={handleChange} sx={{ mb: 2 }} required />

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField type="time" name="startTime" fullWidth value={eventData.startTime} onChange={handleChange} required />
        <TextField type="time" name="endTime" fullWidth value={eventData.endTime} onChange={handleChange} required />
      </Box>

      <FormControl fullWidth sx={{ mb: 2 }} required>
        <InputLabel>Event Type</InputLabel>
        <Select name="eventType" value={eventData.eventType} onChange={handleChange}>
          <MenuItem value="Physical">Physical</MenuItem>
          <MenuItem value="Online">Online</MenuItem>
          <MenuItem value="Hybrid">Hybrid</MenuItem>
        </Select>
      </FormControl>

      {eventData.eventType === "Physical" && (
        <TextField label="Venue Name" name="venueName" fullWidth value={eventData.venueName} onChange={handleChange} sx={{ mb: 2 }} required />
      )}

      <TextField label="Google Maps Link" name="googleMapsLink" fullWidth value={eventData.googleMapsLink} onChange={handleChange} sx={{ mb: 2 }} required />
      <TextField label="Ticket Price" name="ticketPrice" fullWidth value={eventData.ticketPrice} onChange={handleChange} sx={{ mb: 2 }} required />
      <TextField label="Total Seats Available" name="totalSeats" fullWidth value={eventData.totalSeats} onChange={handleChange} sx={{ mb: 2 }} required />

      <TextField label="Organizer Name" name="organizerName" fullWidth value={eventData.organizerName} onChange={handleChange} sx={{ mb: 2 }} required />
      <TextField label="Organizer Email" name="contactInfo" fullWidth value={eventData.contactInfo} onChange={handleChange} sx={{ mb: 2 }} required />

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ width: "100%" }}>
        List Event
      </Button>
    </Box>
  );
};

export default EventListingForm;
